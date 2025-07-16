<template>
    <div class="checkout-bar">
      <label>Discount：</label>
      <el-select v-model="localDiscount" @change="$emit('update:discount-type', localDiscount)" class="discount-select" placeholder="请选择折扣">
        <el-option label="None" value="none" />
        <el-option label="Buy 3 Get 1" value="buy3get1" />
        <el-option label="5% Discount" value="5" />
        <el-option label="10% Discount" value="10" />
        <el-option label="20% Discount" value="20" />
        <el-option label="30% Discount" value="30" />
      </el-select>
  
      <p>In total {{ totalCount }} items　Original Price：${{ rawTotal }}</p>
      <p>After Discount：<strong>${{ finalTotal }}</strong></p>
  
      <button class="checkout-btn" @click="checkout">Checkout</button>
    </div>
  </template>
  
  <script setup>
  import { computed, ref, watch } from 'vue'
  import { ElSelect, ElOption } from 'element-plus'
  
  const props = defineProps({
    cart: Array,
    discountType: String
  })
  
  const emit = defineEmits(['update:discount-type', 'clear-cart'])
  
  const localDiscount = ref(props.discountType || 'none')
  watch(() => props.discountType, val => localDiscount.value = val)
  
  const rawTotal = computed(() =>
    props.cart.reduce((sum, item) => sum + item.quantity * item.price, 0).toFixed(2)
  )
  
  const finalTotal = computed(() => {
    let total = props.cart.reduce((sum, item) => sum + item.quantity * item.price, 0)

    if (localDiscount.value === 'buy3get1') {
      const allPrices = []
      props.cart.forEach(item => {
        for (let i = 0; i < item.quantity; i++) {
          allPrices.push(item.price)
        }
      })
      allPrices.sort((a, b) => a - b)
      const freeCount = Math.floor(allPrices.length / 4)
      let discount = 0
      for (let i = 0; i < freeCount; i++) {
        discount += allPrices[i]
      }
      total -= discount
    } else if (["5", "10", "20", "30"].includes(localDiscount.value)) {
      const discountRate = 1 - Number(localDiscount.value) / 100
      total *= discountRate
    }

    return total.toFixed(2)
  })
  
  const totalCount = computed(() => props.cart.reduce((sum, item) => sum + item.quantity, 0))
  
  const checkout = () => {
    alert(`✅ 实际收银金额：$${finalTotal.value}`)
    emit('clear-cart')
    emit('update:discount-type', 'none')
  }
  </script>
  
  <style scoped>
.checkout-bar {
  margin-top: auto;
  border-top: 1px solid #eee;
  padding-top: 10px;
  background: linear-gradient(135deg, #ffe0b2 0%, #f8b6d2 60%, #f7c6e0 100%);
  color: #612734;
}
.checkout-btn {
  margin-top: 10px;
  width: 100%;
  padding: 10px;
  background: linear-gradient(90deg, #f78fb3 0%, #f7b6d2 100%);
  color: #fff;
  border: none;
  font-size: 16px;
  font-weight: bold;
  cursor: pointer;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(247, 143, 179, 0.15);
  transition: background 0.2s;
}
.checkout-btn:hover {
  background: linear-gradient(90deg, #f7b6d2 0%, #f78fb3 100%);
}
.checkout-btn:focus, .checkout-btn:active {
  outline: none;
  box-shadow: 0 0 0 2px #f7b6d2;
}
.discount-select {
  width: 100%;
  margin-bottom: 8px;
}
select {
  padding: 6px;
  margin-bottom: 8px;
  width: 100%;
  border-radius: 8px;
  border: 1px solid #f7b6d2;
  background: #fff7fb;
  color: #612734;
  font-size: 16px;
  font-weight: 500;
  appearance: none;
  -webkit-appearance: none;
  -moz-appearance: none;
  background-image: url('data:image/svg+xml;utf8,<svg fill="%23f7b6d2" height="20" viewBox="0 0 20 20" width="20" xmlns="http://www.w3.org/2000/svg"><path d="M5.516 7.548a.625.625 0 0 1 .884-.088L10 10.293l3.6-2.833a.625.625 0 1 1 .796.972l-4 3.15a.625.625 0 0 1-.796 0l-4-3.15a.625.625 0 0 1-.088-.884z"/></svg>');
  background-repeat: no-repeat;
  background-position: right 10px center;
  background-size: 20px 20px;
}
select:focus, select:active {
  outline: none;
  box-shadow: 0 0 0 1px #f7b6d2;
}
  </style>