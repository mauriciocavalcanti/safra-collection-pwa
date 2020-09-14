<template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated>
      <q-toolbar>
        <q-btn
          flat
          dense
          round
          icon="menu"
          aria-label="Menu"
          @click="leftDrawerOpen = !leftDrawerOpen"
        />

        <q-toolbar-title>
          Safra Collection
        </q-toolbar-title>
      </q-toolbar>
    </q-header>

    <q-drawer
      v-model="leftDrawerOpen"
      show-if-above
      bordered
      content-class="bg-grey-1"
    >
      <q-list>
        <br><br>

        <q-item
          v-for="link in essentialLinks"
          :key="link.title"
          v-bind="link"
          clickable
          tag="a"
          :to="link.link"
        >
          <q-item-section
            v-if="link.icon"
            avatar
          >
            <q-icon :name="link.icon" />
          </q-item-section>

          <q-item-section>
            <q-item-label>{{ link.title }}</q-item-label>
            <q-item-label caption>
              {{ link.caption }}
            </q-item-label>
          </q-item-section>
        </q-item>

        <div class="separator"></div>

        <q-item
          clickable
          tag="a"
          @click="logout()"
        >
          <q-item-section>
            <q-item-label>Sair</q-item-label>
          </q-item-section>
        </q-item>
      </q-list>
    </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>
const linksData = [
  {
    title: 'Homepage',
    caption: 'Sua central Safra',
    icon: 'home',
    link: '/'
  },
  {
    title: 'Prêmios',
    icon: 'tab_unselected',
    caption: 'Acompanhe o seu álbum',
    link: '/prizes'
  }
]

export default {
  name: 'MainLayout',
  data () {
    return {
      leftDrawerOpen: false,
      essentialLinks: linksData
    }
  },
  methods: {
    logout () {
      this.$store.commit('logout')
      this.$router.push('/login')
    }
  }
}
</script>

<style scoped>

.separator {
  height: 1px;
  background: #ddd;
  margin: 60px 1em 10px;
}

</style>
