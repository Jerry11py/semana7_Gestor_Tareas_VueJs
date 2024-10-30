<template>
    <div class="container my-5">
        <h2 class="text-center mb-4">Lista de Tareas</h2>

        <!-- Mostrar un spinner mientras se cargan las tareas -->
        <div v-if="loading" class="text-center">
            <div class="spinner-border text-primary" role="status">
                <span class="visually-hidden">Cargando...</span>
            </div>
        </div>

        <!-- Lista de tareas -->
        <div v-if="!loading && tasks.length > 0" class="list-group">
            <div v-for="task in tasks" :key="task.id" class="list-group-item d-flex justify-content-between align-items-center">
                <span :class="{ 'text-decoration-line-through': task.completed }">{{ task.todo }}</span>
                <button @click="$emit('toggle-completion', task.id)" 
                        :class="['btn', task.completed ? 'btn-success' : 'btn-outline-success']">
                    {{ task.completed ? 'Completado' : 'Pendiente' }}
                </button>
            </div>
        </div>

        <!-- Mensaje cuando no hay tareas -->
        <div v-if="!loading && tasks.length === 0" class="alert alert-info text-center">
            No hay tareas disponibles.
        </div>
    </div>
</template>

<script>
export default {
    name: "TaskList",
    props: {
        tasks: Array, // Lista de tareas recibida desde el componente padre
    },
    data() {
        return {
            loading: false, // Indicador de carga, se puede manejar en el padre si es necesario
        };
    },
};
</script>

<style scoped>
.text-decoration-line-through {
    text-decoration: line-through;
}
</style>
