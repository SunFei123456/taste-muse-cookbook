<template>
  <v-app-bar 
    color="rgba(255, 252, 245, 0.85)" 
    flat 
    class="glass-nav border-b-sm"
    height="64"
  >
    <v-container class="d-flex align-center py-0 fill-height">
      <v-app-bar-title class="ml-0">
        <router-link to="/" class="text-decoration-none d-flex align-center group">
          <v-avatar color="primary" size="32" class="mr-2 elevation-2">
            <v-icon icon="mdi-silverware-fork-knife" size="small" color="white"></v-icon>
          </v-avatar>
          <span class="text-h6 font-weight-black text-brown-darken-4 tracking-wide logo-text">
            美食工坊
          </span>
        </router-link>
      </v-app-bar-title>

      <v-spacer></v-spacer>

      <!-- 桌面端菜单 -->
      <div class="d-none d-md-flex align-center gap-2">
        <v-btn 
          variant="text" 
          to="/" 
          class="text-brown-darken-3 font-weight-bold nav-btn"
          prepend-icon="mdi-home-variant-outline"
        >
          首页
        </v-btn>
        
        <v-btn 
          variant="text" 
          to="/forum" 
          class="text-brown-darken-3 font-weight-bold nav-btn"
          prepend-icon="mdi-forum-outline"
        >
          社区
        </v-btn>

        <div class="mx-2 h-50 border-e-sm border-brown-lighten-4"></div>

        <template v-if="userStore.currentUser">
          <v-menu transition="slide-y-transition" location="bottom end" offset="10">
            <template v-slot:activator="{ props }">
              <v-btn
                v-bind="props"
                variant="text"
                class="pl-2 pr-4 rounded-pill text-capitalize text-brown-darken-3 user-btn"
              >
                <v-avatar size="32" color="brown-lighten-5" class="mr-2 border-sm border-primary">
                  <span class="text-primary font-weight-bold text-subtitle-2">
                    {{ userStore.currentUser.nickname.charAt(0) }}
                  </span>
                </v-avatar>
                {{ userStore.currentUser.nickname }}
                <v-icon icon="mdi-chevron-down" size="small" class="ml-1 opacity-50"></v-icon>
              </v-btn>
            </template>
            <v-list elevation="3" rounded="xl" class="pa-2 mt-2 dropdown-menu">
              <v-list-item to="/profile" rounded="lg" class="mb-1" active-class="text-primary bg-orange-lighten-5">
                <template v-slot:prepend>
                  <v-icon icon="mdi-account-cog-outline" size="small" class="mr-2"></v-icon>
                </template>
                <v-list-item-title class="text-body-2 font-weight-bold">个人中心</v-list-item-title>
              </v-list-item>
              <v-divider class="my-1 border-dashed"></v-divider>
              <v-list-item @click="handleLogout" rounded="lg" class="text-error">
                <template v-slot:prepend>
                  <v-icon icon="mdi-logout-variant" size="small" class="mr-2"></v-icon>
                </template>
                <v-list-item-title class="text-body-2 font-weight-bold">退出登录</v-list-item-title>
              </v-list-item>
            </v-list>
          </v-menu>
        </template>
        
        <template v-else>
          <v-btn 
            variant="text" 
            color="brown-darken-3" 
            to="/login"
            class="font-weight-bold mr-2"
          >
            登录
          </v-btn>
          <v-btn 
            variant="flat" 
            color="primary" 
            to="/register"
            class="px-6 text-white font-weight-bold shadow-btn"
            rounded="pill"
          >
            注册账号
          </v-btn>
        </template>
      </div>

      <!-- 移动端抽屉开关 -->
      <v-app-bar-nav-icon 
        class="d-md-none text-brown-darken-3" 
        variant="text"
        @click="drawer = !drawer"
      ></v-app-bar-nav-icon>
    </v-container>
  </v-app-bar>

  <!-- 移动端抽屉菜单 -->
  <v-navigation-drawer
    v-model="drawer"
    location="right"
    temporary
    class="bg-surface-light"
    width="280"
  >
    <div class="pa-4 bg-brown-lighten-5">
      <template v-if="userStore.currentUser">
        <div class="d-flex align-center mb-4">
          <v-avatar size="48" color="primary" class="elevation-2 text-white font-weight-bold text-h6 mr-3">
            {{ userStore.currentUser.nickname.charAt(0) }}
          </v-avatar>
          <div>
            <div class="text-subtitle-1 font-weight-bold text-brown-darken-4">
              {{ userStore.currentUser.nickname }}
            </div>
            <div class="text-caption text-brown-darken-1">欢迎回来</div>
          </div>
        </div>
      </template>
      <template v-else>
         <div class="d-flex align-center mb-4">
          <v-avatar size="48" color="grey-lighten-3" class="mr-3">
            <v-icon icon="mdi-account" color="grey"></v-icon>
          </v-avatar>
          <div>
            <div class="text-subtitle-1 font-weight-bold text-grey-darken-3">未登录</div>
            <div class="text-caption text-grey-darken-1">登录以收藏美味</div>
          </div>
        </div>
        <div class="d-flex gap-2">
          <v-btn block variant="outlined" color="primary" to="/login" class="flex-1-0">登录</v-btn>
          <v-btn block variant="flat" color="primary" to="/register" class="flex-1-0 text-white">注册</v-btn>
        </div>
      </template>
    </div>

    <v-divider></v-divider>

    <v-list nav class="pa-2">
      <v-list-item 
        prepend-icon="mdi-home-variant-outline" 
        title="首页" 
        to="/"
        rounded="lg"
        active-color="primary"
        class="mb-1"
      ></v-list-item>

      <template v-if="userStore.currentUser">
        <v-list-item 
          prepend-icon="mdi-account-cog-outline" 
          title="个人中心" 
          to="/profile"
          rounded="lg"
          active-color="primary"
          class="mb-1"
        ></v-list-item>
        <v-list-item 
          prepend-icon="mdi-logout-variant" 
          title="退出登录" 
          @click="handleLogout"
          rounded="lg"
          color="error"
        ></v-list-item>
      </template>
    </v-list>
  </v-navigation-drawer>
</template>

<script setup>
import { ref } from 'vue'
import { useUserStore } from '../stores/user'
import { useRouter } from 'vue-router'

const userStore = useUserStore()
const router = useRouter()
const drawer = ref(false)

const handleLogout = () => {
  userStore.logout()
  router.push('/login')
  drawer.value = false
}
</script>

<style scoped>
.glass-nav {
  backdrop-filter: blur(12px);
  border-bottom-color: rgba(0,0,0,0.05) !important;
}
.logo-text {
  letter-spacing: 1px;
  font-family: 'Noto Serif SC', serif;
}
.gap-2 {
  gap: 8px;
}
.nav-btn {
  transition: color 0.2s ease;
}
.nav-btn:hover {
  color: #FF6F00 !important; /* Primary Color */
  background-color: transparent;
}
.user-btn:hover {
  background-color: rgba(0,0,0,0.03);
}
.shadow-btn {
  box-shadow: 0 4px 14px rgba(255, 111, 0, 0.3);
  transition: transform 0.2s ease, box-shadow 0.2s ease;
}
.shadow-btn:hover {
  transform: translateY(-1px);
  box-shadow: 0 6px 20px rgba(255, 111, 0, 0.4);
}
</style>
