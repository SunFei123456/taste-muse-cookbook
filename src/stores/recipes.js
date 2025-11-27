import { defineStore } from 'pinia'
import { ref } from 'vue'

import hongshaorou from '../assets/hongshaorou.jpeg';
import qingzhengluyu from '../assets/qingzhengluyu.jpg';
import mapodoufu from '../assets/mapodoufu.jpg';
import gongbaojiding from '../assets/gongbaojiding.jpeg';

import xihongshijidan from '../assets/xihongshijidan.jpeg';
import featureFood from '../assets/feature-food.avif';

export const useRecipeStore = defineStore('recipes', () => {
  // Mock Data
  const recipes = ref([
    {
      id: 1,
      title: '红烧肉',
      description: '肥而不腻，入口即化，经典家常菜。',
      image: hongshaorou,
      ingredients: ['五花肉 500g', '冰糖 20g', '生抽 2勺', '老抽 1勺', '料酒 1勺'],
      steps: ['五花肉切块焯水。', '锅中放油炒糖色。', '放入肉块翻炒上色。', '加入调料和水炖煮一小时。', '大火收汁即可。'],
      rating: 4.8,
      category: '家常菜'
    },
    {
      id: 2,
      title: '清蒸鲈鱼',
      description: '鲜嫩多汁，保留食材原味。',
      image: qingzhengluyu,
      ingredients: ['鲈鱼 1条', '葱姜 适量', '蒸鱼豉油 2勺'],
      steps: ['鲈鱼处理干净，改刀。', '放上葱姜片。', '上锅蒸8分钟。', '倒掉汤汁，淋上热油和豉油。'],
      rating: 4.5,
      category: '海鲜'
    },
    {
      id: 3,
      title: '麻婆豆腐',
      description: '麻辣鲜香，下饭神器。',
      image: mapodoufu,
      ingredients: ['嫩豆腐 1块', '肉末 50g', '豆瓣酱 1勺', '花椒粉 适量'],
      steps: ['豆腐切块焯水。', '炒香肉末和豆瓣酱。', '加入水和豆腐煮3分钟。', '勾芡，撒上花椒粉和葱花。'],
      rating: 4.7,
      category: '川菜'
    },
    {
      id: 4,
      title: '宫保鸡丁',
      description: '酸甜微辣，口感丰富。',
      image: gongbaojiding,
      ingredients: ['鸡胸肉 300g', '花生米 50g', '干辣椒 适量', '宫保汁 1碗'],
      steps: ['鸡肉切丁腌制。', '炒香干辣椒和花椒。', '放入鸡丁滑炒。', '倒入宫保汁和花生米翻炒均匀。'],
      rating: 4.6,
      category: '川菜'
    },
     {
      id: 5,
      title: '西红柿炒鸡蛋',
      description: '国民家常菜，酸甜可口。',
      image: xihongshijidan,
      ingredients: ['鸡蛋 3个', '西红柿 2个', '葱花 适量', '盐 1勺'],
      steps: ['鸡蛋打散炒熟盛出。', '锅中炒西红柿出汁。', '倒入鸡蛋混合翻炒。', '加盐调味撒葱花。'],
      rating: 4.9,
      category: '家常菜'
    },
    {
      id: 6,
      title: '什锦海鲜饭',
      description: '地中海风味，藏红花与海鲜的香气交织，颗颗米粒饱含汤汁。',
      image: featureFood,
      ingredients: ['意大利米 300g', '大虾 6只', '青口贝 200g', '鱿鱼圈 150g', '青豆 50g', '柠檬 1个', '藏红花 少许'],
      steps: ['热油煸香洋葱蒜末，倒入意大利米翻炒。', '加入海鲜高汤与藏红花，小火慢煮。', '依次放入鱿鱼、青口与大虾焖煮至熟。', '撒上青豆与香菜，挤入柠檬汁即可。'],
      rating: 4.9,
      category: '海鲜'
    }
  ])

  function getRecipeById(id) {
    return recipes.value.find(r => r.id === Number(id))
  }

  return { recipes, getRecipeById }
})
