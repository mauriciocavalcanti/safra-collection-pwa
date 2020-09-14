<template>
  <q-page class="page page-home" v-if="account">
    <div class="welcome-banner">
      <div class="page-title-balance">
        <p>Seu saldo disponível:</p>
        <span>{{ balance.Amount.Amount | currency }}</span>
      </div>
    </div>

    <h4 class="page-title">Olá {{account.Nickname}}.</h4>

    <div class="transactions-section">
      <h6>Últimos lançamentos</h6>

      <div class="transactions-list">
        <div v-for="transaction in transactions" :key="transaction.transactionId">
          <i></i>
          <div>
            <p class="transaction-title">{{ transaction.transactionInformation }}</p>
            <p class="transaction-date">{{ new Date(transaction.valueDateTime) | dateFormat('DD/MM/YYYY') }}</p>
          </div>
          <div>
            <p class="transaction-value">{{ transaction.amount.amount | currency }}</p>
          </div>
        </div>
      </div>
    </div>

    <div style="margin-top: 3em">
      <q-btn color="primary" icon-right="arrow_forward" label="Acompanhe o seu álbum" to="/prizes" />
    </div>
  </q-page>
</template>

<script>
export default {
  name: 'PageIndex',
  computed: {
    account () {
      return this.$store.state.account
    },
    balance () {
      return this.$store.state.balance
    },
    transactions () {
      return this.$store.state.transactions
    }
  }
}
</script>
