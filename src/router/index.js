import { createRouter, createWebHistory } from 'vue-router';
import Calculo from '../views/Calculo.vue';  // Vista de cálculo de calificaciones
import Registro from '../views/Registro.vue';  // Vista del formulario de registro

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
