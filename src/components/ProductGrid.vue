<template>
  <div class="grid">
    <ProductCard
      v-for="item in products"
      :key="item.id"
      :product="item"
      @add="$emit('add-to-cart', item)"
    />

    <!-- 新增商品卡片 -->
    <AddProductCard :category="category" @refresh="fetchProducts" />
  </div>
</template>

<script setup>
import { ref, onMounted, watch } from 'vue'
import { collection, getDocs } from 'firebase/firestore'
import { db } from '../firebase'
import ProductCard from './ProductCard.vue'
import AddProductCard from './AddProductCard.vue'

const props = defineProps({ category: String })
const products = ref([])

const fetchProducts = async () => {
  const snap = await getDocs(collection(db, 'products'))
  products.value = snap.docs
    .map(doc => ({ id: doc.id, ...doc.data() }))
    .filter(p => p.category === props.category)
}

onMounted(fetchProducts)
watch(() => props.category, fetchProducts)
</script>

<style scoped>
.grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
  gap: 15px;
}
</style>