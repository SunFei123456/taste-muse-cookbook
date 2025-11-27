<template>
  <v-app class="app-font">
    <component :is="layout">
      <router-view />
    </component>
  </v-app>
</template>

<script setup>
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import DefaultLayout from './layouts/DefaultLayout.vue'
import AuthLayout from './layouts/AuthLayout.vue'

const route = useRoute()
const layout = computed(() => {
  return route.meta.layout === 'auth' ? AuthLayout : DefaultLayout
})
</script>

<style>
@import url('https://fonts.googleapis.com/css2?family=Noto+Serif+SC:wght@400;700&family=Nunito:wght@400;600;700&display=swap');

.app-font {
  font-family: 'Nunito', 'PingFang SC', 'Microsoft YaHei', sans-serif !important;
}

.v-application .text-h1,
.v-application .text-h2,
.v-application .text-h3,
.v-application .text-h4,
.v-application .text-h5,
.v-application .text-h6 {
  font-family: 'Noto Serif SC', serif !important;
}

/* Custom Scrollbar */
::-webkit-scrollbar {
  width: 8px;
}
::-webkit-scrollbar-track {
  background: #FFF8E1;
}
::-webkit-scrollbar-thumb {
  background: #FFB74D;
  border-radius: 4px;
}
::-webkit-scrollbar-thumb:hover {
  background: #FF9800;
}
</style>
