import { createRouter, createWebHistory } from 'vue-router';
import Calculo from '../views/Calculo.vue';  
import Registro from '../views/Registro.vue';  

const routes = [
  {
    path: '/calculo',
    name: 'Calculo',
    component: Calculo,
  },
  {
    path: '/registro',
    name: 'Registro',
    component: Registro,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
