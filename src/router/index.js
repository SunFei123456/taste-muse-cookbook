import { createRouter, createWebHistory } from 'vue-router'
import { useUserStore } from '../stores/user'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: () => import('../views/HomeView.vue'),
      meta: { layout: 'default' }
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('../views/LoginView.vue'),
      meta: { layout: 'auth' }
    },
    {
      path: '/register',
      name: 'register',
      component: () => import('../views/RegisterView.vue'),
      meta: { layout: 'auth' }
    },
    {
      path: '/profile',
      name: 'profile',
      component: () => import('../views/ProfileView.vue'),
      meta: { layout: 'default', requiresAuth: true }
    },
    {
      path: '/recipe/:id',
      name: 'recipe-detail',
      component: () => import('../views/RecipeDetail.vue'),
      meta: { layout: 'default' }
    },
    {
      path: '/forum',
      name: 'forum',
      component: () => import('../views/ForumView.vue'),
      meta: { layout: 'default' }
    }
  ]
})

// Navigation Guard
router.beforeEach((to, from, next) => {
  const userStore = useUserStore()
  if (to.meta.requiresAuth && !userStore.currentUser) {
    next('/login')
  } else {
    next()
  }
})

export default router
