<script setup lang="ts">
defineProps<{
  modelValue: number;
}>();
defineEmits<{
  (e: "update:modelValue", payload: number): void;
}>();
//modelValue - special syntax -check doc
</script>

<template>
  <input
    :value="modelValue"
    @input="$emit('update:modelValue', Number(($event.target as HTMLInputElement).value))"
    id="temperature"
    type="range"
    min="0"
    max="1"
    step="0.1"
    class="range range-accent"
  />
  <div class="w-full flex justify-between text-xs px-2">
    <span v-for="n in 11">{{ (n - 1) / 10 }}</span>
  </div>
  <div class="mt-2">
    <label for="temperature" class="mt-2">Temperature: {{ modelValue }}</label>
    <span class="font-bold" v-if="+modelValue >= 0.5">
      - More random, creative, and risky</span
    >
    <span class="font-bold" v-else>
      - More focused, deterministic, and safe</span
    >
  </div>
</template>

