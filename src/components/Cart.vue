<template>
    <div class="cart-container">
      <h2 class="cart-title">Cart</h2>
  
      <div class="cart-list-scroll">
        <div v-if="cart.length > 0">
          <ul class="cart-list">
            <li v-for="item in cart" :key="item.id" class="cart-block">
              <div class="cart-row">
                <img :src="item.imageUrl" class="item-thumb" />
                <div class="item-name">{{ item.name }}</div>
  
                <div class="quantity-control">
                  <button @click="decrease(item.id)">－</button>
                  <span>{{ item.quantity }}</span>
                  <button @click="increase(item.id)">＋</button>
                </div>
  
                <button @click="$emit('remove', item.id)" class="remove-btn">×</button>
              </div>
  
              <div class="subtotal">
                ${{ item.price }} × {{ item.quantity }} = ${{ item.price * item.quantity }}
              </div>
            </li>
          </ul>
        </div>
  
        <p v-else class="empty-tip">No items</p>
      </div>
    </div>
  </template>
  
  <script setup>
  const props = defineProps({ cart: Array })
  const emit = defineEmits(['increase', 'decrease', 'remove'])
  
  const increase = (id) => emit('increase', id)
  const decrease = (id) => emit('decrease', id)
  </script>
  
  <style scoped>
  .cart-container {
    display: flex;
    flex-direction: column;
    height: 100%;
  }
  
  .cart-title {
    font-size: 20px;
    margin-bottom: 10px;
    font-weight: bold;
  }
  
  .cart-list {
    list-style: none; /* 去除圆点 */
    padding: 0;
    margin: 0;
  }
  
  .cart-list-scroll {
    flex: 1;
    overflow-y: auto;
    min-height: 0;
  }
  
  .cart-block {
    padding: 8px 0;
    border-bottom: 1px solid #fde4ef; /* 更浅的粉色分割线 */
  }
  
  .cart-row {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 8px;
  }
  
  .item-name {
    flex: 1.2;
    font-weight: 500;
  }
  
  .quantity-control {
    display: flex;
    align-items: center;
    gap: 6px;
  }
  
  .quantity-control button {
    width: 24px;
    height: 24px;
    border: 1px solid #ccc;
    background: white;
    font-size: 18px;
    font-weight: bold;
    color: #612734;
    cursor: pointer;
    line-height: 1;
    padding: 0;
    border-radius: 4px;
  }
  
  .quantity-control button:focus, .quantity-control button:active {
    outline: none;
    box-shadow: 0 0 0 2px #f7b6d2;
  }
  
  .remove-btn {
    background: transparent;
    border: none;
    font-size: 20px;
    color: red;
    cursor: pointer;
  }
  
  .subtotal {
    font-size: 13px;
    color: #888;
    text-align: right;
    margin-top: 4px;
  }
  .item-thumb {
  width: 42px;
  height: 42px;
  object-fit: cover;
  border-radius: 4px;
  border: 1px solid #ddd;
}
  </style>