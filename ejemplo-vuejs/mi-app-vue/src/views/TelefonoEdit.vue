<template>
  <div class="form-container">
    <h2>Editar Teléfono</h2>
    <div v-if="loading">Cargando datos...</div>
    <form v-else @submit.prevent="actualizarTelefono">
      <div class="form-group">
        <label for="telefono">Número de Teléfono:</label>
        <input type="text" id="telefono" v-model="telefono.telefono" required />
      </div>
      <div class="form-group">
        <label for="tipo">Tipo:</label>
        <input type="text" id="tipo" v-model="telefono.tipo" required />
      </div>
      <div class="form-group">
        <label>Propietario:</label>
        <input type="text" :value="estudianteNombre" disabled />
      </div>

      <div v-if="error" class="error-message">{{ error }}</div>

      <div class="button-group">
        <button type="submit" class="submit-button">Actualizar Cambios</button>
        <button type="button" @click="cancelar" class="cancel-button">
          Cancelar
        </button>
      </div>
    </form>
  </div>
</template>

<script>
import api from "@/api/axios";

export default {
  name: "TelefonoEdit",
  props: ["id"],
  data() {
    return {
      telefono: {},
      estudianteNombre: "Cargando...",
      loading: true,
      error: null,
      backUrl: this.$route.query.backUrl, // Obtenemos la URL de retorno
    };
  },
  async created() {
    await this.fetchTelefono();
  },
  methods: {
    async fetchTelefono() {
      try {
        // Usando el endpoint correcto: numerosts/
        const response = await api.get(`numerosts/${this.id}/`);
        this.telefono = response.data;
        await this.fetchEstudiante(this.telefono.estudiante);
      } catch (err) {
        this.error = "No se pudieron cargar los datos del teléfono.";
        console.error(err);
      } finally {
        this.loading = false;
      }
    },
    async fetchEstudiante(estudianteUrl) {
      try {
        const response = await api.get(estudianteUrl);
        this.estudianteNombre = `${response.data.nombre} ${response.data.apellido}`;
        // Si no nos pasaron una URL de retorno, usamos esta por defecto
        if (!this.backUrl) {
          this.backUrl = estudianteUrl;
        }
      } catch (err) {
        this.estudianteNombre = "Propietario no encontrado";
      }
    },
    async actualizarTelefono() {
      this.error = null;
      try {
        // Usando el endpoint correcto: numerosts/
        await api.put(`numerosts/${this.id}/`, this.telefono);
        alert("¡Teléfono actualizado con éxito!");
        this.cancelar(); // Usamos el mismo método para volver
      } catch (err) {
        this.error = "No se pudo actualizar el teléfono.";
        console.error(err);
      }
    },
    cancelar() {
      if (this.backUrl) {
        this.$router.push({
          name: "EstudianteDetail",
          params: { estudianteUrl: this.backUrl },
        });
      } else {
        this.$router.push({ name: "EstudiantesList" });
      }
    },
  },
};
</script>

<style scoped>
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
.form-group input:disabled {
  background-color: #e9ecef;
  cursor: not-allowed;
}
.button-group {
  display: flex;
  gap: 10px;
  margin-top: 20px;
}
.submit-button,
.cancel-button {
  flex: 1;
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
  background-color: #007bff;
}
.cancel-button {
  background-color: #6c757d;
}
.error-message {
  color: red;
  margin-bottom: 15px;
}
</style>
