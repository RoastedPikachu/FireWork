import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router';
import HomePage from '@/pages/HomePage.vue';
import SignInPage from '@/pages/SignInPage.vue';

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'homePage',
    component: HomePage
  },
  {
    path: '/signIn',
    name: 'signInPage',
    component: SignInPage
  }
  
    //component: () => import(/* webpackChunkName: "about" */ '')
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
