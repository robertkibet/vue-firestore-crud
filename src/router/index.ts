import { createRouter, createWebHistory } from 'vue-router'
import AllCities from '../views/cities/AllCities.vue'
import AddCity from '../views/cities/AddCity.vue'
import EditCity from '../views/cities/EditCity.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: AllCities,
      meta: {
        title: 'Cities - Home'
      }
    },
    {
      path: '/cities/add',
      name: 'add-city',
      component: AddCity,
      meta: {
        title: 'Cities - Add'
      }
    },
    {
      path: '/cities/:cityId',
      name: 'edit-city',
      component: EditCity,
      meta: {
        title: 'Cities - Edit'
      }
    }
  ]
})

router.beforeEach((to, from, next) => {
  document.title = (to.meta.title as string) || 'Cities - CRUD App'
  next()
})

export default router
