<script setup lang="ts">
const route = useRoute();
const form = ref({
  url: route.query.url || "",
  temperature: 0.3,
});

const twitterCard = ref();
// const facebookCard = ref();
const { generate: generateImage } = useImageAi();

onMounted(() => {
  if (form.value.url) {
    console.log(form.value.url);
    handleImport({ ...form.value });
  }
});

const hideForm = useIsChromeExtension();

async function handleImport(e: typeof form.value) {
  form.value = { ...e };
  if (!form.value.url) return;

  console.log(form);
  twitterCard.value.generate();
  // facebookCard.value.generate();
  generateImage(form.value.url);
}
</script>
<template>
  <div class="mx-5">
    <h1 v-if="!hideForm" class="text-4xl my-10">Social Media Post Generator</h1>
    <UrlForm v-if="!hideForm" v-bind="form" @submit="handleImport"></UrlForm>
    <div>
      <CardTwitter ref="twitterCard" v-bind="form" />
      <!-- <CardFacebook ref="facebookCard" v-bind="form" /> -->
      <CardImages :url="form.url" />
    </div>
  </div>
</template>