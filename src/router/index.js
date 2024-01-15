import { createRouter, createWebHistory } from 'vue-router'
import Style from '../views/StyleView.vue'
import Home from '../views/HomeView.vue'
import Login from '../views/LoginView.vue'
import Forms from '../views/FormsView.vue'
import Tables from '../views/TablesView.vue'
import User from '../views/User/UserView.vue'
import UserCreate from '../views/User/UserCreateView.vue'
import Page404 from '../views/Error/Page404View.vue'
import auth from '@/middleware/auth'

const routes = [
  {
    path: '/',
    meta: {
      middleware: [auth],
    },
    children: [
      //USER
      {
        path: `/user`,
        children: [
          {
            meta: {
              title: 'User List'
            },
            path: ``,
            name: "user",
            component: User,
          },
          {
            meta: {
              title: 'Create User'
            },
            path: `create`,
            name: "user-create",
            component: UserCreate,
          },
          {
            meta: {
              title: 'Update User'
            },
            path: `update`,
            name: "user-update",
            component: UserCreate,
          },
          {
            meta: {
              title: 'User Detail'
            },
            path: `detail`,
            name: "user-detail",
            component: UserCreate,
          },
        ],
      },
      {
        meta: {
          title: 'Tables'
        },
        path: `/tables`,
        name: "tables",
        component: Tables,
      },
      {
        meta: {
          title: 'Dashboard'
        },
        path: `/`,
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


const router = createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior(to, from, savedPosition) {
    return savedPosition || { top: 0 }
  }
})

function nextFactory(context, middleware, index) {
  const subsequentMiddleware = middleware[index];
  if (!subsequentMiddleware) return context.next;

  return (...parameters) => {
    context.next(...parameters);
    const nextMiddleware = nextFactory(context, middleware, index + 1);
    subsequentMiddleware({ ...context, next: nextMiddleware });
  };
}

router.beforeEach((to, from, next) => {
  if (to.meta.middleware) {
    const middleware = Array.isArray(to.meta.middleware)
      ? to.meta.middleware
      : [to.meta.middleware];

    const context = {
      from,
      next,
      router,
      to,
    };
    const nextMiddleware = nextFactory(context, middleware, 1);

    return middleware[0]({ ...context, next: nextMiddleware });
  }

  return next();
});

export default router
