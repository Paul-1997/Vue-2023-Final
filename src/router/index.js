import { createRouter, createWebHashHistory } from 'vue-router';

const router = createRouter({
  history: createWebHashHistory(import.meta.env.BASE_URL),
  linkExactActiveClass: 'link--active',
  routes: [
    // front
    {
      path: '/',
      component: () => import('../views/front/FrontView.vue'),
      children: [
        {
          path: '/',
          name: 'home',
          component: () => import('../views/front/HomeView.vue'),
        },
        {
          path: 'about',
          name: 'about',
          component: () => import('../views/front/AboutView.vue'),
        },
        {
          path: 'order',
          name: 'order',
          component: () => import('../views/front/OrderView.vue'),
        },
        {
          path: 'products',
          name: 'products',
          component: () => import('../views/front/ProductsView.vue'),
        },
        //   {
        //     path: 'products/:id',
        //     name: 'productDetail',
        //     component: () => import('../views/front/ProductDetailView.vue'),
        //   },
      ],
    },
    // dashboard
    {
      path: '/admin',
      component: () => import('../views/admin/DashboardView.vue'),
      children: [
        {
          path: '/admin',
          component: () => import('../views/admin/DashboardHomeView.vue'),
        },
        {
          path: 'products',
          component: () => import('../views/admin/DashboardProductView.vue'),
        },
        {
          path: 'orders',
          component: () => import('../views/admin/DashboardOrderView.vue'),
        },
        {
          path: 'coupons',
          component: () => import('../views/admin/DashboardCouponView.vue'),
        },
      ],
    },
    {
      path: '/login',
      component: () => import('../views/LoginView.vue'),
    },
  ],
});

export default router;
