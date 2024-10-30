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
    
    <!-- Mostrar todas las tareas añadidas por el usuario -->
    <div v-if="tasks.length > 0" class="list-group mt-3">
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
  </div>
</template>

<script>
import axios from 'axios';

export default {
  name: "AddTask",
  data() {
    return {
      newTask: "",   // Campo de entrada para la nueva tarea
      tasks: [],     // Lista de tareas añadidas por el usuario
    };
  },
  methods: {
    async addTask() {
      if (this.newTask.trim() === "") return;

      try {
        // Añadir la tarea al API
        const response = await axios.post('https://dummyjson.com/todos/add', {
          todo: this.newTask,
          completed: false,
          userId: 1,
        });
        // Agregar la tarea al arreglo `tasks` para mostrarla en la lista
        this.tasks.unshift(response.data);
        this.$emit('task-added', response.data); // Emitir el evento
        this.newTask = ""; // Limpiar el campo de entrada
      } catch (error) {
        console.error("Error al añadir la tarea:", error);
      }
    },
    toggleTaskCompletion(task) {
      task.completed = !task.completed;
    },
    deleteTask(task) {
      // Remover la tarea del arreglo `tasks`
      this.tasks = this.tasks.filter(t => t.id !== task.id);
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
