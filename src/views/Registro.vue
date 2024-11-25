<template>
  <div class="registro">
    <h2>Formulario de Registro</h2>
    <div v-if="mensaje" :class="['alert', mensajeClass]">
      {{ mensaje }}
    </div>

    <form @submit.prevent="validarFormulario">
      
      <div class="mb-3">
        <label for="nombre" class="form-label">Nombre:</label>
        <input type="text" id="nombre" v-model="nombre" class="form-control" @input="validarNombre"
               :aria-invalid="mostrarErrorNombre ? 'true' : 'false'" :aria-describedby="mostrarErrorNombre ? 'error-nombre' : ''" />
        
        <div v-if="mostrarErrorNombre" class="text-danger mt-1" id="error-nombre">El campo nombre es requerido.</div>
      </div>

      <div class="mb-3">
        <label for="correo" class="form-label">Correo:</label>
        <input type="email" id="correo" v-model="correo" class="form-control" @input="validarCorreo"
               :aria-invalid="mostrarErrorCorreo ? 'true' : 'false'" :aria-describedby="mostrarErrorCorreo ? 'error-correo' : ''" />
       
        <div v-if="mostrarErrorCorreo" class="text-danger mt-1" id="error-correo">El campo correo es requerido.</div>
        <div v-if="correo && !correoRegex.test(correo)" class="text-danger mt-1" id="error-correo-regex">Por favor, ingresa un correo válido.</div>
      </div>
    
      <div class="mb-3">
        <label for="contrasena" class="form-label">Contraseña:</label>
        <input type="password" id="contrasena" v-model="contrasena" class="form-control" @input="validarContrasena"
               :aria-invalid="mostrarErrorContrasena ? 'true' : 'false'" :aria-describedby="mostrarErrorContrasena ? 'error-contrasena' : ''" />
        
        <div v-if="mostrarErrorContrasena" class="text-danger mt-1" id="error-contrasena">El campo contraseña es requerido.</div>
        <div v-if="contrasena && contrasena.trim().length < 6" class="text-danger mt-1" id="error-contrasena-largo">La contraseña debe tener al menos 6 caracteres.</div>
      </div>
     
      <div class="mb-3">
        <label for="repetirContrasena" class="form-label">Repetir Contraseña:</label>
        <input type="password" id="repetirContrasena" v-model="repetirContrasena" class="form-control" @input="validarRepetirContrasena"
               :aria-invalid="mostrarErrorRepetirContrasena ? 'true' : 'false'" :aria-describedby="mostrarErrorRepetirContrasena ? 'error-repetir-contrasena' : ''" />
       
        <div v-if="mostrarErrorRepetirContrasena" class="text-danger mt-1" id="error-repetir-contrasena">El campo repetir contraseña es requerido.</div>
        <div v-if="repetirContrasena && repetirContrasena !== contrasena" class="text-danger mt-1" id="error-repetir-contrasena-coincidencia">Las contraseñas no coinciden.</div>
      </div>

      <button type="submit" class="btn btn-primary">Enviar</button>
    </form>

    
    <div class="modal fade" id="registroModal" tabindex="-1" aria-labelledby="registroModalLabel" aria-hidden="true" v-if="mostrarModal">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="registroModalLabel">Registro Exitoso</h5>
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close" @click="cerrarModal"></button>
          </div>
          <div class="modal-body">
            <p>{{ mensaje }}</p>
            <p><strong>URL:</strong> {{ urlLocalhost }}</p> 
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
      correoRegex: /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/, 
      mostrarModal: false, 
      urlLocalhost: window.location.href, 
      mostrarErrorNombre: false, 
      mostrarErrorCorreo: false, 
      mostrarErrorContrasena: false, 
      mostrarErrorRepetirContrasena: false, 
    };
  },
  methods: {
    
    validarNombre() {
      if (this.nombre.trim()) {
        this.mostrarErrorNombre = false; 
      }
    },
    
    validarCorreo() {
      if (this.correo.trim()) {
        this.mostrarErrorCorreo = false; 
      }
    },
    
    validarContrasena() {
      if (this.contrasena.trim()) {
        this.mostrarErrorContrasena = false; 
      }
    },
    
    validarRepetirContrasena() {
      if (this.repetirContrasena.trim()) {
        this.mostrarErrorRepetirContrasena = false; 
      }
    },

    
    validarFormulario() {
      
      this.mensaje = '';
      this.mensajeClass = '';
      this.mostrarErrorNombre = false;
      this.mostrarErrorCorreo = false;
      this.mostrarErrorContrasena = false;
      this.mostrarErrorRepetirContrasena = false;
      
      let hayErrores = false; 

      
      if (!this.nombre.trim()) {
        this.mostrarErrorNombre = true;
        this.mensaje = 'El campo nombre es requerido.';
        this.mensajeClass = 'alert-danger';
        hayErrores = true;
      }

      
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

     
      if (hayErrores) {
        return;
      }

      this.mensaje = 'El registro se ha realizado correctamente.';
      this.mensajeClass = 'alert-success';

      
      this.nombre = '';
      this.correo = '';
      this.contrasena = '';
      this.repetirContrasena = '';

      
      this.mostrarModal = true;

      
      this.$nextTick(() => {
        const modal = new bootstrap.Modal(document.getElementById('registroModal'));
        modal.show();
      });
    },

   
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
