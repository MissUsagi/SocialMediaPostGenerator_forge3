<script setup lang="ts">
import { Message, User } from "~~/types";
//@ts-expect-error: no types
import Markdown from "vue3-markdown-it";
const props = defineProps<{
  user?: User;
  message?: Message;
}>();

const sentDate = useTimeAgo(() => props.message?.createdAt ?? new Date());
</script>


<template>
  <div
    class="chat"
    :class="message?.userId === 'user' ? 'chat-end' : 'chat-start'"
  >
    <div class="chat-header">
      {{ user?.name }}
      &nbsp;
      <time class="text-xs opacity-50">{{ sentDate }} </time>
    </div>
    <div class="chat-image avatar">
      <div class="w-10 rounded-full">
        <img :src="user?.avatar" />
      </div>
    </div>
    <div
      class="chat-bubble"
      data-test="chat-bubble-text"
      :class="
        message?.userId === 'user'
          ? 'chat-bubble-primary'
          : 'chat-bubble-secondary'
      "
    >
      <Markdown v-if="message" :source="message.text" class="w-full" />
      <slot v-else />
    </div>
  </div>
</template>

