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
      component: AllCities
    },
    {
      path: '/cities/add',
      name: 'add-city',
      component: AddCity
    },
    {
      path: '/cities/:cityId',
      name: 'edit-city',
      component: EditCity
    }
  ]
})

export default router
