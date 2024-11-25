<template>
  <div id="app">
    <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
      <div class="container-fluid">
        <a class="navbar-brand" href="#">Programación Front End</a>
        <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarNav">
          <ul class="navbar-nav">
            <li class="nav-item">
              <router-link to="/" class="nav-link" active-class="active" :aria-current="isCurrentRoute('/') ? 'page' : null">Cálculo de Calificaciones</router-link>
            </li>
            <li class="nav-item">
              <router-link to="/registro" class="nav-link" active-class="active" :aria-current="isCurrentRoute('/registro') ? 'page' : null">Formulario de Registro</router-link>
            </li>
          </ul>
        </div>
        
        <form class="d-flex" role="search" aria-label="Formulario de búsqueda">
          <input class="form-control me-2" type="search" placeholder="Buscar" aria-label="Buscar" />
          <button class="btn btn-outline-success" type="submit" aria-label="Buscar">Buscar</button>
        </form>
        <!-- Indicador de construcción -->
        <span class="text-danger ms-3" aria-live="polite">En construcción</span>
      </div>
    </nav>

    
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: "App",
  methods: {
    isCurrentRoute(route) {
      return this.$route.path === route;
    }
  }
}
</script>

