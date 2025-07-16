<template>
    <div class="add-card" @click="open = true">
      <div class="plus">＋</div>
      <div>Add Product</div>
    </div>
  
    <div v-if="open" class="modal">
      <div class="form">
        <h3>新增商品到「{{ category }}」</h3>
  
        <label>商品名称</label>
        <input v-model="name" placeholder="请输入商品名" />
  
        <label>价格（元）</label>
        <input v-model.number="price" type="number" placeholder="如：25" />
  
        <label>库存数量</label>
        <input v-model.number="stock" type="number" placeholder="如：100" />
  
        <label>图片链接</label>
        <input v-model="imageUrl" placeholder="请输入图片地址" />
  
        <button @click="addProduct" :disabled="uploading">
          {{ uploading ? '上传中...' : '添加' }}
        </button>
        <button @click="open = false" class="cancel">取消</button>
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref } from 'vue'
  import { addDoc, collection } from 'firebase/firestore'
  import { db } from '../firebase'
  
  const props = defineProps({ category: String })
  const emit = defineEmits(['refresh'])
  
  const open = ref(false)
  const name = ref('')
  const price = ref(0)
  const stock = ref(0)
  const imageUrl = ref('')
  const uploading = ref(false)
  
  const addProduct = async () => {
    if (!name.value || price.value <= 0 || stock.value < 0 || !imageUrl.value) {
      alert('请填写所有字段')
      return
    }
  
    uploading.value = true
  
    await addDoc(collection(db, 'products'), {
      name: name.value,
      price: price.value,
      stock: stock.value,
      imageUrl: imageUrl.value,
      category: props.category
    })
  
    // 重置
    uploading.value = false
    open.value = false
    name.value = ''
    price.value = 0
    stock.value = 0
    imageUrl.value = ''
    emit('refresh')
  }
  </script>
  
  <style scoped>
.add-card {
  height: 150px;
  padding: 10px;
  border: 2px dashed #f7b6d2;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  font-size: 14px;
  cursor: pointer;
  border-radius: 16px;
  background: #fff7fb;
  color: #612734;
  box-sizing: border-box;
  transition: border 0.2s, background 0.2s;
}
.add-card:hover {
  border: 2px dashed #f78fb3;
  background: #ffe0f5;
}
.plus {
  font-size: 28px;
  margin-bottom: 4px;
  color: #612734;
}
  .modal {
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    background: rgba(0,0,0,0.3);
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .form {
    background: white;
    padding: 20px;
    border-radius: 8px;
    width: 320px;
    display: flex;
    flex-direction: column;
    gap: 10px;
  }
  .form label {
    font-weight: bold;
    font-size: 14px;
  }
  .form input {
    padding: 6px;
    font-size: 14px;
    border: 1.5px solid #f7b6d2;
    border-radius: 6px;
    transition: border 0.2s, box-shadow 0.2s;
    color: #612734;
    background: #fff7fb;
  }
  .form input:focus, .form input:active {
    outline: none;
    border: 1.5px solid #f78fb3;
    box-shadow: 0 0 0 2px #f7b6d2;
  }
  .form button {
    background: linear-gradient(90deg, #f78fb3 0%, #f7b6d2 100%);
    color: #fff;
    border: none;
    border-radius: 8px;
    font-weight: bold;
    transition: background 0.2s, box-shadow 0.2s;
  }
  .form button:hover {
    background: linear-gradient(90deg, #f7b6d2 0%, #f78fb3 100%);
  }
  .form button:focus, .form button:active {
    outline: none;
    box-shadow: 0 0 0 2px #f7b6d2;
  }
  .cancel {
    background: transparent;
    color: #999;
    border: none;
  }
  .cancel:focus, .cancel:active {
    outline: none;
    box-shadow: 0 0 0 2px #ccc;
  }
  </style>