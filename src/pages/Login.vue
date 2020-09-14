<template>
  <q-page
    class="login-page window-height window-width row justify-center items-center"
  >
    <div class="column">
      <div class="row">
        <img
          src="~assets/safra.png"
          alt="Banco Safra"
          style="margin: -2em auto 0"
        />
      </div>
      <div class="row">
        <q-card class="q-pa-lg shadow-1">
          <q-card-section>
            <q-form class="q-gutter-md">
              <q-input
                square
                filled
                clearable
                v-model="agencia"
                type="number"
                label="Agência"
              />
              <q-input
                square
                filled
                clearable
                v-model="conta"
                type="number"
                label="Conta"
              />
            </q-form>
          </q-card-section>
          <div class="q-gutter-md row text-center" v-if="loading">
            <q-spinner
              color="primary"
              size="3em"
              :thickness="2"
              style="margin: 20px auto 0"
            />
          </div>
          <q-card-actions v-else class="q-px-md">
            <q-btn
              unelevated
              color="blue"
              size="lg"
              class="full-width"
              label="Entrar"
              @click="authenticate()"
            />
          </q-card-actions>

          <p v-if="error" class="text-center text-red text-bold">
            Ocorreu um erro
          </p>
        </q-card>
      </div>
    </div>
  </q-page>
</template>

<script>
export default {
  name: 'Login',
  data () {
    return {
      error: false,
      loading: false,
      agencia: '0071',
      conta: '1234511'
    }
  },
  methods: {
    authenticate () {
      this.loading = true

      this.$store
        .dispatch('authenticate', `${this.agencia}${this.conta}`)
        .then(() => {
          this.$router.push('/')
        })
        .catch(err => {
          console.error(err)
          this.error = true
        })
        .finally(() => {
          this.loading = false
        })
    }
  }
}
</script>

<style>
.q-card {
  width: 360px;
}
</style>
