import {createRouter, createWebHashHistory} from 'vue-router';
import type { RouteRecordRaw } from 'vue-router';

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    redirect: '/Voucher',
  },
  {
    path: '/Voucher',
    component: () => import('../views/voucher/voucher.vue')
  },
];

const router = createRouter({
  routes,
  history: createWebHashHistory()
})

export default router


