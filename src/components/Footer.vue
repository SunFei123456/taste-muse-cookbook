<template>
  <v-footer class="pt-6 pb-6 text-center d-flex flex-column border-t-sm" style="background-color: #FFFCF5;">
    <v-divider class="w-100 mb-6" color="grey-lighten-2"></v-divider>

    <!-- Copyright -->
    <div class="text-caption text-grey">
      <div class="d-flex align-center justify-center mb-2 logo-font text-brown-darken-3 font-weight-bold" style="font-size: 1.1em !important">
        <v-icon icon="mdi-silverware-fork-knife" size="x-small" class="mr-2"></v-icon>
        美食工坊
      </div>
      <p class="mb-2">&copy; {{ new Date().getFullYear() }} Food Recipe Platform. All rights reserved.</p>
      <p>Designed with ❤️ for Foodies</p>
    </div>
  </v-footer>
</template>

<script setup>
</script>

<style scoped>
.gap-6 {
  gap: 24px;
}
.gap-4 {
  gap: 16px;
}
.hover-primary:hover {
  color: #FF6F00 !important; /* Primary Color */
}
.transition-colors {
  transition: color 0.2s ease;
}
.hover-scale {
  transition: transform 0.2s ease, color 0.2s ease;
}
.hover-scale:hover {
  transform: scale(1.1);
  color: #FF6F00 !important;
}
.logo-font {
  font-family: 'Noto Serif SC', serif;
}
</style>
