<!-- AddTask.vue -->
<template>
    <div class="container my-5 add-task-container">
      <h1 class="text-center mb-4">Añadir Tarea</h1>
      <div class="input-group mb-3">
        <input 
          v-model="newTask" 
          @keyup.enter="addTask" 
          placeholder="Añadir nueva tarea" 
          class="form-control"
        />
        <button @click="addTask" class="btn btn-primary">Añadir</button>
      </div>
      <!-- Lista de tareas -->
      <div v-if="!loading && tasks.length > 0" class="list-group">
        <div v-for="task in tasks" :key="task.id" class="list-group-item d-flex justify-content-between align-items-start">
          <span :class="{ 'text-decoration-line-through': task.completed, 'text-muted': task.completed }" class="flex-grow-1">
            {{ task.todo }}
          </span>
          <div class="btn-group align-self-center">
            <button @click="toggleTaskCompletion(task)" class="btn btn-sm btn-outline-success me-2">
              {{ task.completed ? 'Desmarcar' : 'Completar' }}
            </button>
            <button @click="deleteTask(task)" class="btn btn-sm btn-outline-danger">Eliminar</button>
          </div>
        </div>
      </div>
      <div v-if="loading" class="text-center">
        <div class="spinner-border text-primary" role="status">
          <span class="visually-hidden">Cargando...</span>
        </div>
      </div>
      <div v-if="!loading && tasks.length === 0" class="alert alert-info text-center">
        No hay tareas disponibles.
      </div>
    </div>
  </template>
  
  <script>
  import axios from 'axios';
  
  export default {
    name: "AddTask",
    data() {
      return {
        newTask: "",    // Campo de entrada para la nueva tarea
        tasks: [],      // Lista de tareas
        loading: true,  // Indicador de carga
      };
    },
    methods: {
      async fetchTasks() {
        try {
          const response = await axios.get('https://dummyjson.com/todos?limit=10');
          this.tasks = response.data.todos;
        } catch (error) {
          console.error("Error al cargar las tareas:", error);
        } finally {
          this.loading = false;
        }
      },
      async addTask() {
        if (this.newTask.trim() === "") return;
  
        try {
          const response = await axios.post('https://dummyjson.com/todos/add', {
            todo: this.newTask,
            completed: false,
            userId: 1,
          });
          this.tasks.unshift(response.data);
          this.$emit('task-added', response.data); // Emitir el evento
          this.newTask = "";
        } catch (error) {
          console.error("Error al añadir la tarea:", error);
        }
      },
      toggleTaskCompletion(task) {
        task.completed = !task.completed;
      },
      deleteTask(task) {
        //this.tasks = this.tasks.filter(t => t.id !== task.id);
        this.tasks = this.tasks.filter((t) => t.id !== task.id); // Eliminar la tarea de la lista local
        },
      
    },
    created() {
      this.fetchTasks();
    }
  };
  </script>
  
  <style scoped>
  .add-task-container {
    max-width: 600px;
  }
  
  .list-group-item {
    display: flex;
    flex-wrap: nowrap;
  }
  
  .text-decoration-line-through {
    text-decoration: line-through;
  }
  </style>
  