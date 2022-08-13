import { createRouter, createWebHistory } from 'vue-router'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: () => import('../views/Home/Home.vue'),
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

router.beforeEach(async(to) => {
  if (!router.hasRoute(to.name)) {
    return {
      name: 'Home',
    }
  }
})

export default router