<template>
  <div class="form-container">
    <h2>Agregar Teléfono a {{ estudianteNombre }}</h2>
    <form @submit.prevent="agregarTelefono">
      <div class="form-group">
        <label for="telefono">Número de Teléfono:</label>
        <input
          type="text"
          id="telefono"
          v-model="telefono.telefono"
          required
          placeholder="Ej: 0987654321"
        />
      </div>
      <div class="form-group">
        <label for="tipo">Tipo:</label>
        <input
          type="text"
          id="tipo"
          v-model="telefono.tipo"
          required
          placeholder="Ej: Móvil, Casa, Trabajo"
        />
      </div>

      <div v-if="error" class="error-message">{{ error }}</div>

      <div class="button-group">
        <button type="submit" class="submit-button">Guardar Teléfono</button>
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
  name: "TelefonoAgregar",
  data() {
    return {
      telefono: {
        telefono: "",
        tipo: "",
        estudiante: this.$route.query.estudianteUrl, // Obtenemos la URL del estudiante desde la ruta
      },
      estudianteNombre: "...",
      error: null,
    };
  },
  async created() {
    if (!this.telefono.estudiante) {
      this.error =
        "No se ha especificado un estudiante. Vuelva al detalle e inténtelo de nuevo.";
      return;
    }
    this.fetchEstudianteNombre();
  },
  methods: {
    async fetchEstudianteNombre() {
      try {
        const response = await api.get(this.telefono.estudiante);
        this.estudianteNombre = `${response.data.nombre} ${response.data.apellido}`;
      } catch (err) {
        this.estudianteNombre = "un estudiante";
      }
    },
    async agregarTelefono() {
      this.error = null;
      try {
        // Usando el endpoint correcto: numerosts/
        await api.post("numerosts/", this.telefono);
        alert("¡Teléfono agregado con éxito!");
        this.$router.push({
          name: "EstudianteDetail",
          params: { estudianteUrl: this.telefono.estudiante },
        });
      } catch (err) {
        if (err.response && err.response.data) {
          this.error = JSON.stringify(err.response.data);
        } else {
          this.error = "No se pudo guardar el teléfono. Revise los datos.";
        }
        console.error(err.response?.data || err);
      }
    },
    cancelar() {
      this.$router.push({
        name: "EstudianteDetail",
        params: { estudianteUrl: this.telefono.estudiante },
      });
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
  background-color: #28a745;
}
.cancel-button {
  background-color: #6c757d;
}
.error-message {
  color: red;
  margin-bottom: 15px;
  background-color: #fdd;
  padding: 10px;
  border-radius: 5px;
  white-space: pre-wrap;
}
</style>
