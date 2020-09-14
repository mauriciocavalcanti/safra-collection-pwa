import axios from 'axios'

const basicAuth = {
  username: 'usuariobasic',
  password: 'senhabasic'
}

export default {

  getPrizes () {
    return axios.get('https://hacka-bank.herokuapp.com/api/prizes', {
      auth: basicAuth
    })
  },

  getStickers (account) {
    return axios.get(`https://hacka-bank.herokuapp.com/api/accounts/${account}/stickers`, {
      auth: basicAuth
    })
  },

  buyStickers (account, length, value) {
    const payload = {
      accountId: account,
      transactionId: (new Date()).getTime(),
      transactionInformation: 'Compra de figurinha',
      stickersQuantity: length,
      value: value
    }

    return axios.post(
      `https://hacka-bank.herokuapp.com/api/accounts/${account}/transactions`,
      payload,
      { auth: basicAuth }
    )
  }
}
