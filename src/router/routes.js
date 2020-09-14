
const routes = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '', component: () => import('pages/Index.vue') },
      { path: 'prizes', component: () => import('pages/Prizes.vue') },
      { path: 'buy', component: () => import('pages/Buy.vue') }
    ]
  },
  {
    path: '/login',
    component: () => import('layouts/BasicLayout.vue'),
    children: [
      { path: '', component: () => import('pages/Login.vue') }
    ]
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '*',
    component: () => import('pages/Error404.vue')
  }
]

export default routes
