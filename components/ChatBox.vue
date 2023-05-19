<script setup lang="ts">
import { nanoid } from "nanoid";
import { Message, User } from "~~/types";

const props = withDefaults(
  defineProps<{
    messages: Message[];
    users: User[];
    me: User;
    usersTyping?: User[]; //? non-required
  }>(),
  {
    usersTyping: () => [],
  }
);

const usersTypingText = computed(() => {
  if (!props.usersTyping.length) return "";
  if (props.usersTyping.length === 1) {
    return `${props.usersTyping[0].name} is typing...`;
  } else
    return `${props.usersTyping
      .map((user) => user.name)
      .join(", ")} are typing`;
});

const emit = defineEmits<{
  (event: "newMessage", newMessage: Message): void;
}>();

const showChat = ref(false);

function getUser(id: string) {
  return props.users.find((user) => user.id === id);
}

const messageBox = ref<HTMLElement>(); //ref scrollujący nowe wiadomości
watch(
  () => props.messages.length,
  async () => {
    await nextTick();
    if (messageBox.value) {
      messageBox.value.scrollTop = messageBox.value.scrollHeight;
    }
  }
);

const textMessage = ref("");
function sendMessage() {
  emit("newMessage", {
    id: nanoid(),
    userId: props.me.id,
    createdAt: new Date(),
    text: textMessage.value,
  });
  textMessage.value = ""; //after sending, set as empty :V
}
</script>

<template>
  <div class="fixed bottom-[10px] right-[10px]">
    <button
      v-show="!showChat"
      class="bg-indigo-500 p-3 rounded"
      data-test="chat-toggle-btn"
    >
      <IconChat class="w-8 h-8 text-white" @click="showChat = !showChat" />
    </button>
    <div
      v-if="showChat"
      class="box w-[450px] bg-slate-100 dark:bg-gray-800 rounded"
      data-test="chat-widget-content"
    >
      <header
        class="bg-slate-50 dark:bg-gray-900 px-4 flex justify-between items-center"
      >
        Customer Support Chat
        <button class="p-4 pr-0" @click="showChat = false">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke-width="1.5"
            stroke="currentColor"
            class="w-6 h-6"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M19.5 8.25l-7.5 7.5-7.5-7.5"
            />
          </svg>
        </button>
      </header>

      <div ref="messageBox" class="messages p-4 overflow-y-scroll max-h-[80vh]">
        <div v-if="!messages.length" class="text-center w-[350px] m-auto">
          <strong class="text-lg">Chat with Botman!</strong>
          <p>Our A.I. powered assistant</p>
          <strong class="block mt-10">Go ahead and ask us something:</strong>
          <ul class="list-inside list-disc text-left">
            <li>What is social media post generator?</li>
            <li>How can I get human support?</li>
            <li>How was this tool built?</li>
          </ul>
        </div>
        <ChatBubble
          data-test="chat-bubble"
          v-for="message in messages"
          :key="message.id"
          :user="getUser(message.userId)"
          :message="message"
        />
        <ChatBubble v-for="user in usersTyping" :user="user">
          <AppLoading></AppLoading
        ></ChatBubble>
      </div>
      <footer class="p-4">
        <div v-if="usersTyping.length > 0" class="h-6 px-2 text-sm italic">
          {{ usersTypingText }}
        </div>
        <input
          @keypress.enter.exact.prevent="sendMessage"
          v-model="textMessage"
          type="text"
          placeholder="Type your message"
          class="p-2 mt-6 input w-full block input-bordered input-primary"
          data-test="chat-input"
        />
      </footer>
    </div>
  </div>
</template>


