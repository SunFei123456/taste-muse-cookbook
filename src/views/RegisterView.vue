<template>
  <v-card width="400" class="mx-auto" elevation="8" rounded="lg">
    <v-card-title class="text-h5 text-center pt-6 font-weight-bold">创建账号</v-card-title>
    <v-card-text class="pt-4">
      <v-form @submit.prevent="handleRegister" ref="form">
        <v-text-field v-model="username" label="用户名" prepend-inner-icon="mdi-account" variant="outlined" :rules="[v => !!v || '请输入用户名']"></v-text-field>
        <v-text-field v-model="password" label="密码" prepend-inner-icon="mdi-lock" variant="outlined" type="password" :rules="[v => !!v || '请输入密码']"></v-text-field>
        <v-text-field v-model="confirmPassword" label="确认密码" prepend-inner-icon="mdi-lock-check" variant="outlined" type="password" :rules="[v => !!v || '请输入确认密码', v => v === password || '两次输入密码不一致']"></v-text-field>
        <v-btn type="submit" block color="primary" size="large" class="mt-2" :loading="loading">注册</v-btn>
      </v-form>
      <div class="text-center mt-4">
        <span class="text-grey">已有账号？</span>
        <router-link to="/login" class="text-primary font-weight-bold text-decoration-none">去登录</router-link>
      </div>
    </v-card-text>
  </v-card>
  <v-snackbar v-model="snackbar" :color="snackbarColor" timeout="3000">{{ snackbarText }}</v-snackbar>
</template>

<script setup>
import { ref } from 'vue'
import { useUserStore } from '../stores/user'
import { useRouter } from 'vue-router'

const userStore = useUserStore()
const router = useRouter()
const username = ref('')
const password = ref('')
const confirmPassword = ref('')
const loading = ref(false)
const snackbar = ref(false)
const snackbarText = ref('')
const snackbarColor = ref('success')
const form = ref(null)

const handleRegister = async () => {
  const { valid } = await form.value.validate()
  if (!valid) return
  
  loading.value = true
  // Simulate network delay
  setTimeout(() => {
    const res = userStore.register(username.value, password.value)
    loading.value = false
    snackbarText.value = res.message
    snackbarColor.value = res.success ? 'success' : 'error'
    snackbar.value = true
    
    if (res.success) {
      setTimeout(() => {
        router.push('/login')
      }, 1000)
    }
  }, 500)
}
</script>
