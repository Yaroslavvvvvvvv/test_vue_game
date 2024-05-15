<template>
  <div class="flex flex-col items-center pt-4 bg-black">
    <div class="flex space-x-4">
      <label for="size-x-input" class="text-gray-200 text-lg">Size X:</label>
      <input type="number" id="size-x-input" v-model="sizeX" class="border border-gray-300 rounded-md p-2 focus:outline-none focus:ring focus:ring-blue-500" min="0"/>
      <label for="size-y-input" class="text-gray-200 text-lg">Size Y:</label>
      <input type="number" id="size-y-input" v-model="sizeY" class="border border-gray-300 rounded-md p-2 focus:outline-none focus:ring focus:ring-blue-500" min="0"/>
    </div>
    <div class="grid grid-cols-{{ sizeX }} gap-1 mt-4" :style="{ width: sizeX * 40 + 'px' }">
      <div v-for="(row, rowIndex) in sizeY" :key="rowIndex" class="flex">
        <div v-for="(col, colIndex) in sizeX" :key="colIndex"
             @mouseover="hoverColor(rowIndex, colIndex)"
             :class="{ 'bg-blue-500': squares[rowIndex][colIndex], 'bg-white': !squares[rowIndex][colIndex] }"
             style="width: 36px; height: 36px; margin: 2px;"></div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, watch } from 'vue';

const sizeX = ref(0);
const sizeY = ref(0);
const squares = ref([]);

const hoverColor = (rowIndex, colIndex) => {
  squares.value[rowIndex][colIndex] = !squares.value[rowIndex][colIndex];
};

watch([sizeX, sizeY], () => {
  squares.value = Array.from({ length: sizeY.value }, () => Array(sizeX.value).fill(false));
});
</script>

<style scoped>
</style>