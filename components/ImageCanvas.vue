<script setup>
import { toJpeg } from "html-to-image";

const props = defineProps({
  bgImage: String, // the base64 encoded string of the image generated from DALL-E
  title: String, // the title of the article scraped from the page
  gradient: Object, // the gradient background for this image
});

const imageRef = ref();
const imageSrc = ref("");

onMounted(() => {
  if (!imageRef.value) {
    return;
  }
  toJpeg(imageRef.value)
    .then(function (dataUrl) {
      imageSrc.value = dataUrl;
    })
    .catch(function (error) {
      console.error("Oops, something went wrong!", error);
    });
});
</script>
<template>
  <div
    ref="imageRef"
    :class="{ hidden: imageSrc }"
    class="w-[400px] h-[200px] relative"
    :style="`background: linear-gradient(to right, ${gradient.start}, ${gradient.finish})`"
  >
    <img
      :src="bgImage"
      class="absolute top-0 bottom-0 left-[0] w-[100%] object-cover h-full mix-blend-soft-light"
    />
    <div
      class="bg-white absolute top-[20%] left-[30%] right-[10%] bottom-[20%] rounded text-slate-600"
    >
      <div class="p-4 flex items-center h-full">
        <p>{{ title }}</p>
      </div>
    </div>
  </div>
  <img v-if="imageSrc" :src="imageSrc" alt="" />
</template>