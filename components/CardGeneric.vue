<script setup lang="ts">
import type { AsyncState } from "~~/types";
const props = defineProps<{
  title?: string;
  body?: string;
  state?: AsyncState;
}>();

defineEmits<{
  (e: "update:body", payload: string): void;
}>();

const textarea = ref();

watch(
  () => props.body,
  () => {
    nextTick(() => {
      if (!textarea.value) return;
      textarea.value.style.height = "";
      textarea.value.style.height = textarea.value.scrollHeight + "px";
    });
  }
);

const isError = computed(() => props.state === "error");
const isLoading = computed(() => props.state === "loading");
</script>
<template>
  <div
    class="card bg-base-100 shadow-xl w-full border-t-4 border-t-indigo-500 mt-10"
  >
    <div class="card-body m-1">
      <h2 class="card-title text-2xl font-bold py-2">
        <slot name="title">{{ title }}</slot>
        <AppLoading v-if="isLoading" />
        <span v-if="isError" class="text-red-500 text-sm font-normal">
          Error generating announcement
        </span>
      </h2>

      <div>
        <hr class="h-[1px] my-2 bg-indigo-500 border-0 dark:bg-indigo-500" />
        <div>
          <slot name="body">
            <textarea
              ref="textarea"
              v-if="body"
              class="w-full bg-transparent font-sans text-lg resize-none mb-5 p-2"
              :value="body"
              @input="
                $emit(
                  'update:body',
                  ($event.target as HTMLTextAreaElement)?.value || ''
                )
              "
            ></textarea>
            <div v-else>
              <span class="italic opacity-80"
                >Import an article to generate an announcement</span
              >
            </div>
          </slot>
        </div>
      </div>

      <div class="card-actions justify-end">
        <slot></slot>
      </div>
    </div>
  </div>
</template>


