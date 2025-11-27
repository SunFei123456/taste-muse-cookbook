import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useForumStore = defineStore('forum', () => {
  const posts = ref([
    {
      id: 1,
      title: '求助：红烧肉怎么做才不腻？',
      content: '尝试了好几次，每次做出来的红烧肉都感觉太油了，有没有大神支招？是焯水的问题还是糖色炒过了？',
      author: {
        nickname: '厨房小白',
        avatar: ''
      },
      likes: 12,
      views: 345,
      replies: 8,
      tags: ['烹饪技巧', '求助'],
      createTime: '2小时前'
    },
    {
      id: 2,
      title: '分享一个零失败的戚风蛋糕配方',
      content: '这个配方我用了三年了，从来没有塌陷过。关键点在于蛋白的打发程度和烤箱温度的控制...',
      author: {
        nickname: '烘焙达人',
        avatar: ''
      },
      likes: 89,
      views: 1205,
      replies: 24,
      tags: ['烘焙', '食谱分享'],
      createTime: '昨天'
    },
    {
      id: 3,
      title: '最近发现一家超好吃的川菜馆！',
      content: '就在市中心的那家老巷子川菜，水煮鱼简直是一绝，辣椒特别香，推荐大家去试试。',
      author: {
        nickname: '探店小能手',
        avatar: ''
      },
      likes: 45,
      views: 890,
      replies: 15,
      tags: ['探店', '推荐'],
      createTime: '2天前'
    },
    {
      id: 4,
      title: '关于选购不粘锅的几点建议',
      content: '市面上的不粘锅种类繁多，麦饭石、特氟龙、蜂窝晶盾...到底该怎么选？今天来给大家科普一下。',
      author: {
        nickname: '厨具评测',
        avatar: ''
      },
      likes: 156,
      views: 2300,
      replies: 42,
      tags: ['厨具', '科普'],
      createTime: '3天前'
    }
  ])

  function addPost(post) {
    posts.value.unshift({
      id: Date.now(),
      likes: 0,
      views: 0,
      replies: 0,
      createTime: '刚刚',
      ...post
    })
  }

  return { posts, addPost }
})
