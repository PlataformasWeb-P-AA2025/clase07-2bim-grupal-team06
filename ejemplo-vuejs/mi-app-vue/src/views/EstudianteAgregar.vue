<template>
  <div class="form-container">
    <h2>Agregar Nuevo Estudiante</h2>
    <form @submit.prevent="agregarEstudiante">
      <div class="form-group">
        <label for="nombre">Nombre:</label>
        <input
          type="text"
          id="nombre"
          v-model="estudiante.nombre"
          required
          placeholder="Ej: Juan Elías"
        />
      </div>
      <div class="form-group">
        <label for="apellido">Apellido:</label>
        <input
          type="text"
          id="apellido"
          v-model="estudiante.apellido"
          required
          placeholder="Ej: Pérez Gómez"
        />
      </div>
      <div class="form-group">
        <label for="cedula">Cédula:</label>
        <input
          type="text"
          id="cedula"
          v-model="estudiante.cedula"
          required
          maxlength="10"
          placeholder="10 dígitos numéricos"
        />
      </div>
      <div class="form-group">
        <label for="correo">Correo Electrónico:</label>
        <input
          type="email"
          id="correo"
          v-model="estudiante.correo"
          required
          placeholder="Ej: usuario@utpl.edu.ec"
        />
      </div>

      <div v-if="error" class="error-message">{{ error }}</div>

      <button type="submit" class="submit-button">Guardar Estudiante</button>
    </form>
  </div>
</template>

<script>
import api from "@/api/axios";

export default {
  name: "EstudianteAgregar",
  data() {
    return {
      estudiante: {
        nombre: "",
        apellido: "",
        cedula: "",
        correo: "",
      },
      error: null,
    };
  },
  methods: {
    async agregarEstudiante() {
      this.error = null; // Limpiar errores previos
      try {
        // La API de Django REST espera un POST a la URL base de la colección
        await api.post("estudiantes/", this.estudiante);

        alert("¡Estudiante agregado con éxito!");

        // Redirigir al listado después de agregar
        this.$router.push("/estudiantes");
      } catch (err) {
        console.error("Error al agregar el estudiante:", err.response || err);

        // Manejo de errores de validación del backend
        if (err.response && err.response.data) {
          const errores = err.response.data;
          let mensajesError =
            "No se pudo guardar. Por favor, corrige los siguientes errores:\n";
          for (const campo in errores) {
            mensajesError += `- ${campo}: ${errores[campo].join(", ")}\n`;
          }
          this.error = mensajesError;
        } else {
          this.error =
            "Ocurrió un error inesperado. Revisa la consola para más detalles.";
        }
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
  box-sizing: border-box; /* Importante para que el padding no afecte el ancho total */
}
.submit-button {
  display: block;
  width: 100%;
  padding: 10px;
  background-color: #28a745;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-size: 1rem;
}
.submit-button:hover {
  background-color: #218838;
}
.error-message {
  color: red;
  margin-bottom: 15px;
  white-space: pre-line; /* Muestra los saltos de línea en el mensaje de error */
}
</style>
