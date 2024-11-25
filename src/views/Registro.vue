<template>
  <div class="registro">
    <h2>Formulario de Registro</h2>

    <!-- Mostrar mensaje de error global si hay algún error -->
    <div v-if="mensaje" :class="['alert', mensajeClass]">
      {{ mensaje }}
    </div>

    <form @submit.prevent="validarFormulario">
      <!-- Nombre -->
      <div class="mb-3">
        <label for="nombre" class="form-label">Nombre:</label>
        <input type="text" id="nombre" v-model="nombre" class="form-control" @input="validarNombre"
               :aria-invalid="mostrarErrorNombre ? 'true' : 'false'" :aria-describedby="mostrarErrorNombre ? 'error-nombre' : ''" />
        <!-- Mostrar mensaje de error solo si el nombre está vacío al enviar el formulario -->
        <div v-if="mostrarErrorNombre" class="text-danger mt-1" id="error-nombre">El campo nombre es requerido.</div>
      </div>

      <!-- Correo -->
      <div class="mb-3">
        <label for="correo" class="form-label">Correo:</label>
        <input type="email" id="correo" v-model="correo" class="form-control" @input="validarCorreo"
               :aria-invalid="mostrarErrorCorreo ? 'true' : 'false'" :aria-describedby="mostrarErrorCorreo ? 'error-correo' : ''" />
        <!-- Mostrar mensaje de error si el correo está vacío o no es válido -->
        <div v-if="mostrarErrorCorreo" class="text-danger mt-1" id="error-correo">El campo correo es requerido.</div>
        <div v-if="correo && !correoRegex.test(correo)" class="text-danger mt-1" id="error-correo-regex">Por favor, ingresa un correo válido.</div>
      </div>

      <!-- Contraseña -->
      <div class="mb-3">
        <label for="contrasena" class="form-label">Contraseña:</label>
        <input type="password" id="contrasena" v-model="contrasena" class="form-control" @input="validarContrasena"
               :aria-invalid="mostrarErrorContrasena ? 'true' : 'false'" :aria-describedby="mostrarErrorContrasena ? 'error-contrasena' : ''" />
        <!-- Mostrar mensaje de error si la contraseña está vacía o tiene menos de 6 caracteres -->
        <div v-if="mostrarErrorContrasena" class="text-danger mt-1" id="error-contrasena">El campo contraseña es requerido.</div>
        <div v-if="contrasena && contrasena.trim().length < 6" class="text-danger mt-1" id="error-contrasena-largo">La contraseña debe tener al menos 6 caracteres.</div>
      </div>

      <!-- Repetir Contraseña -->
      <div class="mb-3">
        <label for="repetirContrasena" class="form-label">Repetir Contraseña:</label>
        <input type="password" id="repetirContrasena" v-model="repetirContrasena" class="form-control" @input="validarRepetirContrasena"
               :aria-invalid="mostrarErrorRepetirContrasena ? 'true' : 'false'" :aria-describedby="mostrarErrorRepetirContrasena ? 'error-repetir-contrasena' : ''" />
        <!-- Mostrar mensaje de error si el campo está vacío o si las contraseñas no coinciden -->
        <div v-if="mostrarErrorRepetirContrasena" class="text-danger mt-1" id="error-repetir-contrasena">El campo repetir contraseña es requerido.</div>
        <div v-if="repetirContrasena && repetirContrasena !== contrasena" class="text-danger mt-1" id="error-repetir-contrasena-coincidencia">Las contraseñas no coinciden.</div>
      </div>

      <button type="submit" class="btn btn-primary">Enviar</button>
    </form>

    <!-- Modal de éxito -->
    <div class="modal fade" id="registroModal" tabindex="-1" aria-labelledby="registroModalLabel" aria-hidden="true" v-if="mostrarModal">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="registroModalLabel">Registro Exitoso</h5>
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close" @click="cerrarModal"></button>
          </div>
          <div class="modal-body">
            <p>{{ mensaje }}</p>
            <p><strong>URL:</strong> {{ urlLocalhost }}</p> <!-- Mostrar URL completa con puerto -->
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal" @click="cerrarModal">Aceptar</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      nombre: '',
      correo: '',
      contrasena: '',
      repetirContrasena: '',
      mensaje: '',
      mensajeClass: '',
      correoRegex: /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/, // Expresión regular para el correo
      mostrarModal: false, // Variable para controlar la visibilidad del modal
      urlLocalhost: window.location.href, // Obtener la URL completa (con puerto)
      mostrarErrorNombre: false, // Variable para controlar el mensaje de error del nombre
      mostrarErrorCorreo: false, // Variable para controlar el mensaje de error del correo
      mostrarErrorContrasena: false, // Variable para controlar el mensaje de error de la contraseña
      mostrarErrorRepetirContrasena: false, // Variable para controlar el mensaje de error de repetir contraseña
    };
  },
  methods: {
    // Método para validar el nombre en tiempo real
    validarNombre() {
      if (this.nombre.trim()) {
        this.mostrarErrorNombre = false; // Ocultar error si el nombre tiene contenido
      }
    },
    // Método para validar el correo en tiempo real
    validarCorreo() {
      if (this.correo.trim()) {
        this.mostrarErrorCorreo = false; // Ocultar error si el correo tiene contenido
      }
    },
    // Método para validar la contraseña en tiempo real
    validarContrasena() {
      if (this.contrasena.trim()) {
        this.mostrarErrorContrasena = false; // Ocultar error si la contraseña tiene contenido
      }
    },
    // Método para validar el campo de repetir contraseña en tiempo real
    validarRepetirContrasena() {
      if (this.repetirContrasena.trim()) {
        this.mostrarErrorRepetirContrasena = false; // Ocultar error si el campo no está vacío
      }
    },

    // Método para validar el formulario
    validarFormulario() {
      // Limpiar mensajes de error antes de hacer cualquier validación
      this.mensaje = '';
      this.mensajeClass = '';
      this.mostrarErrorNombre = false;
      this.mostrarErrorCorreo = false;
      this.mostrarErrorContrasena = false;
      this.mostrarErrorRepetirContrasena = false;
      
      let hayErrores = false; // Variable para controlar si hay errores generales

      // Validación del nombre
      if (!this.nombre.trim()) {
        this.mostrarErrorNombre = true;
        this.mensaje = 'El campo nombre es requerido.';
        this.mensajeClass = 'alert-danger';
        hayErrores = true;
      }

      // Validación del correo
      if (!this.correo.trim()) {
        this.mostrarErrorCorreo = true;
        this.mensaje = 'El campo correo es requerido.';
        this.mensajeClass = 'alert-danger';
        hayErrores = true;
      } else if (!this.correoRegex.test(this.correo)) {
        this.mensaje = 'Por favor, ingresa un correo válido.';
        this.mensajeClass = 'alert-danger';
        hayErrores = true;
      }

      // Validación de la contraseña
      if (!this.contrasena.trim()) {
        this.mostrarErrorContrasena = true;
        this.mensaje = 'El campo contraseña es requerido.';
        this.mensajeClass = 'alert-danger';
        hayErrores = true;
      } else if (this.contrasena.trim().length < 6) {
        this.mensaje = 'La contraseña debe tener al menos 6 caracteres.';
        this.mensajeClass = 'alert-danger';
        hayErrores = true;
      }

      // Validación de repetir contraseña
      if (!this.repetirContrasena.trim()) {
        this.mostrarErrorRepetirContrasena = true;
        this.mensaje = 'El campo repetir contraseña es requerido.';
        this.mensajeClass = 'alert-danger';
        hayErrores = true;
      } else if (this.contrasena !== this.repetirContrasena) {
        this.mensaje = 'Las contraseñas no coinciden.';
        this.mensajeClass = 'alert-danger';
        hayErrores = true;
      }

      // Si hay errores, no continuar con el envío
      if (hayErrores) {
        return;
      }

      // Si todo está correcto, mostrar mensaje de éxito
      this.mensaje = 'El registro se ha realizado correctamente.';
      this.mensajeClass = 'alert-success';

      // Limpiar los campos después del envío
      this.nombre = '';
      this.correo = '';
      this.contrasena = '';
      this.repetirContrasena = '';

      // Mostrar modal de éxito
      this.mostrarModal = true;

      // Abrir el modal
      this.$nextTick(() => {
        const modal = new bootstrap.Modal(document.getElementById('registroModal'));
        modal.show();
      });
    },

    // Método para cerrar el modal
    cerrarModal() {
      this.mostrarModal = false;
    }
  }
};
</script>

<style scoped>
.registro {
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

.mensaje {
  margin-top: 20px;
  text-align: center;
  font-weight: bold;
}
</style>
