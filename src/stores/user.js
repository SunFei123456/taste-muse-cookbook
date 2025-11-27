import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useUserStore = defineStore('user', () => {
  const currentUser = ref(JSON.parse(localStorage.getItem('currentUser')) || null)
  // Load users from local storage or init with empty array
  const users = ref(JSON.parse(localStorage.getItem('users')) || [])

  function register(username, password) {
    if (users.value.find(u => u.username === username)) {
      return { success: false, message: '用户名已存在' }
    }
    const newUser = { 
      id: Date.now(), 
      username, 
      password, 
      nickname: '美食家' + Math.floor(Math.random() * 1000), 
      avatar: '' 
    }
    users.value.push(newUser)
    saveUsers()
    return { success: true, message: '注册成功' }
  }

  function login(username, password) {
    const user = users.value.find(u => u.username === username && u.password === password)
    if (user) {
      currentUser.value = user
      saveCurrentUser()
      return { success: true, message: '登录成功' }
    }
    return { success: false, message: '用户名或密码错误' }
  }

  function logout() {
    currentUser.value = null
    localStorage.removeItem('currentUser')
  }

  function updateProfile(data) {
    if (!currentUser.value) return
    currentUser.value = { ...currentUser.value, ...data }
    // update in users array too
    const idx = users.value.findIndex(u => u.id === currentUser.value.id)
    if (idx !== -1) {
      users.value[idx] = currentUser.value
    }
    saveCurrentUser()
    saveUsers()
    return { success: true, message: '更新成功' }
  }

  function changePassword(oldPwd, newPwd) {
      if (!currentUser.value) return { success: false, message: '未登录' }
      if (currentUser.value.password !== oldPwd) {
          return { success: false, message: '旧密码错误' }
      }
      currentUser.value.password = newPwd
      const idx = users.value.findIndex(u => u.id === currentUser.value.id)
      if (idx !== -1) {
          users.value[idx].password = newPwd
      }
      saveCurrentUser()
      saveUsers()
      return { success: true, message: '密码修改成功' }
  }

  function saveUsers() {
    localStorage.setItem('users', JSON.stringify(users.value))
  }

  function saveCurrentUser() {
    localStorage.setItem('currentUser', JSON.stringify(currentUser.value))
  }

  return { currentUser, register, login, logout, updateProfile, changePassword }
})
