<!-- App.vue -->
<template>
  <div id="app">
      <nav class="navbar navbar-light bg-light border-bottom mb-4">
    <div class="container">
      <a class="navbar-brand mb-0 h1" href="#">MiApp</a>
      <div class="nav justify-content-center">
        <router-link class="nav-link" to="/">Home</router-link>
        <router-link class="nav-link" to="/combined-view">Añadir Tarea</router-link>
        <router-link class="nav-link" to="/about">Lista Tareas</router-link>
        <router-link class="nav-link" to="/addtask">Vista Combinada</router-link>
      </div>
    </div>
  </nav>

    <!-- Paso la lista de tareas como props a través de router-view -->
    <router-view :tasks="tasks" @task-added="addTask" />
  </div>
</template>

<script>
import axios from 'axios';

export default {
  name: 'App',
  data() {
    return {
      tasks: [] // Lista centralizada de tareas
    };
  },
  methods: {
    async fetchTasks() {
      try {
        const response = await axios.get('https://dummyjson.com/todos?limit=10');
        this.tasks = response.data.todos;
      } catch (error) {
        console.error("Error al obtener las tareas:", error);
      }
    },
    addTask(newTask) {
      this.tasks.unshift(newTask);
    }
  },
  created() {
    this.fetchTasks(); // Cargar tareas al iniciar la aplicación
  }
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

nav {
  padding: 30px;
}

nav a {
  font-weight: bold;
  color: #2c3e50;
}

nav a.router-link-exact-active {
  color: #42b983;
}
</style>
