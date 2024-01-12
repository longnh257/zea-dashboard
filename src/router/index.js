import { createRouter, createWebHistory } from 'vue-router'
import Style from '../views/StyleView.vue'
import Home from '../views/HomeView.vue'
import Login from '../views/LoginView.vue'
import Forms from '../views/FormsView.vue'
import Tables from '../views/TablesView.vue'
import Page404 from '../views/Error/Page404View.vue'

const routes = [
  {
    path: '/',
    children: [
      {
        meta: {
          title: 'Tables'
        },
        path: `/`,
        name: "tables",
        component: Tables,
      },
      {
        meta: {
          title: 'Dashboard'
        },
        path: `dashboard`,
        name: "dashboard",
        component: Home,
      },

    ]
  },

  {
    meta: {
      title: 'Login'
    },
    path: "/login",
    name: "login",
    component: Login
  },
  {
    meta: {
      title: 'Profile'
    },
    path: '/profile',
    name: 'profile',
    component: () => import('@/views/ProfileView.vue')
  },
  {
    meta: {
      title: 'Ui'
    },
    path: '/ui',
    name: 'ui',
    component: () => import('@/views/UiView.vue')
  },
  {
    meta: {
      title: 'Responsive layout'
    },
    path: '/responsive',
    name: 'responsive',
    component: () => import('@/views/ResponsiveView.vue')
  },
  {
    meta: {
      title: 'Login'
    },
    path: '/login',
    name: 'login',
    component: () => import('@/views/LoginView.vue')
  },
  {
    meta: {
      title: 'Error'
    },
    path: '/error',
    name: 'error',
    component: () => import('@/views/ErrorView.vue')
  },
  {
    meta: {
      title: 'Forms'
    },
    path: `/forms`,
    name: "forms",
    component: Forms
  },
  {
    path: "/:PageNotFound(.*)*",
    component: Page404,
  },
]


console.log(routes)

const router = createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior(to, from, savedPosition) {
    return savedPosition || { top: 0 }
  }
})

export default router
