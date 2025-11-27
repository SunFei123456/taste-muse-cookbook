<template>
  <v-card
    class="mx-auto h-100 d-flex transition-swing"
    :class="horizontal ? 'flex-row align-center' : 'flex-column'"
    hover
    link
    :to="'/recipe/' + recipe.id"
    rounded="xl"
    elevation="1"
  >
    <div class="img-container" :class="horizontal ? 'horizontal-img' : ''">
      <v-img
        :src="recipe.image"
        :height="horizontal ? '100%' : '220px'"
        :width="horizontal ? '100%' : 'auto'"
        cover
        class="zoom-effect fill-height"
      >
        <template v-slot:placeholder>
          <div class="d-flex align-center justify-center fill-height">
            <v-progress-circular indeterminate color="primary"></v-progress-circular>
          </div>
        </template>
      </v-img>
      <v-chip
        color="secondary"
        class="category-chip font-weight-bold"
        size="small"
        variant="flat"
      >
        {{ recipe.category }}
      </v-chip>
    </div>

    <div class="d-flex flex-column flex-grow-1" :class="horizontal ? 'py-2 px-2' : ''">
      <v-card-item class="pt-4 pb-2">
        <v-card-title class="text-h6 font-weight-bold text-brown-darken-3">
          {{ recipe.title }}
        </v-card-title>
        
        <div class="d-flex align-center mt-1">
          <v-rating
            :model-value="recipe.rating"
            color="amber-darken-2"
            active-color="amber-darken-2"
            density="compact"
            half-increments
            readonly
            size="x-small"
          ></v-rating>
          <span class="text-grey-darken-1 ms-2 text-caption font-weight-medium">
            {{ recipe.rating }}
          </span>
        </div>
      </v-card-item>

      <v-card-text class="text-body-2 text-grey-darken-2 text-truncate-2 flex-grow-1">
        {{ recipe.description }}
      </v-card-text>

      <v-card-actions class="px-4 pb-4">
        <v-chip-group>
          <v-chip size="x-small" variant="outlined" color="primary" v-for="(ing, i) in recipe.ingredients.slice(0, 2)" :key="i">
            {{ ing.split(' ')[0] }}
          </v-chip>
          <v-chip size="x-small" variant="text" v-if="recipe.ingredients.length > 2">...</v-chip>
        </v-chip-group>
        <v-spacer></v-spacer>
        <v-btn
          icon="mdi-arrow-right"
          variant="tonal"
          color="primary"
          size="small"
        ></v-btn>
      </v-card-actions>
    </div>
  </v-card>
</template>

<script setup>
defineProps({
  recipe: {
    type: Object,
    required: true
  },
  horizontal: {
    type: Boolean,
    default: false
  }
})
</script>

<style scoped>
.transition-swing {
  transition: all 0.3s cubic-bezier(0.25, 0.8, 0.5, 1);
}
.v-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 12px 20px -10px rgba(255, 111, 0, 0.3) !important;
}
.img-container {
  position: relative;
  overflow: hidden;
  border-top-left-radius: 24px;
  border-top-right-radius: 24px;
}
.img-container.horizontal-img {
  width: 40%;
  min-width: 40%;
  height: 100%;
  border-top-right-radius: 0;
  border-bottom-left-radius: 24px;
}
.zoom-effect {
  transition: transform 0.5s ease;
}
.v-card:hover .zoom-effect {
  transform: scale(1.05);
}
.category-chip {
  position: absolute;
  top: 12px;
  right: 12px;
  z-index: 1;
}
.text-truncate-2 {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
</style>
