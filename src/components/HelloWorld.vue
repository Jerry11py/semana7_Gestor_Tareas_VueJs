<template>
  <div class="hello">
    <h1 class="green-text">{{ msg }}</h1>
    <p class="black-text">Esta aplicación permite gestionar tareas de manera eficiente. Esta permite añadir nuevas tareas manualmente o sacarlas desde un API.</p>
    <img alt="Vue logo" src="../assets/logo.png">
    <h1 class="green-text">Secciones Aplicación</h1>
    <p class="black-text">Añadir Tarea</p>
    <p class="black-text">Extraer Tareas de la API</p>
    <p class="black-text">Vista Combinada</p>
  </div>
</template>

<script>
export default {
  name: 'HelloWorld',
  props: {
    msg: String
  }
}
</script>

<style scoped>
.green-text {
  font-size: calc(10px + 2vmin);
  color: #41b883; /* Verde */
}

.black-text {
  font-size: calc(10px + 2vmin); /* Ajusta el tamaño del texto si es necesario */
  color: black; /* Negro */
}
</style>
