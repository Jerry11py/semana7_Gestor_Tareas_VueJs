<!-- TaskManager.vue -->
<template>
    <div class="container my-5">
      <h1 class="text-center mb-4">Gestor de Tareas</h1>
      
      <AddTask @task-added="addTask" />
      
      <!-- AboutView con la lista de tareas y escuchando el evento update-tasks -->
      <AboutView :tasks="tasks" @update-tasks="updateTasks" />
    </div>
  </template>
  
  <script>
  import AddTask from './AddTask.vue';
  import AboutView from './AboutView.vue';
  
  export default {
    name: "TaskManager",
    components: {
      AddTask,
      AboutView
    },
    data() {
      return {
        tasks: [] // Lista de tareas compartida
      };
    },
    methods: {
      addTask(newTask) {
        this.tasks.unshift(newTask);
      },
      updateTasks(updatedTasks) {
        // Actualiza la lista de tareas con la versión filtrada
        this.tasks = updatedTasks;
      }
    }
  };
  </script>
  