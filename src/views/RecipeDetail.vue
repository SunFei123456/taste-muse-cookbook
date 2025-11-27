<template>
  <div v-if="recipe" class="recipe-detail pb-16">
    <!-- 沉浸式头图 -->
    <div class="position-relative">
      <v-btn 
        icon="mdi-arrow-left" 
        variant="elevated" 
        color="white" 
        class="back-btn"
        @click="router.back()"
      ></v-btn>
      
      <v-img
        :src="recipe.image"
        height="450"
        cover
        class="align-end"
        gradient="to bottom, rgba(0,0,0,0) 0%, rgba(0,0,0,0.6) 100%"
      >
        <v-container>
          <div class="text-white pb-8">
            <v-chip color="primary" class="mb-4 font-weight-bold">{{ recipe.category }}</v-chip>
            <h1 class="text-h2 font-weight-bold mb-2 text-shadow">{{ recipe.title }}</h1>
            <div class="d-flex align-center">
              <v-rating 
                :model-value="recipe.rating" 
                color="amber" 
                density="compact" 
                half-increments 
                readonly
              ></v-rating>
              <span class="ms-2 text-subtitle-1 font-weight-medium">{{ recipe.rating }} 分</span>
            </div>
          </div>
        </v-container>
      </v-img>
    </div>

    <v-container class="mt-n8 position-relative z-index-2">
      <v-sheet rounded="xl" elevation="6" class="pa-6 pa-md-10">
        <!-- 菜谱简介 -->
        <p class="text-h6 text-grey-darken-2 font-italic mb-8 text-center" style="line-height: 1.8">
          "{{ recipe.description }}"
        </p>

        <v-divider class="mb-8"></v-divider>

        <v-row>
          <!-- 食材清单 -->
          <v-col cols="12" md="4">
            <v-card variant="outlined" color="primary" class="h-100 border-dashed">
              <v-card-item>
                <v-card-title class="font-weight-bold text-h5 mb-4 text-brown-darken-4">
                  <v-icon icon="mdi-basket-outline" class="mr-2"></v-icon>
                  所需食材
                </v-card-title>
                <v-list density="comfortable">
                  <v-list-item v-for="(item, index) in recipe.ingredients" :key="index">
                    <template v-slot:prepend>
                      <v-icon icon="mdi-circle-slice-8" color="secondary" size="small"></v-icon>
                    </template>
                    <v-list-item-title class="text-body-1 font-weight-medium text-brown-darken-3">
                      {{ item }}
                    </v-list-item-title>
                  </v-list-item>
                </v-list>
              </v-card-item>
            </v-card>
          </v-col>

          <!-- 烹饪步骤 -->
          <v-col cols="12" md="8">
            <div class="pl-md-6">
              <h2 class="text-h4 font-weight-bold text-brown-darken-4 mb-6">
                <v-icon icon="mdi-pot-steam-outline" class="mr-2"></v-icon>
                烹饪步骤
              </h2>
              
              <div class="d-flex flex-column gap-4">
                <v-card 
                  v-for="(step, index) in recipe.steps" 
                  :key="index"
                  elevation="0"
                  class="mb-4 bg-grey-lighten-5 step-card"
                >
                  <div class="d-flex">
                    <div class="pa-4">
                      <v-avatar color="primary" size="40" class="font-weight-bold text-white elevation-2">
                        {{ index + 1 }}
                      </v-avatar>
                    </div>
                    <div class="py-4 pr-4 align-self-center">
                      <p class="text-body-1 text-grey-darken-3" style="line-height: 1.6">
                        {{ step }}
                      </p>
                    </div>
                  </div>
                </v-card>
              </div>
            </div>
          </v-col>
        </v-row>
      </v-sheet>
    </v-container>
  </div>
  
  <div v-else class="d-flex justify-center align-center fill-height py-16">
    <v-progress-circular indeterminate color="primary" size="64"></v-progress-circular>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useRecipeStore } from '../stores/recipes'

const route = useRoute()
const router = useRouter()
const recipeStore = useRecipeStore()
const recipe = ref(null)

onMounted(() => {
  const id = route.params.id
  recipe.value = recipeStore.getRecipeById(id)
  window.scrollTo({ top: 0, behavior: 'smooth' })
})
</script>

<style scoped>
.back-btn {
  position: absolute;
  top: 20px;
  left: 20px;
  z-index: 10;
}
.text-shadow {
  text-shadow: 0 2px 4px rgba(0,0,0,0.5);
}
.z-index-2 {
  z-index: 2;
}
.border-dashed {
  border-style: dashed !important;
}
.step-card {
  border-left: 4px solid transparent;
  transition: all 0.3s ease;
}
.step-card:hover {
  border-left-color: #FF6F00; /* Primary color */
  background-color: #FFF3E0; /* Orange lighten 5 */
}
</style>
