import MyFrom from 'pages/MyFrom.vue'
import DashBord from "pages/DashBord.vue"
import MainLayout from "layouts/MainLayout.vue"

const routes = [
  {
    path: '/',
    component: MainLayout,
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '/MyFrom',
    component: MyFrom
  },
  {
    path: '/DashBord',
    component: DashBord,
  },

]

export default routes
