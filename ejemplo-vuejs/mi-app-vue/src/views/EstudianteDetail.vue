<template>
  <div class="estudiante-detail-container">
    <h2>Detalle del Estudiante</h2>
    <p v-if="loading">Cargando detalles...</p>
    <p v-if="error" class="error-message">{{ error }}</p>
    <div v-else-if="estudiante">
      <h3>{{ estudiante.nombre }} {{ estudiante.apellido }}</h3>
      <p><strong>Cédula:</strong> {{ estudiante.cedula }}</p>
      <p><strong>Correo:</strong> {{ estudiante.correo }}</p>

      <div class="telefonos-section">
        <div class="telefonos-header">
          <h4>Números Telefónicos:</h4>
          <router-link
            :to="{
              name: 'TelefonoAgregar',
              query: { estudianteUrl: estudiante.url },
            }"
            class="action-button add"
          >
            Agregar Teléfono
          </router-link>
        </div>
        <ul v-if="numerosTelefonicos.length">
          <li
            v-for="numero in numerosTelefonicos"
            :key="numero.url"
            class="telefono-item"
          >
            <span>{{ numero.telefono }} ({{ numero.tipo }})</span>
            <div class="actions">
              <router-link
                :to="{
                  name: 'TelefonoEdit',
                  params: { id: getIdFromUrl(numero.url) },
                  query: { backUrl: estudiante.url },
                }"
                class="action-button edit"
              >
                Editar
              </router-link>
              <button
                @click="eliminarTelefono(getIdFromUrl(numero.url))"
                class="action-button delete"
              >
                Eliminar
              </button>
            </div>
          </li>
        </ul>
        <p v-else>No tiene números telefónicos registrados.</p>
      </div>

      <router-link :to="{ name: 'EstudiantesList' }" class="back-button">
        Volver al Listado
      </router-link>
    </div>
    <p v-else>Estudiante no encontrado.</p>
  </div>
</template>

<script>
import api from "@/api/axios";

export default {
  name: "EstudianteDetail",
  props: ["estudianteUrl"],
  data() {
    return {
      estudiante: null,
      numerosTelefonicos: [],
      loading: true,
      error: null,
    };
  },
  async created() {
    const decodedUrl = decodeURIComponent(this.estudianteUrl);
    await this.fetchEstudianteDetail(decodedUrl);
    // Llamamos al método que sí funciona para traer los teléfonos
    await this.fetchNumerosTelefonicos(decodedUrl);
  },
  methods: {
    async fetchEstudianteDetail(url) {
      this.loading = true;
      this.error = null;
      try {
        const response = await api.get(url);
        this.estudiante = response.data;
      } catch (err) {
        this.error = "No se pudo cargar el detalle del estudiante.";
        console.error(err);
      } finally {
        this.loading = false;
      }
    },
    // USAMOS LA LÓGICA ANTIGUA Y CORRECTA
    async fetchNumerosTelefonicos(estudianteApiUrl) {
      try {
        const response = await api.get("numerosts/"); // <-- Usando el endpoint correcto
        // Filtramos en el frontend como lo hacías antes
        this.numerosTelefonicos = response.data.results.filter(
          (numero) => numero.estudiante === estudianteApiUrl
        );
      } catch (err) {
        this.error = "Error al cargar los números telefónicos.";
        console.error(err);
      }
    },
    getIdFromUrl(url) {
      const matches = url.match(/\/(\d+)\/$/);
      return matches ? matches[1] : null;
    },
    async eliminarTelefono(id) {
      if (
        window.confirm("¿Estás seguro de que quieres eliminar este teléfono?")
      ) {
        try {
          // CORRECCIÓN: Usamos el endpoint correcto también para borrar
          await api.delete(`numerosts/${id}/`);
          alert("Teléfono eliminado con éxito.");
          // Recargamos los teléfonos para reflejar el cambio
          const decodedUrl = decodeURIComponent(this.estudianteUrl);
          await this.fetchNumerosTelefonicos(decodedUrl);
        } catch (err) {
          alert("No se pudo eliminar el teléfono.");
          console.error(err);
        }
      }
    },
  },
};
</script>

<style scoped>
/* Los estilos se mantienen igual */
.estudiante-detail-container {
  max-width: 700px;
  margin: 40px auto;
  padding: 25px;
  border-radius: 8px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  background: #fff;
}
h2,
h3 {
  text-align: center;
  color: #333;
}
h4 {
  color: #555;
}
.telefonos-section {
  margin-top: 30px;
  padding-top: 20px;
  border-top: 1px solid #eee;
}
.telefonos-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 15px;
}
ul {
  list-style: none;
  padding: 0;
}
.telefono-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px;
  border-radius: 5px;
  transition: background-color 0.2s;
}
.telefono-item:nth-child(odd) {
  background-color: #f9f9f9;
}
.actions {
  display: flex;
  gap: 10px;
}
.action-button {
  text-decoration: none;
  color: white;
  padding: 5px 12px;
  border-radius: 5px;
  border: none;
  cursor: pointer;
  font-size: 0.9rem;
}
.action-button.add {
  background-color: #28a745;
}
.action-button.edit {
  background-color: #ffc107;
}
.action-button.delete {
  background-color: #dc3545;
}
.back-button {
  display: block;
  width: fit-content;
  margin: 30px auto 0;
  padding: 10px 25px;
  background-color: #007bff;
  color: white;
  border-radius: 5px;
  text-decoration: none;
}
.error-message {
  color: red;
  text-align: center;
}
</style>
