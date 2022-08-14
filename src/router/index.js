import { createRouter, createWebHistory } from 'vue-router'

export const routes = [
  {
    path: '/',
    name: 'Home',
    meta: {
      title: '首頁',
      icon: 'home',
      requiresAuth: true,
    },
    component: () => import('../views/Home/Home.vue'),
  },
  {
    path: '/analytics',
    name: 'Analytics',
    meta: {
      title: '圖表',
      icon: 'analytics',
      requiresAuth: true,
    },
    component: () => import('../views/Analytics/Analytics.vue'),
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

router.beforeEach((to) => {
  if (!router.hasRoute(to.name)) {
    return {
      name: 'Home',
    }
  }
  if (to.meta.title) {
    document.title = `${ to.meta.title } | SOC Room`;
  }
})

export default router