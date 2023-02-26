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
          @click="toggleLeftDrawer"
        />

        <q-toolbar-title>
          My Profile
        </q-toolbar-title>

        <div>Puttipong panomprai 6304101353</div>
      </q-toolbar>
    </q-header>

    <q-drawer
      v-model="leftDrawerOpen"
      show-if-above
      bordered
    >
      <q-list>
        <q-item-label
          header
        >
          Essential Links
        </q-item-label>

        <EssentialLink
          v-for="link in essentialLinks"
          :key="link.title"
          v-bind="link"
        />
      </q-list>
    </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>
import { defineComponent, ref } from 'vue'
import EssentialLink from 'components/EssentialLink.vue'

const linksList = [
  {
    title: 'Sign up',
    caption: 'Registry Account',
    icon: 'school',
    link: '/MyFrom'
  },
  {
    title: 'Detail',
    caption: 'Users detail.',
    icon: 'perm_identity',
    link: '/Dashbord'
  }
]

export default defineComponent({
  name: 'MainLayout',

  components: {
    EssentialLink
  },

  setup () {
    const leftDrawerOpen = ref(false)

    return {
      essentialLinks: linksList,
      leftDrawerOpen,
      toggleLeftDrawer () {
        leftDrawerOpen.value = !leftDrawerOpen.value
      }
    }
  }
})
</script>
<style>
q-header{
  background-color: black;
  color: black;
  border:10px solid black;
}
q-toolbar{
  background-color: black;
  color:black;
  border:10px solid black;
}
q-toolbar-title{
  background-color: black;
  color:black;
  border:10px solid black;
}
</style>