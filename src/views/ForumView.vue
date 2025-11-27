<template>
  <div class="forum-page">
    <!-- 头部横幅区域 -->
    <v-card class="mb-6  overflow-hidden" elevation="0">
      <v-img
        :src="forumBanner"
        height="320"
        cover
        gradient="to bottom, rgba(0,0,0,0.15), rgba(0,0,0,0.65)"
      >
        <v-container class="fill-height align-center">
          <v-row align="center">
            <v-col cols="12" md="8" class="text-white">
              <h1 class="text-h3 font-weight-bold mb-2 text-shadow">美食社区</h1>
              <p class="text-body-1 text-white">与 {{ userCount }} 位美食爱好者一起交流烹饪心得</p>
            </v-col>
            <v-col cols="12" md="4" class="text-md-right">
              <v-btn 
                color="primary" 
                size="large" 
                prepend-icon="mdi-pencil-plus" 
                rounded="pill" 
                elevation="6"
                @click="showCreateDialog = true"
              >
                发布新话题
              </v-btn>
            </v-col>
          </v-row>
        </v-container>
      </v-img>
    </v-card>

    <v-container>
      <v-row>
        <!-- 帖子列表 -->
        <v-col cols="12">
          <v-slide-y-transition group>
            <v-card 
              v-for="post in forumStore.posts" 
              :key="post.id" 
              class="mb-4 post-card" 
              rounded="lg" 
              elevation="1"
              link
              @click="openPost(post)"
            >
              <div class="d-flex flex-column flex-sm-row">
                 <!-- 帖子内容 -->
                 <div class="pa-4 flex-grow-1">
                   <div class="d-flex align-center mb-2">
                     <v-avatar size="24" color="grey-lighten-2" class="mr-2">
                        <v-img v-if="post.author.avatar" :src="post.author.avatar"></v-img>
                        <span v-else class="text-caption text-grey-darken-1">{{ post.author.nickname.charAt(0) }}</span>
                     </v-avatar>
                     <span class="text-caption text-grey-darken-1 mr-2">{{ post.author.nickname }}</span>
                     <span class="text-caption text-grey-lighten-1">•</span>
                     <span class="text-caption text-grey-darken-1 ml-2">{{ post.createTime }}</span>
                   </div>
                   
                   <h3 class="text-h6 font-weight-bold text-brown-darken-3 mb-2 post-title">{{ post.title }}</h3>
                   <p class="text-body-2 text-grey-darken-1 text-truncate-2 mb-3">{{ post.content }}</p>
                   
                   <div class="d-flex align-center">
                     <v-chip 
                       v-for="tag in post.tags" 
                       :key="tag" 
                       size="x-small" 
                       color="primary" 
                       variant="tonal" 
                       class="mr-2"
                     >
                       # {{ tag }}
                     </v-chip>
                   </div>
                 </div>
              </div>
            </v-card>
          </v-slide-y-transition>
        </v-col>
      </v-row>
    </v-container>

    <!-- 发布话题弹窗 -->
    <v-dialog v-model="showCreateDialog" max-width="600">
      <v-card rounded="xl">
        <v-card-title class="text-h5 font-weight-bold pa-6 pb-2">发布新话题</v-card-title>
        <v-card-text class="px-6">
          <v-form ref="form" @submit.prevent="handleCreatePost">
            <v-text-field 
              v-model="newPost.title" 
              label="标题" 
              variant="outlined" 
              color="primary" 
              :rules="[v => !!v || '请输入标题']"
            ></v-text-field>
            <v-textarea 
              v-model="newPost.content" 
              label="内容" 
              variant="outlined" 
              color="primary" 
              rows="5"
              :rules="[v => !!v || '请输入内容']"
            ></v-textarea>
            <v-select
              v-model="newPost.tags"
              :items="['烹饪技巧', '食谱分享', '探店', '厨具', '求助']"
              label="标签"
              variant="outlined"
              color="primary"
              multiple
              chips
            ></v-select>
          </v-form>
        </v-card-text>
        <v-card-actions class="pa-6 pt-0">
          <v-spacer></v-spacer>
          <v-btn variant="text" color="grey" @click="showCreateDialog = false">取消</v-btn>
          <v-btn color="primary" variant="flat" @click="handleCreatePost" rounded="pill" class="px-6">发布</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    
    <v-dialog v-model="showPostDialog" max-width="640">
      <v-card rounded="xl">
        <v-card-title class="text-h5 font-weight-bold">
          {{ activePost?.title }}
        </v-card-title>
        <v-card-subtitle class="text-body-2 text-grey-darken-1 d-flex align-center">
          <v-avatar size="32" color="grey-lighten-3" class="mr-2">
            <v-img v-if="activePost?.author?.avatar" :src="activePost.author.avatar"></v-img>
            <span v-else>{{ activePost?.author?.nickname?.charAt(0) }}</span>
          </v-avatar>
          <span class="mr-2">{{ activePost?.author?.nickname }}</span>
          <span class="text-grey-lighten-1">•</span>
          <span class="ml-2">{{ activePost?.createTime }}</span>
        </v-card-subtitle>
        <v-card-text>
          <p class="text-body-1 mb-4" style="line-height: 1.8">
            {{ activePost?.content }}
          </p>
          <div class="d-flex flex-wrap gap-2">
            <v-chip
              v-for="tag in activePost?.tags || []"
              :key="tag"
              color="primary"
              variant="tonal"
              size="small"
            >
              # {{ tag }}
            </v-chip>
          </div>
        </v-card-text>
        <v-card-actions class="justify-end">
          <v-btn variant="text" color="primary" @click="showPostDialog = false">关闭</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <v-snackbar v-model="snackbar" color="success" timeout="3000">发布成功！</v-snackbar>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useForumStore } from '../stores/forum'
import { useUserStore } from '../stores/user'
import forumBanner from '../assets/meishi-banner.jpg'

const forumStore = useForumStore()
const userStore = useUserStore()
const showCreateDialog = ref(false)
const snackbar = ref(false)
const form = ref(null)
const showPostDialog = ref(false)
const activePost = ref(null)

// 模拟社区用户总数
const userCount = ref(12045)

const newPost = ref({
  title: '',
  content: '',
  tags: []
})

const handleCreatePost = async () => {
  const { valid } = await form.value.validate()
  if (!valid) return

  if (!userStore.currentUser) {
    alert('请先登录')
    return
  }

  forumStore.addPost({
    title: newPost.value.title,
    content: newPost.value.content,
    tags: newPost.value.tags,
    author: {
      nickname: userStore.currentUser.nickname,
      avatar: userStore.currentUser.avatar || ''
    }
  })

  showCreateDialog.value = false
  snackbar.value = true
  newPost.value = { title: '', content: '', tags: [] }
}

const openPost = (post) => {
  activePost.value = post
  showPostDialog.value = true
}
</script>

<style scoped>
.text-shadow {
  /* 中文注释：提供标题阴影，确保在图片背景上清晰可读 */
  text-shadow: 0 3px 8px rgba(0, 0, 0, 0.45);
}
.post-card {
  transition: transform 0.2s, box-shadow 0.2s;
}
.post-card:hover {
  transform: translateY(-2px);
  box-shadow: 0 6px 12px rgba(0,0,0,0.1) !important;
}
.post-title {
  line-height: 1.4;
}
.text-truncate-2 {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
</style>
