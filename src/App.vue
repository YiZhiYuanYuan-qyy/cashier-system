<template>
  <img src="/logo.png" alt="logo" class="corner-logo" />
  <div class="app-layout">
    <!-- 左侧购物车 -->
    <div class="left-cart">
      <div class="cart-flex-col">
        <Cart :cart="cart" 
        @remove="removeFromCart"
        @increase="increaseItem"
        @decrease="decreaseItem" />
        <CheckoutBar
        :cart="cart"
        :discount-type="discountType"
        @update:discount-type="discountType = $event"
        @clear-cart="cart = []"
      />
      </div>
    </div>
    <!-- 右侧商品区域 -->
    <div class="right-products">
      <CategoryTabs :categories="categories" v-model="selectedCategory" />
      <div class="product-scroll">
        <ProductGrid :category="selectedCategory" @add-to-cart="addToCart" />
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import CategoryTabs from './components/CategoryTabs.vue'
import ProductGrid from './components/ProductGrid.vue'
import Cart from './components/Cart.vue'
import CheckoutBar from './components/CheckoutBar.vue'
const discountType = ref('none')
const categories = ['Charms Chain', 'Bags', 'Pet Stuff', 'Other']
const selectedCategory = ref(categories[0])
const cart = ref([])

const addToCart = (product) => {
  const item = cart.value.find(i => i.id === product.id)
  item ? item.quantity++ : cart.value.push({ ...product, quantity: 1 })
}

const removeFromCart = (id) => {
  cart.value = cart.value.filter(item => item.id !== id)
}
const increaseItem = (id) => {
  const item = cart.value.find(i => i.id === id)
  if (item) item.quantity++
}

const decreaseItem = (id) => {
  const item = cart.value.find(i => i.id === id)
  if (item.quantity > 1) {
    item.quantity--
  } else {
    removeFromCart(id)
  }

const discountType = ref('none') // none | buy3get1 | 5 | 10 | 20 | 30
}
</script>

<style scoped>
.corner-logo {
  position: fixed;
  top: 5px;
  right: 25px;
  width: 130px;
  height: auto;
  z-index: 1000;
  pointer-events: none;
  opacity: 0.9;
}
.app-layout {
  display: flex;
  width: 100%;
  height: 100vh; /* 保证撑满视口高度 */
  overflow: hidden;
}
.left-cart {
  width: 30%;
  height: 94.7vh;
  background: linear-gradient(135deg, #fff0fa 0%, #ffe0b2 100%);
  padding: 20px 20px 20px 20px; /* 上右下左，顶部多一些内边距 */
  display: flex;
  flex-direction: column;
  border-right: 1px solid #f7b6d2;
  box-sizing: border-box;
  border-radius: 18px;
  box-shadow: 0 2px 12px rgba(247, 143, 179, 0.08);
  margin-top: 20px; /* 距离顶部20px */
  margin-left: 20px; /* 距离左侧20px */
}
.cart-flex-col {
  display: flex;
  flex-direction: column;
  height: 100%;
}
.cart-flex-col > :first-child {
  flex: 1;
  min-height: 0;
}
.right-products {
  width: 70%;
  display: flex;
  flex-direction: column;
  box-sizing: border-box;
  /* height: 100%; 这一行去掉 */
  padding: 20px 20px 0 20px;
}
.product-scroll {
  flex: 1;
  /* height: 100%; 这一行去掉 */
  overflow-y: auto;
  min-height: 0;
  padding-bottom: 20px;
}
</style>

<style>
html, body, #app {
  height: 100%;
  margin: 0;
  padding: 0;
}
</style>