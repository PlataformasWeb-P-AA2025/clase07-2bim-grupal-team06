# clase07-2bim

### Proyecto Django

* Instalarla librería django-cors-headers
* Crear un super usuario


### Proyecto VueJs

* Ingresar a la carpeta mi-app-vue
* Ejecutar npm install (esperar algunos minutos)
* Ejecutar npm run serve

### Probar funcionamiento

* Ingresar a un navegador y revisar si el funcionamiento de la aplicación den VueJs

### Tareas - reto

* Implementación de Funcionalidades de Edición y Eliminación en Vue.js
  * Para Estudiantes
  * Para Teléfonos

### Recomendación

 * Tomar un tiempo produnte para analizar el código ya generado en VueJs
 
### Promps
Prompt 1:

Hola, necesito conectar mi frontend de Vue con mi backend de Django. Ayúdame a configurar CORS en Django. Después, quiero implementar el formulario para agregar un estudiante en Vue, creando la ruta y el componente EstudianteAgregar.vue para que envíe los datos a la API.

Prompt 2:

Ya puedo agregar estudiantes, ahora quiero implementar la edición. Mi botón de "Editar" ya pasa el ID a la ruta /estudiantes/edit/:id. Dame el código para EstudianteEdit.vue que cargue los datos del estudiante con ese ID y me permita actualizarlos con una petición PUT.

Prompt 3:

Para terminar el CRUD de estudiantes, necesito que el botón de eliminar funcione. Muéstrame cómo agregar un método en EstudiantesList.vue que pida confirmación, envíe una petición DELETE a la API y actualice la lista después de borrar el registro.

Prompt 4:

Decidí cambiar la forma de manejar los teléfonos. En vez de una lista general, quiero administrarlos directamente en la página de detalle de cada estudiante (EstudianteDetail.vue). Ayúdame a mover los botones de agregar, editar y eliminar a esa vista.

Prompt 5:

Con el nuevo diseño, los números de teléfono no aparecen. Creo que el backend no los envía junto con los datos del estudiante. ¿Cómo modifico EstudianteDetail.vue para que haga una segunda llamada a la API y traiga solo los teléfonos de ese estudiante?

Prompt 6:

Ahora necesito el formulario para agregar un teléfono. Dame el código para TelefonoAgregar.vue que reciba la URL del estudiante desde la página anterior. El formulario solo debe pedir el número y el tipo, y luego enviar el POST al endpoint correcto que parece ser /api/numerosts/.

Prompt 7:

Siguiendo con los teléfonos, necesito el formulario para editar. Dame el código para TelefonoEdit.vue que cargue los datos del teléfono usando su ID. Debe permitirme modificarlo y, al guardar, regresar a la página de detalle del estudiante.