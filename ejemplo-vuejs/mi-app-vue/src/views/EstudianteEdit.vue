<!-- src/views/EstudianteEdit.vue -->
<template>
  <div class="estudiante-edit-container">
    <h2>Editar Estudiante</h2>
    <p v-if="loading">Cargando datos del estudiante...</p>
    <p v-if="error" class="error-message">{{ error }}</p>

    <!-- Formulario para editar, se muestra cuando los datos del estudiante están cargados -->
    <form v-if="estudiante" @submit.prevent="actualizarEstudiante">
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
        <input type="text" id="cedula" v-model="estudiante.cedula" required />
      </div>
      <div class="form-group">
        <label for="correo">Correo:</label>
        <input type="email" id="correo" v-model="estudiante.correo" required />
      </div>

      <!-- Botones de acción del formulario -->
      <div class="form-actions">
        <button type="submit" class="action-button save">
          Guardar Cambios
        </button>
        <router-link
          :to="{ name: 'EstudiantesList' }"
          class="action-button cancel"
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
      type: [String, Number],
      required: true,
    },
  },
  data() {
    return {
      estudiante: null,
      loading: true,
      error: null,
    };
  },
  created() {
    this.fetchEstudiante();
  },
  methods: {
    // Obtiene los datos del estudiante específico usando el ID de la URL
    async fetchEstudiante() {
      try {
        this.loading = true;
        this.error = null;
        const response = await api.get(`estudiantes/${this.id}/`);
        this.estudiante = response.data;
      } catch (err) {
        console.error("Error al cargar el estudiante:", err.response || err);
        this.error = "No se pudieron cargar los datos del estudiante.";
      } finally {
        this.loading = false;
      }
    },
    // Envía los datos actualizados a la API
    actualizarEstudiante() {
      api
        .put(`estudiantes/${this.id}/`, this.estudiante)
        .then(() => {
          alert("Estudiante actualizado con éxito.");
          this.$router.push({ name: "EstudiantesList" });
        })
        .catch((error) => {
          console.error(
            "Error al actualizar el estudiante:",
            error.response.data
          );
          alert("Hubo un error al guardar los cambios.");
        });
    },
  },
};
</script>

<style scoped>
/* Estilos basados en EstudianteDetail.vue para consistencia */
.estudiante-edit-container {
  max-width: 600px;
  margin: 50px auto;
  padding: 20px;
  border: 1px solid #ccc;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  background-color: #fff;
  text-align: left;
}

h2 {
  text-align: center;
  color: #333;
  margin-bottom: 25px;
}

.form-group {
  margin-bottom: 15px;
}

.form-group label {
  display: block;
  margin-bottom: 5px;
  font-weight: bold;
  color: #555;
}

.form-group input {
  width: 100%;
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 4px;
  box-sizing: border-box; /* Importante para que el padding no afecte el ancho */
}

.form-actions {
  display: flex;
  justify-content: center;
  gap: 15px;
  margin-top: 25px;
}

.action-button {
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
  color: white;
  text-decoration: none;
  cursor: pointer;
  text-align: center;
  transition: background-color 0.3s ease;
}

.action-button.save {
  background-color: #28a745; /* Verde para guardar */
}
.action-button.save:hover {
  background-color: #218838;
}

.action-button.cancel {
  background-color: #6c757d; /* Gris para cancelar */
}
.action-button.cancel:hover {
  background-color: #5a6268;
}

.error-message {
  color: red;
  text-align: center;
  margin-top: 10px;
}
</style>
