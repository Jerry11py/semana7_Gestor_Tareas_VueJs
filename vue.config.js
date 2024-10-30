const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,
  publicPath: process.env.NODE_ENV === 'production'
  ? '/semana7_Gestor_Tareas_VueJs/' // Reemplaza el nombre exacto de tu repositorio
  : '/'
});
