import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
import api from './../api/Api.js'

Vue.use(Vuex)

/*
 * If not building with SSR mode, you can
 * directly export the Store instantiation;
 *
 * The function below can be async too; either use
 * async/await or return a Promise which resolves
 * with the Store instance.
 */

export default function (/* { ssrContext } */) {
  const Store = new Vuex.Store({
    state: {
      account: null,
      balance: null,
      transactions: null
    },
    mutations: {
      logout (state) {
        state.account = null
        state.balance = null
        state.transactions = null

        localStorage.removeItem('account')
        localStorage.removeItem('balance')
        localStorage.removeItem('transactions')
      },

      check_storage (state) {
        try {
          state.account = JSON.parse(localStorage.getItem('account'))
          state.balance = JSON.parse(localStorage.getItem('balance'))
          state.transactions = JSON.parse(localStorage.getItem('transactions'))
        } catch (_) { }
      },

      auth_success (state, { account, balance, transaction }) {
        state.account = account
        state.balance = balance
        state.transactions = transaction

        localStorage.setItem('account', JSON.stringify(account))
        localStorage.setItem('balance', JSON.stringify(balance))
        localStorage.setItem('transactions', JSON.stringify(transaction))
      },

      execute_transaction (state, amount) {
        state.balance.Amount.Amount -= amount

        localStorage.setItem('balance', JSON.stringify(state.balance))
      }
    },
    actions: {
      async checkStorage ({ commit }) {
        return commit('check_storage')
      },

      async authenticate ({ commit }, conta) {
        if (!conta) { throw Error('Auth error') }

        const { data: { access_token: token } } = await axios
          .post(
            'https://idcs-902a944ff6854c5fbe94750e48d66be5.identity.oraclecloud.com/oauth2/v1/token',
            'grant_type=client_credentials&scope=urn:opc:resource:consumer::all',
            {
              auth: {
                username: 'f9d3cd9600874ac2803d03ca709b78eb',
                password: '1a2075e3-b15e-4324-902c-0f12f8f08082'
              },
              headers: {
                'content-type': 'application/x-www-form-urlencoded'
              }
            })

        if (!token) { throw Error('Auth error') }

        const { data: { Data: { Account: [account] } } } = await axios
          .get(
            'https://cors-anywhere.herokuapp.com/https://af3tqle6wgdocsdirzlfrq7w5m.apigateway.sa-saopaulo-1.oci.customer-oci.com/fiap-sandbox/open-banking/v1/accounts/' + conta,
            { headers: { Authorization: `Bearer ${token}` } }
          )

        if (!account) { throw Error('Auth error') }

        const { data: { Data: { Balance: [balance] } } } = await axios
          .get(
            `https://cors-anywhere.herokuapp.com/https://af3tqle6wgdocsdirzlfrq7w5m.apigateway.sa-saopaulo-1.oci.customer-oci.com/fiap-sandbox/open-banking/v1/accounts/${conta}/balances`,
            { headers: { Authorization: `Bearer ${token}` } }
          )

        if (!balance) { throw Error('Auth error') }

        const { data: { data: { transaction } } } = await axios
          .get(
            `https://cors-anywhere.herokuapp.com/https://af3tqle6wgdocsdirzlfrq7w5m.apigateway.sa-saopaulo-1.oci.customer-oci.com/fiap-sandbox/open-banking/v1/accounts/${conta}/transactions`,
            { headers: { Authorization: `Bearer ${token}` } }
          )

        return commit('auth_success', { account, balance, transaction })
      },

      async buyStickers ({ commit }, { account, length, total }) {
        const { data } = await api.buyStickers(account, length, total)

        if (!data) { throw Error('Buy error') }

        commit('execute_transaction', total)
      }
    },
    getters: {},

    // enable strict mode (adds overhead!)
    // for dev mode only
    strict: process.env.DEV
  })

  return Store
}
