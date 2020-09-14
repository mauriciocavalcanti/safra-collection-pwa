# Safra Collection

APK para consumo dos serviços da aplicação da [API](https://github.com/andrevinicius201/HackaT6) do safra collection.

Desenvolvido em caráter emergencial pois a integração do [Android Studio](https://github.com/andrevinicius201/HackaT6Application) não iria dar tempo.

Client utiliza alguns [endpoints de open banking fornecidos pelo Safra](https://github.com/banco-safra/technee) durante o hackathon, são eles: os de obter dados da conta; obter saldo; obter extrato.

## Utilização do cliente

Basta instalar a [APK](app-release-unsigned.signed.apk) e logar com a agencia e conta utilizados no mock da api do hackathon fornecida pelo safra: 

Susan: Agência 0071 Conta 1234511

Satya: Agência 0071 Conta 1234522

Mark: Agência 0071 Conta 1234533

For Banco Safra

## Install the dependencies
```bash
npm install
```

### Start the app in development mode (hot-code reloading, error reporting, etc.)
```bash
quasar dev
```

### Lint the files
```bash
npm run lint
```

### Build the app for production
```bash
quasar build
```

### Customize the configuration
See [Configuring quasar.conf.js](https://quasar.dev/quasar-cli/quasar-conf-js).
