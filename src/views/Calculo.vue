<template>
  <div class="calculo">
    <h2>Cálculo de Calificaciones</h2>

    <div v-if="mensaje" :class="['alert', mensajeClass]">
      {{ mensaje }}
    </div>

    <form @submit.prevent="calcularCalificacion">
      <!-- Nota 1 -->
      <div class="mb-3">
        <label for="nota1" class="form-label">Nota 1:</label>
        <input type="number" id="nota1" v-model="nota1" class="form-control" min="10" max="70" required
               :aria-invalid="mostrarErrorNota1 ? 'true' : 'false'" :aria-describedby="mostrarErrorNota1 ? 'error-nota1' : ''" />
        <div v-if="mostrarErrorNota1" class="text-danger mt-1" id="error-nota1">La nota debe estar entre 10 y 70.</div>
      </div>

      <div class="mb-3">
        <label for="nota2" class="form-label">Nota 2:</label>
        <input type="number" id="nota2" v-model="nota2" class="form-control" min="10" max="70" required
               :aria-invalid="mostrarErrorNota2 ? 'true' : 'false'" :aria-describedby="mostrarErrorNota2 ? 'error-nota2' : ''" />
        <div v-if="mostrarErrorNota2" class="text-danger mt-1" id="error-nota2">La nota debe estar entre 10 y 70.</div>
      </div>

      <div class="mb-3">
        <label for="nota3" class="form-label">Nota 3:</label>
        <input type="number" id="nota3" v-model="nota3" class="form-control" min="10" max="70" required
               :aria-invalid="mostrarErrorNota3 ? 'true' : 'false'" :aria-describedby="mostrarErrorNota3 ? 'error-nota3' : ''" />
        <div v-if="mostrarErrorNota3" class="text-danger mt-1" id="error-nota3">La nota debe estar entre 10 y 70.</div>
      </div>

      <div class="mb-3">
        <label for="asistencia" class="form-label">Asistencia:</label>
        <input type="number" id="asistencia" v-model="asistencia" class="form-control" min="0" max="100" required
               :aria-invalid="mostrarErrorAsistencia ? 'true' : 'false'" :aria-describedby="mostrarErrorAsistencia ? 'error-asistencia' : ''" />
        <div v-if="mostrarErrorAsistencia" class="text-danger mt-1" id="error-asistencia">La asistencia debe estar entre 0 y 100.</div>
      </div>

      <button type="submit" class="btn btn-primary">Calcular</button>
    </form>

    <div v-if="resultado !== null" class="resultado">
      <p v-if="aprobado">El promedio es: {{ promedio.toFixed(2) }} - Aprobado</p>
      <p v-else>El promedio es: {{ promedio.toFixed(2) }} - Reprobado</p>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      nota1: null,
      nota2: null,
      nota3: null,
      asistencia: null,
      resultado: null,
      aprobado: false,
      promedio: 0,
      mensaje: '',
      mensajeClass: '',
      mostrarErrorNota1: false,
      mostrarErrorNota2: false,
      mostrarErrorNota3: false,
      mostrarErrorAsistencia: false,
    };
  },
  methods: {
    calcularCalificacion() {
      this.mostrarErrorNota1 = false;
      this.mostrarErrorNota2 = false;
      this.mostrarErrorNota3 = false;
      this.mostrarErrorAsistencia = false;
      this.mensaje = '';
      this.mensajeClass = '';

      let hayErrores = false;

      
      if (this.nota1 < 10 || this.nota1 > 70) {
        this.mostrarErrorNota1 = true;
        hayErrores = true;
      }

      if (this.nota2 < 10 || this.nota2 > 70) {
        this.mostrarErrorNota2 = true;
        hayErrores = true;
      }

      if (this.nota3 < 10 || this.nota3 > 70) {
        this.mostrarErrorNota3 = true;
        hayErrores = true;
      }

      if (this.asistencia < 0 || this.asistencia > 100) {
        this.mostrarErrorAsistencia = true;
        hayErrores = true;
      }

      
      if (hayErrores) {
        this.mensaje = 'Por favor, ingresa valores válidos en todos los campos.';
        this.mensajeClass = 'alert-danger';
        return;
      }

      const promedioPonderado =
        (this.nota1 * 0.35) +
        (this.nota2 * 0.35) +
        (this.nota3 * 0.30);

      this.promedio = promedioPonderado;

      if (promedioPonderado >= 40 && this.asistencia >= 80) {
        this.aprobado = true;
        this.mensaje = 'El cálculo fue exitoso.';
        this.mensajeClass = 'alert-success';
      } else {
        this.aprobado = false;
        this.mensaje = 'El cálculo fue exitoso.';
        this.mensajeClass = 'alert-warning';
      }

      this.resultado = true;
    }
  }
};
</script>

<style scoped>
.calculo {
  max-width: 600px;
  margin: 0 auto;
  padding: 20px;
}

h2 {
  text-align: center;
  margin-bottom: 30px;
}

button {
  width: 100%;
}

.resultado {
  margin-top: 20px;
  text-align: center;
  font-weight: bold;
}
</style>
