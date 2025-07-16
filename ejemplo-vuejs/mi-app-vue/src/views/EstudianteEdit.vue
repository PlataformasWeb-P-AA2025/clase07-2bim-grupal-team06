<template>
  <div class="form-container">
    <h2>Editar Estudiante</h2>
    <div v-if="loading">Cargando datos del estudiante...</div>

    <form v-else @submit.prevent="actualizarEstudiante">
      <div class="form-group">
        <label for="nombre">Nombre:</label>
        <input type="text" id="nombre" v-model="estudiante.nombre" required />
      </div>
      <div class="form-group">
        <label for="apellido">Apellido:</label>
        <input
          type="text"
          id="apellido"
          v-model="estudiante.apellido"
          required
        />
      </div>
      <div class="form-group">
        <label for="cedula">Cédula:</label>
        <input type="text" id="cedula" v-model="estudiante.cedula" disabled />
        <small>La cédula no se puede modificar.</small>
      </div>
      <div class="form-group">
        <label for="correo">Correo Electrónico:</label>
        <input type="email" id="correo" v-model="estudiante.correo" required />
      </div>

      <div v-if="error" class="error-message">{{ error }}</div>

      <div class="button-group">
        <button type="submit" class="submit-button">Actualizar Cambios</button>
        <router-link to="/estudiantes" class="cancel-button"
          >Cancelar</router-link
        >
      </div>
    </form>
  </div>
</template>

<script>
import api from "@/api/axios";

export default {
  name: "EstudianteEdit",
  props: {
    id: {
      // El 'id' viene del router como prop
      type: [String, Number],
      required: true,
    },
  },
  data() {
    return {
      estudiante: {}, // Empezamos con un objeto vacío
      loading: true,
      error: null,
    };
  },
  // Usamos 'created' para cargar los datos del estudiante en cuanto el componente se crea
  created() {
    this.fetchEstudiante();
  },
  methods: {
    // 1. Método para CARGAR los datos del estudiante desde la API
    async fetchEstudiante() {
      this.loading = true;
      this.error = null;
      try {
        // Hacemos un GET al endpoint del estudiante específico: 'estudiantes/1/'
        const response = await api.get(`estudiantes/${this.id}/`);
        this.estudiante = response.data;
      } catch (err) {
        console.error("Error al cargar el estudiante:", err.response || err);
        this.error = "No se pudieron cargar los datos para editar.";
      } finally {
        this.loading = false;
      }
    },

    // 2. Método para ENVIAR los datos actualizados a la API
    async actualizarEstudiante() {
      this.error = null;
      try {
        // Usamos 'put' para actualizar el recurso completo en 'estudiantes/1/'
        await api.put(`estudiantes/${this.id}/`, this.estudiante);

        alert("¡Estudiante actualizado con éxito!");

        // Redirigimos al usuario de vuelta al listado
        this.$router.push("/estudiantes");
      } catch (err) {
        console.error(
          "Error al actualizar el estudiante:",
          err.response || err
        );
        if (err.response && err.response.data) {
          const errores = err.response.data;
          let mensajesError = "No se pudo actualizar. Errores:\n";
          for (const campo in errores) {
            mensajesError += `- ${campo}: ${errores[campo].join(", ")}\n`;
          }
          this.error = mensajesError;
        } else {
          this.error = "Ocurrió un error inesperado al actualizar.";
        }
      }
    },
  },
};
</script>

<style scoped>
/* Usamos los mismos estilos que en EstudianteAgregar para consistencia */
.form-container {
  max-width: 600px;
  margin: 50px auto;
  padding: 20px;
  border: 1px solid #ccc;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
}
h2 {
  text-align: center;
  margin-bottom: 20px;
}
.form-group {
  margin-bottom: 15px;
}
.form-group label {
  display: block;
  margin-bottom: 5px;
  font-weight: bold;
}
.form-group input {
  width: 100%;
  padding: 8px;
  border: 1px solid #ccc;
  border-radius: 4px;
  box-sizing: border-box;
}

/* Estilo para inputs deshabilitados */
.form-group input:disabled {
  background-color: #e9ecef;
  cursor: not-allowed;
}

.form-group small {
  font-size: 0.8rem;
  color: #6c757d;
}

.button-group {
  display: flex;
  gap: 10px; /* Espacio entre botones */
  margin-top: 20px;
}

.submit-button,
.cancel-button {
  flex: 1; /* Hace que ambos botones ocupen el mismo espacio */
  display: block;
  width: 100%;
  padding: 10px;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-size: 1rem;
  text-align: center;
  text-decoration: none;
}

.submit-button {
  background-color: #007bff; /* Azul para actualizar */
}
.submit-button:hover {
  background-color: #0056b3;
}
.cancel-button {
  background-color: #6c757d; /* Gris para cancelar */
}
.cancel-button:hover {
  background-color: #5a6268;
}

.error-message {
  color: red;
  margin-bottom: 15px;
  white-space: pre-line;
}
</style>
