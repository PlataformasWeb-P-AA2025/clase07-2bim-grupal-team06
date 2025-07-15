<!-- src/views/EstudiantesList.vue -->
<template>
  <div class="estudiantes-list-container">
    <h2>Listado de Estudiantes</h2>
    <p v-if="loading">Cargando estudiantes...</p>
    <p v-if="error" class="error-message">{{ error }}</p>

    <!-- Se mantiene tu estructura de lista original -->
    <ul v-else-if="estudiantes.length">
      <li
        v-for="estudiante in estudiantes"
        :key="estudiante.url"
        class="estudiante-item"
      >
        <!-- Contenedor flex para alinear el nombre y los botones -->
        <div class="item-content">
          <!-- Tu router-link original para ir al detalle -->
          <router-link
            :to="{
              name: 'EstudianteDetail',
              params: { estudianteUrl: estudiante.url },
            }"
            class="item-link"
          >
            {{ estudiante.nombre }} {{ estudiante.apellido }} (Cédula:
            {{ estudiante.cedula }})
          </router-link>

          <!-- Botones de acción añadidos aquí -->
          <div class="actions">
            <router-link
              :to="{
                name: 'EstudianteEdit',
                params: { id: getIdFromUrl(estudiante.url) },
              }"
              class="action-button edit"
            >
              Editar
            </router-link>
            <button
              @click="eliminarEstudiante(getIdFromUrl(estudiante.url))"
              class="action-button delete"
            >
              Eliminar
            </button>
          </div>
        </div>
      </li>
    </ul>
    <p v-else>No hay estudiantes registrados.</p>

    <!-- Tu botón para agregar nuevos estudiantes se mantiene intacto -->
    <router-link to="/estudiantes/nuevo" class="add-button"
      >Agregar Nuevo Estudiante</router-link
    >
  </div>
</template>

<script>
import api from "@/api/axios";

export default {
  name: "EstudiantesList",
  data() {
    return {
      estudiantes: [],
      loading: true,
      error: null,
    };
  },
  created() {
    this.fetchEstudiantes();
  },
  methods: {
    async fetchEstudiantes() {
      try {
        this.loading = true;
        this.error = null;
        const response = await api.get("estudiantes/");
        this.estudiantes = response.data.results || response.data;
      } catch (err) {
        console.error("Error al cargar estudiantes:", err.response || err);
        this.error =
          "No se pudieron cargar los estudiantes. Asegúrate de estar logueado.";
      } finally {
        this.loading = false;
      }
    },
    // Método para extraer el ID de la URL (necesario si no se modifica el backend)
    getIdFromUrl(url) {
      if (!url) {
        return null;
      }
      const matches = url.match(/\/(\d+)\/$/);
      return matches ? matches[1] : null;
    },
    // Método para eliminar, que usa el ID extraído
    eliminarEstudiante(id) {
      if (!id) {
        alert("No se pudo obtener el ID del estudiante.");
        return;
      }
      if (
        window.confirm("¿Estás seguro de que quieres eliminar este estudiante?")
      ) {
        api
          .delete(`estudiantes/${id}/`)
          .then(() => {
            alert("Estudiante eliminado con éxito.");
            this.fetchEstudiantes(); // Recargamos la lista
          })
          .catch((error) => {
            console.error("Error al eliminar estudiante:", error);
            alert("No se pudo eliminar el estudiante.");
          });
      }
    },
  },
};
</script>

<style scoped>
/* Estilos originales mantenidos y ajustados */
.estudiantes-list-container {
  max-width: 800px;
  margin: 50px auto;
  padding: 20px;
  border: 1px solid #ccc;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  background-color: #fff;
}

h2 {
  text-align: center;
  color: #333;
  margin-bottom: 20px;
}

ul {
  list-style: none;
  padding: 0;
}

.estudiante-item {
  padding: 10px;
  border-bottom: 1px solid #eee;
}

.estudiante-item:last-child {
  border-bottom: none;
}

/* Nuevo estilo para el contenedor flex */
.item-content {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.item-link {
  text-decoration: none;
  color: #007bff;
  font-weight: bold;
}

.item-link:hover {
  text-decoration: underline;
}

/* Estilos para los botones de acción */
.actions .action-button {
  text-decoration: none;
  color: white;
  padding: 5px 10px;
  border-radius: 4px;
  font-size: 0.8rem;
  margin-left: 10px;
  border: none;
  cursor: pointer;
  transition: opacity 0.3s ease;
}

.actions .action-button:hover {
  opacity: 0.8;
}

.action-button.edit {
  background-color: #ffc107;
}

.action-button.delete {
  background-color: #dc3545;
}

/* Estilo original del botón de agregar */
.add-button {
  display: block;
  width: fit-content;
  margin: 20px auto 0;
  padding: 10px 20px;
  background-color: #28a745;
  color: white;
  border-radius: 5px;
  text-decoration: none;
  text-align: center;
  transition: background-color 0.3s ease;
}

.add-button:hover {
  background-color: #218838;
}

.error-message {
  color: red;
  text-align: center;
  margin-top: 10px;
}
</style>
