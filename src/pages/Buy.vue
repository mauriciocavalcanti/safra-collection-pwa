<template>
  <q-page class="page page-buy">
    <div class="welcome-banner">
      <div class="page-title-balance">
        <p>Seu saldo disponível:</p>
        <span>{{ balance.Amount.Amount | currency }}</span>
      </div>
    </div>

    <h4 class="page-title" v-if="!success">Compre figurinhas</h4>

    <div v-if="!success">
      <div class="buy-sticker" v-if="prize">

        <div class="price">
          <p class="label"><span>Produto: &nbsp;</span> {{prize.description}}</p>
          <p class="value"><span>Preço unitário: &nbsp;</span> {{ prize.stickerPrice | currency }}</p>
        </div>

        <div class="total">
          <div>
            <small>Valor:</small>
            <div style="display: flex; align-items: center">
              <span style="margin-right: 10px; color: #555">(<b>{{length}}</b> {{ (length === 1) ? 'item' : 'items' }})</span>
              <p>{{ total | currency }}</p>
            </div>
          </div>
          <div class="reset">
            <q-icon name="cancel" @click="reset()" />
          </div>
        </div>

        <div class="alert" v-if="insufficientFunds">
          <p>Fundos insuficientes</p>
        </div>

        <div class="add-sticker-grid">
          <q-btn v-for="value in addStickerValues" :disable="loading" :key="value" color="white" text-color="black" :label="'+' + value" @click="add(value)" />
        </div>

        <q-btn color="primary" :disable="(insufficientFunds || !length || loading)" style="width: 100%; margin-top: 10px" label="Finalizar compra" @click="buy()" />

        <div v-if="loading" class="row justify-center items-center" style="margin-top: 2em">
          <q-spinner
            color="primary"
            size="3em"
            :thickness="2"
          />
        </div>
        <div v-if="!loading && error" class="alert" style="margin-top: 2em">
          <p>Aconteceu um erro, tente novamente</p>
        </div>
      </div>
      <div v-show="!prize" class="row justify-center items-center" style="margin-top: 5em">
        <q-spinner
          color="primary"
          size="3em"
          :thickness="2"
        />
      </div>
    </div>
    <div v-else>
      <div class="success">
        <q-icon name="check" />

        <h1>Parabéns, você adquiriu {{length}} {{ (length === 1) ? 'figurinha' : 'figurinhas' }}.</h1>
      </div>

      <q-btn color="white" text-color="black" style="width: 100%; margin-top: 10px" label="Voltar para ao álbum" to="/prizes" />
    </div>
  </q-page>
</template>

<script>
import api from './../api/Api.js'

export default {
  name: 'Prizes',
  data () {
    return {
      addStickerValues: [1, 3, 5, 10, 15, 25],
      length: 0,
      error: false,
      prize: null,
      loading: false,
      success: false
    }
  },
  methods: {
    add (value) {
      this.length += value
    },
    reset () {
      this.length = 0
    },
    buy () {
      this.loading = true

      this.$store
        .dispatch('buyStickers', { account: this.account.AccountId, length: this.length, total: this.total })
        .then(() => {
          this.success = true
          this.error = false
        })
        .catch(err => {
          console.error(err)
          this.error = true
        })
        .finally(() => {
          this.loading = false
        })
    }
  },
  computed: {
    total () {
      return (this.length * this.prize.stickerPrice)
    },
    insufficientFunds () {
      return this.balance.Amount.Amount < this.total
    },
    account () {
      return this.$store.state.account
    },
    balance () {
      return this.$store.state.balance
    }
  },
  mounted () {
    api
      .getPrizes()
      .then(res => {
        const data = res.data[0]

        if (!data) { throw Error('no data') }

        this.prize = data
      })
      .catch(err => {
        this.error = true
        console.error(err)
      })
  }
}
</script>
