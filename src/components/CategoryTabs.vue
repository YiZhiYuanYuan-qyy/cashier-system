<template>
  <div>
    <button
      v-for="cat in categories"
      :key="cat"
      :class="{ active: modelValue === cat }"
      @click="$emit('update:modelValue', cat)"
    >
      {{ cat }}
    </button>
  </div>
</template>

<script setup>
const props = defineProps({
  categories: Array,
  modelValue: String
})
</script>

<style scoped>
div {
  display: flex;
  gap: 10px;
  margin-bottom: 20px;
}
button {
  padding: 8px 16px;
  border: none;
  background: linear-gradient(90deg, #fff7fb 0%, #ffe0b2 100%);
  color: #612734;
  cursor: pointer;
  border-radius: 18px;
  font-weight: bold;
  font-size: 16px;
  transition: background 0.2s, color 0.2s, box-shadow 0.2s;
  box-shadow: 0 1px 4px rgba(247, 143, 179, 0.04);
  outline: none;
}
button:focus, button:active {
  outline: none;
  box-shadow: 0 0 0 2px #f7b6d2;
}
button.active {
  background: linear-gradient(90deg, #f7b6d2 0%, #f78fb3 100%);
  color: #fff;
  box-shadow: 0 2px 8px #f7b6d2;
}
</style>