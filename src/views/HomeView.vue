<template>
  <div class="home">
    <!-- 头图区域 -->
    <v-parallax
      :src="heroImage"
      height="550"
      class="align-center"
    >
      <div class="d-flex flex-column fill-height justify-center align-center text-white bg-overlay px-4">
        <div class="text-center slide-up-enter">
          <v-chip color="primary" variant="flat" class="mb-6 font-weight-bold px-4" size="large">
            ✨ 发现 · 烹饪 · 享受
          </v-chip>
          <h1 class="text-h1 font-weight-black mb-2 text-shadow hero-title">
            寻味 · 每一餐
          </h1>
          <p class="text-h5 font-weight-light mb-8 text-shadow text-grey-lighten-4 hero-subtitle">
            在喧嚣的世界中，找回厨房的温度
          </p>
        </div>
        
        <v-card 
          width="100%" 
          max-width="680" 
          elevation="1" 
          rounded="xl" 
          class="mt-4 slide-up-delayed search-card"
        >
          <v-text-field
            v-model="searchQuery"
            placeholder="寻找你的灵感... (例如: 红烧肉)"
            prepend-inner-icon="mdi-magnify"
            variant="solo"
            hide-details
            single-line
            class="py-3 px-4 search-input"
            bg-color="white"
          >
            <template v-slot:append-inner>
              <v-fade-transition>
                <v-icon 
                  v-if="searchQuery" 
                  icon="mdi-close-circle" 
                  color="grey" 
                  @click="searchQuery = ''" 
                  class="cursor-pointer"
                ></v-icon>
              </v-fade-transition>
            </template>
          </v-text-field>
        </v-card>
      </div>
    </v-parallax>

    <!-- 内容主体区域 -->
    <v-container class="mt-n16 position-relative z-index-2 mb-12">
      <v-sheet rounded="xl" elevation="1" class="pa-6 pa-md-10 bg-surface">
        
        <!-- 分类标签模块 -->
        <div class="mb-12">
           <div class="d-flex align-center justify-space-between mb-6">
            <h2 class="text-h5 font-weight-bold text-brown-darken-4">
              <v-icon icon="mdi-tag-heart-outline" color="secondary" class="mr-2"></v-icon>
              热门分类
            </h2>
          </div>
          
          <v-slide-group show-arrows>
            <v-slide-group-item v-for="cat in categories" :key="cat.name" v-slot="{ isSelected, toggle }">
              <v-card
                class="ma-2 category-card d-flex flex-column align-center justify-center pt-4 pb-2"
                width="100"
                height="110"
                :color="cat.color"
                variant="tonal"
                rounded="sm"
                link
                @click="searchQuery = cat.name"
              >
                <div class="icon-box mb-2 elevation-2 bg-white rounded-circle pa-2">
                   <v-icon :icon="cat.icon" :color="cat.textColor" size="28"></v-icon>
                </div>
                <div class="text-caption font-weight-bold" :class="`text-${cat.textColor}`">
                  {{ cat.name }}
                </div>
              </v-card>
            </v-slide-group-item>
          </v-slide-group>
        </div>

        <!-- 主厨推荐卡片 -->
        <div v-if="!searchQuery && featuredRecipe" class="mb-12">
          <v-card color="brown-darken-4" theme="dark" rounded="xl" elevation="4" class="overflow-hidden">
            <v-row no-gutters>
              <v-col cols="12" md="7" class="position-relative">
                 <v-img 
                  :src="featuredRecipe.image" 
                  height="100%" 
                  min-height="350"
                  cover 
                  class="zoom-on-hover"
                >
                   <div class="fill-height d-flex align-end bg-gradient-up pa-6">
                     <v-chip color="amber" class="font-weight-bold text-black">今日主厨推荐</v-chip>
                   </div>
                </v-img>
              </v-col>
              <v-col cols="12" md="5" class="pa-8 d-flex flex-column justify-center">
                <h3 class="text-h4 font-weight-black mb-2 text-amber">{{ featuredRecipe.title }}</h3>
                <p class="text-body-1 text-grey-lighten-1 mb-6">
                  {{ featuredRecipe.description }}
                </p>
                <div class="d-flex gap-4 mb-6">
                  <div class="d-flex align-center">
                    <v-icon icon="mdi-clock-outline" color="grey" size="small" class="mr-1"></v-icon>
                    <span class="text-caption">45 分钟</span>
                  </div>
                  <div class="d-flex align-center">
                    <v-icon icon="mdi-fire" color="grey" size="small" class="mr-1"></v-icon>
                    <span class="text-caption">中等难度</span>
                  </div>
                </div>
                <v-btn color="primary" size="large" rounded="pill" variant="flat" :to="`/recipe/${featuredRecipe.id}`">
                  查看食谱
                  <v-icon icon="mdi-arrow-right" class="ml-2"></v-icon>
                </v-btn>
              </v-col>
            </v-row>
          </v-card>
        </div>

        <!-- 菜谱列表标题栏 -->
        <div class="d-flex align-center mb-8">
          <v-icon icon="mdi-silverware-variant" color="primary" size="large" class="mr-2"></v-icon>
          <h2 class="text-h4 font-weight-bold text-brown-darken-4">
            {{ searchQuery ? `搜索结果: "${searchQuery}"` : '精选食谱' }}
          </h2>
          <v-spacer></v-spacer>
          <v-btn-toggle v-model="viewMode" density="compact" color="primary" variant="outlined" rounded="xl">
            <v-btn icon="mdi-grid" value="grid"></v-btn>
            <v-btn icon="mdi-format-list-bulleted" value="list"></v-btn>
          </v-btn-toggle>
        </div>
        
        <!-- 菜谱网格/列表展示 -->
        <v-fade-transition group tag="div" class="v-row">
          <v-col
            v-for="recipe in filteredRecipes"
            :key="recipe.id"
            cols="12"
            :sm="viewMode === 'grid' ? 6 : 12"
            :md="viewMode === 'grid' ? 4 : 12"
            :lg="viewMode === 'grid' ? 3 : 12"
          >
            <RecipeCard :recipe="recipe" :horizontal="viewMode === 'list'" />
          </v-col>
        </v-fade-transition>

        <div v-if="filteredRecipes.length === 0" class="text-center py-16">
          <v-avatar color="orange-lighten-5" size="120" class="mb-4">
            <v-icon icon="mdi-food-variant-off" size="64" color="orange-lighten-3"></v-icon>
          </v-avatar>
          <h3 class="text-h6 text-brown-darken-1 font-weight-bold">哎呀，找不到这个菜谱</h3>
          <p class="text-body-2 text-brown-lighten-1 mt-2">尝试搜索 "鸡肉"、"家常菜" 或 "海鲜"</p>
          <v-btn color="primary" variant="text" class="mt-4" @click="searchQuery = ''">
            清除搜索
          </v-btn>
        </div>
      </v-sheet>
    </v-container>

    <!-- Footer Promo -->
    <v-container class="py-16">
      <v-row align="center" class="flex-md-row-reverse">
         <v-col cols="12" md="6" class="text-center">
          <div class="image-stack">
            <v-img
              :src="meishi"
              rounded="xl"
              cover
              height="350"
              class="elevation-10 main-img"
            ></v-img>
            <div class="accent-shape"></div>
          </div>
        </v-col>
        <v-col cols="12" md="6" class="pr-md-12">
          <div class="text-overline text-primary mb-2 font-weight-bold">关于我们</div>
          <h3 class="text-h3 font-weight-black text-brown-darken-4 mb-6 line-height-sm">
            分享美味，<br/>连接你我
          </h3>
          <p class="text-body-1 text-grey-darken-2 mb-8 text-justify" style="line-height: 1.8">
            美食工坊不仅仅是一个菜谱网站，更是热爱生活者的聚集地。我们相信，每一道用心烹饪的菜肴背后，都藏着一段温暖的故事。
            加入我们的社区，记录你的烹饪灵感。
          </p>
          <div class="d-flex gap-4">
            <v-btn color="brown-darken-4" size="large" rounded="pill" prepend-icon="mdi-account-plus" to="/forum">
              加入社区
            </v-btn>
             <v-btn variant="outlined" color="brown-darken-4" size="large" rounded="pill" to="/forum">
              了解更多
            </v-btn>
          </div>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useRecipeStore } from '../stores/recipes'
import RecipeCard from '../components/RecipeCard.vue'
import heroImage from '../assets/hero.avif'
import feature_food from '../assets/feature-food.avif'
import meishi from '../assets/meishi.jpg';

const recipeStore = useRecipeStore()
const searchQuery = ref('')
const viewMode = ref('grid')
const featuredRecipe = computed(() => recipeStore.getRecipeById(6))

// 定义分类区域 分别设置 名字, icon,color,以及文本的color
const categories = [
  { name: '家常菜', icon: 'mdi-home-variant', color: 'orange-lighten-4', textColor: 'orange-darken-4' },
  { name: '川菜', icon: 'mdi-chili-mild', color: 'red-lighten-4', textColor: 'red-darken-4' },
  { name: '海鲜', icon: 'mdi-fish', color: 'blue-lighten-4', textColor: 'blue-darken-4' },
  { name: '烘焙', icon: 'mdi-cupcake', color: 'pink-lighten-4', textColor: 'pink-darken-4' },
  { name: '素食', icon: 'mdi-leaf', color: 'green-lighten-4', textColor: 'green-darken-4' },
  { name: '汤羹', icon: 'mdi-pot-steam', color: 'brown-lighten-4', textColor: 'brown-darken-4' },
  { name: '主食', icon: 'mdi-noodles', color: 'purple-lighten-4', textColor: 'purple-darken-4' },
]

const filteredRecipes = computed(() => {
  if (!searchQuery.value) return recipeStore.recipes
  const query = searchQuery.value.toLowerCase()
  return recipeStore.recipes.filter(r => 
    r.title.toLowerCase().includes(query) || 
    r.category.toLowerCase().includes(query) ||
    r.ingredients.some(i => i.toLowerCase().includes(query))
  )
})
</script>

<style scoped>

.text-shadow {
  text-shadow: 0 4px 12px rgba(0, 0, 0, 0.6);
}
.z-index-2 {
  position: relative;
  z-index: 2;
}
.bg-surface {
  background-color: #fff !important; 
}
.hero-title {
  letter-spacing: 2px;
}
.hero-subtitle {
  opacity: 0.9;
}
.search-card {
  transition: transform 0.3s ease;
}
.search-card:hover {
  transform: translateY(-5px);
}

/* 分类卡片动画 */
.category-card {
  transition: all 0.2s ease;
  border: 1px solid transparent;
}
.category-card:hover {
  transform: translateY(-5px);
  border-color: rgba(0,0,0,0.1);
}

/* 入场动画 */
.slide-up-enter {
  animation: slideUp 0.8s cubic-bezier(0.2, 0.8, 0.2, 1) forwards;
  opacity: 0;
  transform: translateY(30px);
}
.slide-up-delayed {
  animation: slideUp 0.8s cubic-bezier(0.2, 0.8, 0.2, 1) 0.2s forwards;
  opacity: 0;
  transform: translateY(30px);
}

@keyframes slideUp {
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.bg-gradient-up {
  background: linear-gradient(to top, rgba(0,0,0,0.8), transparent);
}

.zoom-on-hover {
  transition: transform 0.6s ease;
}
.zoom-on-hover:hover {
  transform: scale(1.05);
}

.image-stack {
  position: relative;
  padding: 20px;
}
.main-img {
  position: relative;
  z-index: 2;
}
.accent-shape {
  position: absolute;
  bottom: 0;
  right: 0;
  width: 100%;
  height: 100%;
  background-color: #fd897a; /* Amber lighten 4 */
  border-radius: 24px;
  transform: rotate(-3deg) scale(0.95);
  z-index: 1;
}
.line-height-sm {
  line-height: 1.2 !important;
}
.gap-4 {
  gap: 16px;
}
</style>
