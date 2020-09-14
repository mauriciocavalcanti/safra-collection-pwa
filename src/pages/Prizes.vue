<template>
  <q-page class="page page-picture">
    <div class="welcome-banner">
      <div class="page-title-balance">
        <p>Seu saldo disponível:</p>
        <span>{{ balance.Amount.Amount | currency }}</span>
      </div>
    </div>

    <h4 class="page-title">Acompanhe o seu álbum</h4>

    <div class="album" v-show="prize">
      <p class="title" v-if="prize">{{prize.description}}</p>

      <div class="completed" v-if="completed">
        <h1>Você completou esse produto</h1>
        <span>Recolha o seu prêmio em um de nossos parceiros</span>
      </div>
      <canvas ref="canvas" id="album-canvas" width="600" height="800"></canvas>

      <q-btn color="white" text-color="black" style="width: 100%; margin-top: 10px" icon-right="arrow_forward" label="Comprar figurinhas" to="/buy" />
    </div>
    <div v-show="!prize" class="row justify-center items-center" style="margin-top: 5em">
      <q-spinner
        color="primary"
        size="3em"
        :thickness="2"
      />
    </div>
  </q-page>
</template>

<script>
import api from './../api/Api.js'
import album from './../album/album.js'

export default {
  name: 'Prizes',
  data () {
    return {
      error: false,
      prize: null,
      completed: false
    }
  },
  methods: {
    drawCanvas (prize, stickers) {
      const canvasConfig = {
        el: this.$refs.canvas,
        vertical: prize.rowsQuantity,
        horizontal: prize.columnsQuantity,
        image: 'https://hackat6-image-files.s3-sa-east-1.amazonaws.com/' + prize.imageUrl,
        filled: stickers.map(s => s.piece)
      }

      this.completed = album.init(canvasConfig)
    }
  },
  computed: {
    account () {
      return this.$store.state.account
    },
    balance () {
      return this.$store.state.balance
    }
  },
  async mounted () {
    const { data: stickers } = await api.getStickers(this.account.AccountId)

    api.getPrizes()
      .then(res => {
        const data = res.data[0]

        if (!data) { throw Error('no data') }

        this.prize = data
        this.drawCanvas(this.prize, stickers)
      })
      .catch(err => {
        this.error = true
        console.error(err)
      })
  }
}
</script>
