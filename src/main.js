import { createApp } from 'vue';
import App from './App.vue'; // Componente principal
import { createRouter, createWebHistory } from 'vue-router';
import Calculo from './views/Calculo.vue'; // Vista de cálculo
import Registro from './views/Registro.vue'; // Vista de registro

// Definir las rutas
const routes = [
  { path: '/', component: Calculo },
  { path: '/registro', component: Registro }
];

// Crear el enrutador
const router = createRouter({
  history: createWebHistory(),  // Esto usa el historial del navegador
  routes  // Aquí pasas las rutas que definiste
});

// Crear la instancia de Vue y montar la app
const app = createApp(App);
app.use(router); // Usar Vue Router
app.mount('#app');   // Montar la app en el div con id="app"
