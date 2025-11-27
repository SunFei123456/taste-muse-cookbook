<template>
  <v-container>
    <v-row justify="center">
      <v-col cols="12" md="8">
        <v-card rounded="lg" elevation="2">
          <v-toolbar color="primary" dark>
            <v-toolbar-title>个人中心</v-toolbar-title>
          </v-toolbar>
          
          <v-card-text class="pa-6">
            <div class="d-flex flex-column align-center mb-6">
              <v-avatar size="100" color="grey-lighten-2" class="mb-3">
                <v-icon icon="mdi-account" size="64" color="grey-darken-1"></v-icon>
              </v-avatar>
              <div class="text-h5 font-weight-bold">{{ userStore.currentUser?.nickname }}</div>
              <div class="text-body-2 text-grey">用户名: {{ userStore.currentUser?.username }}</div>
            </div>

            <v-divider class="my-4"></v-divider>
            <div class="text-h6 mb-4">修改密码</div>
            
            <v-form @submit.prevent="handleChangePassword" ref="form">
              <v-text-field v-model="oldPassword" label="当前密码" variant="outlined" type="password" :rules="[v => !!v || '请输入当前密码']"></v-text-field>
              <v-text-field v-model="newPassword" label="新密码" variant="outlined" type="password" :rules="[v => !!v || '请输入新密码']"></v-text-field>
              <v-text-field v-model="confirmNewPassword" label="确认新密码" variant="outlined" type="password" :rules="[v => !!v || '请输入确认密码', v => v === newPassword || '两次输入密码不一致']"></v-text-field>
              
              <v-btn type="submit" color="primary" :loading="loading">保存修改</v-btn>
            </v-form>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
    <v-snackbar v-model="snackbar" :color="snackbarColor" timeout="3000">{{ snackbarText }}</v-snackbar>
  </v-container>
</template>

<script setup>
import { ref } from 'vue'
import { useUserStore } from '../stores/user'

const userStore = useUserStore()
const oldPassword = ref('')
const newPassword = ref('')
const confirmNewPassword = ref('')
const loading = ref(false)
const snackbar = ref(false)
const snackbarText = ref('')
const snackbarColor = ref('success')
const form = ref(null)

const handleChangePassword = async () => {
  const { valid } = await form.value.validate()
  if (!valid) return

  loading.value = true
  setTimeout(() => {
    const res = userStore.changePassword(oldPassword.value, newPassword.value)
    loading.value = false
    snackbarText.value = res.message
    snackbarColor.value = res.success ? 'success' : 'error'
    snackbar.value = true
    
    if (res.success) {
      form.value.reset()
    }
  }, 500)
}
</script>
