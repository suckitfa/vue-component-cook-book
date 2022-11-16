import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path:'/form',
      component:() => import('./views/form-page.vue')
    }
  ]
})