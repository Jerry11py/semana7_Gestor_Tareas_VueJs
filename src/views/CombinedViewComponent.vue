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
    
    <!-- Mostrar solo la tarea añadida -->
    <div v-if="addedTask" class="list-group mt-3">
      <div class="list-group-item d-flex justify-content-between align-items-start">
        <span :class="{ 'text-decoration-line-through': addedTask.completed, 'text-muted': addedTask.completed }" class="flex-grow-1">
          {{ addedTask.todo }}
        </span>
        <button @click="toggleTaskCompletion(addedTask)" class="btn btn-sm btn-outline-success me-2">
          {{ addedTask.completed ? 'Desmarcar' : 'Completar' }}
        </button>
        <button @click="deleteTask" class="btn btn-sm btn-outline-danger">Eliminar</button>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  name: "AddTask",
  data() {
    return {
      newTask: "",     // Campo de entrada para la nueva tarea
      addedTask: null, // Tarea recientemente añadida
    };
  },
  methods: {
    async addTask() {
      if (this.newTask.trim() === "") return;

      try {
        const response = await axios.post('https://dummyjson.com/todos/add', {
          todo: this.newTask,
          completed: false,
          userId: 1,
        });
        this.addedTask = response.data; // Guardar la tarea añadida para mostrarla
        this.$emit('task-added', response.data); // Emitir el evento
        this.newTask = ""; // Limpiar el campo de entrada
      } catch (error) {
        console.error("Error al añadir la tarea:", error);
      }
    },
    toggleTaskCompletion(task) {
      task.completed = !task.completed;
    },
    deleteTask() {
      this.addedTask = null; // Eliminar la tarea recientemente añadida
    },
  },
};
</script>

<style scoped>
.add-task-container {
  max-width: 600px;
}

.text-decoration-line-through {
  text-decoration: line-through;
}
</style>
