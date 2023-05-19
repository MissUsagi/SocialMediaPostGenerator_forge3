<script setup lang="ts">
const props = defineProps<{
  url: string;
  temperature: number;
}>();

defineEmits(["submit"]);

const form = reactive({
  url: props.url,
  temperature: props.temperature,
});
</script>

<template>
  <form @submit.prevent="$emit('submit', form)" class="mb-10">
    <div class="flex mb-5 input-group">
      <input
        v-model="form.url"
        type="text"
        placeholder="Full Article URL"
        class="input input-bordered input-accent w-full"
      />
      <button type="submit" class="btn btn-accent">
        Generate Announcements
      </button>
    </div>
    <TemperatureSelector v-model="form.temperature" />
  </form>
</template>