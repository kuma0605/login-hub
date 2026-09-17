import { createRouter, createWebHistory } from 'vue-router';
import GalleryHome from '../views/GalleryHome.vue';
import ImmersiveLoginView from '../views/ImmersiveLoginView.vue';

const routes = [
  {
    path: '/',
    name: 'GalleryHome',
    component: GalleryHome
  },
  {
    path: '/view/:id',
    name: 'ImmersiveLoginView',
    component: ImmersiveLoginView
  },
  {
    path: '/:pathMatch(.*)*',
    redirect: '/'
  }
];

export const router = createRouter({
  history: createWebHistory(),
  routes
});

export default router;
