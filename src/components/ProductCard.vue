<template>
  <div
    class="product-card"
    @click="$emit('add', product)"
  >
    <img :src="product.imageUrl" alt="" class="product-img" />
    <h4 class="product-title">{{ product.name }}</h4>
    <p class="product-price">${{ product.price }}</p>
  </div>
</template>

<script setup>
defineProps({ product: Object })
</script>

<style scoped>
.product-card {
  border: 1.5px solid #f7b6d2;
  padding: 10px;
  text-align: center;
  cursor: pointer;
  background: #fff0fa;
  border-radius: 16px;
  box-shadow: 0 2px 8px rgba(247, 143, 179, 0.06);
  transition: box-shadow 0.2s, border 0.2s;
}
.product-card:hover {
  box-shadow: 0 4px 16px rgba(247, 143, 179, 0.12);
  border: 1.5px solid #f78fb3;
}
.product-img {
  width: 100%;
  height: 100px;
  object-fit: cover;
  border-radius: 10px;
  margin-bottom: 8px;
}
.product-title {
  margin: 5px 0;
  color: #612734;
  font-size: 16px;
  font-weight: bold;
}
.product-price {
  color: #f78fb3;
  font-size: 15px;
  margin: 0;
}
</style>