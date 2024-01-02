<!-- SignaturePad.vue -->
<template>
  <div>
    <canvas ref="canvas" style="width: 100%; height: 100%;" @mousedown="startDrawing" @mousemove="draw" @mouseup="stopDrawing"></canvas>
    <button @click="clearSignature">Clear Signature</button>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';

const canvasRef = ref(null);
let drawing = false;

onMounted(() => {
  const canvas = canvasRef.value;
  if (canvas) {
    const context = canvas.getContext('2d');
    context.fillStyle = 'black';
  }
});

const startDrawing = () => {
  drawing = true;
};

const draw = (event) => {
  if (!drawing) return;

  const canvas = canvasRef.value;
  if (canvas) {
    const context = canvas.getContext('2d');
    const x = event.clientX - canvas.getBoundingClientRect().left;
    const y = event.clientY - canvas.getBoundingClientRect().top;

    context.fillRect(x, y, 2, 2); // Draw a small square at the cursor position
  }
};

const stopDrawing = () => {
  drawing = false;
};

const clearSignature = () => {
  const canvas = canvasRef.value;
  if (canvas) {
    const context = canvas.getContext('2d');
    context.clearRect(0, 0, canvas.width, canvas.height);
  }
};
</script>

<style scoped>
/* Add custom styles if needed */
</style>
