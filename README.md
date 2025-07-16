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
rompt 1:

Hola, estoy conectando mi frontend de Vue con mi backend de Django y me da un error de CORS. ¿Cuál es la configuración estándar que debería poner en settings.py para solucionarlo? También, ¿cómo debería estructurar un formulario en Vue para crear un estudiante y enviarlo con axios a la API?

Prompt 2:

Para la función de editar, ya sé cómo pasar el ID del estudiante por la ruta de Vue. Mi duda es, ¿cuál es el patrón correcto para usar ese ID, cargar los datos del estudiante con una petición GET y luego enviarlos de vuelta con PUT al guardar los cambios?

Prompt 3:

Quiero implementar la opción de eliminar un estudiante. ¿Podrías darme un ejemplo de un método en Vue que use window.confirm para mostrar un aviso? Y si el usuario acepta, que envíe la petición DELETE y refresque la lista.

Prompt 4:

Estoy pensando en la usabilidad de la app. ¿Crees que sería mejor gestionar los teléfonos de un estudiante en su página de detalle, en vez de en una lista aparte? Si es una buena idea, ¿qué archivos principales (router, componentes) tendría que modificar?

Prompt 5:

Con el nuevo diseño, no logro mostrar los teléfonos en el detalle del estudiante. Sé que la API de estudiantes no los incluye. ¿Cuál sería una buena estrategia? ¿Debería hacer otra llamada a la API de teléfonos y luego filtrarlos con JavaScript en el frontend?

Prompt 6:

Necesito crear el formulario para agregar un teléfono a un estudiante específico. Como ya tengo la URL del estudiante, ¿cómo puedo pasar esa información al componente del formulario y usarla correctamente al hacer la petición POST al endpoint /api/numerosts/?

Prompt 7:

El formulario para editar un teléfono es un poco más complejo. ¿Cómo puedo combinar la lógica de cargar los datos iniciales del teléfono con la de redirigir al usuario de vuelta a la página de detalle correcta después de que guarde los cambios?