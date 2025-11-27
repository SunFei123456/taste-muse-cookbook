<template>
  <NavBar />
  <v-main style="background-color: #FFFCF5">
    <router-view />
  </v-main>
  <Footer />
</template>

<script setup>
import NavBar from '../components/NavBar.vue'
import Footer from '../components/Footer.vue'
</script>
