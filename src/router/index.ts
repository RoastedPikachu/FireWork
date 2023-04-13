import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router';
import SignInPage from '@/pages/SignInPage.vue';
import RegistrationPage from '@/pages/RegistrationPage.vue';
import ProfilePage from '@/pages/ProfilePage.vue';
import ExecutorsPage from '@/pages/ExecutorsPage.vue';
import CustomersPage from '@/pages/CustomersPage.vue';
import ChatPage from '@/pages/ChatPage.vue';
import FirstPage from '@/pages/FirstPage.vue';
import OtherProfilePage from '@/pages/OtherProfilePage.vue';

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'firstPage',
    component: FirstPage
  },
  {
    path: '/signIn',
    name: 'signInPage',
    component: SignInPage
  },
  {
    path: '/registration',
    name: 'registrationPage',
    component: RegistrationPage
  },
  {
    path: '/myProfile',
    name: 'myProfilePage',
    component: ProfilePage
  },
  {
    path: '/profile:id',
    name: 'profilePage',
    component: OtherProfilePage
  },
  {
    path: '/executors',
    name: 'executorsPage',
    component: ExecutorsPage
  },
  {
    path: '/customers',
    name: 'customersPage',
    component: CustomersPage
  },
  {
    path: '/chat:id',
    name: 'chatPage',
    component: ChatPage
  }
  
    //component: () => import(/* webpackChunkName: "about" */ '')
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
