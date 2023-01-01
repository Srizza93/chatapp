<template>
  <div class="popup">
    <span class="close-button" @click="$emit('closeChat')">&times;</span>
    <div class="messages-container">
      <div
        class="message-container"
        v-for="(message, index) in chat.messages"
        :key="index + '-chat'"
      >
        <span class="message-container_sender">{{
          message.sender === userData.name ? "Me" : message.sender
        }}</span>
        <span
          class="message-container_text"
          v-bind:class="{ 'friend-message': message.sender !== userData.name }"
          >{{ message.text }}</span
        >
        <span class="message-container_date">{{
          parsedDate(message.date)
        }}</span>
      </div>
    </div>
    <div class="input-container">
      <input
        class="input-app input-container_input"
        v-bind:class="{ 'empty-input': !messageToBeSent }"
        type="text"
        placeholder="Write a message..."
        v-model="messageToBeSent"
        @keyup.enter="sendMessage"
      />
      <button
        v-if="this.messageToBeSent"
        class="submit-button send-button"
        @click="sendMessage"
      >
        Send
      </button>
    </div>
  </div>
</template>
<script>
import axios from "axios";

export default {
  name: "ChatPopup",
  data() {
    return {
      messageToBeSent: "",
      chat: {
        users: [],
        messages: [],
      },
    };
  },
  props: {
    userData: {
      type: Object,
      required: true,
    },
    friendData: {
      type: Object,
      required: true,
    },
  },
  mounted() {
    this.getChatFromDatabase();
  },
  methods: {
    async getChatFromDatabase() {
      const myChats = this.userData.chats;
      for (let i = 0; i < myChats.length; i++) {
        if (this.friendData.chats.includes(myChats[i])) {
          await axios
            .get("/api/chat/" + myChats[i])
            .then((response) => (this.chat = response.data))
            .catch(console.error);
          return;
        }
      }
      this.chat.users = this.chat.users.concat([
        this.userData._id,
        this.friendData._id,
      ]);
    },
    sendMessage() {
      if (this.messageToBeSent) {
        const messageData = {
          sender: this.userData.name,
          text: this.messageToBeSent,
          date: new Date(),
        };
        this.chat.messages.push(messageData);
        this.updateChatToDatabase();
        this.messageToBeSent = "";
      }
    },
    async updateChatToDatabase() {
      if (this.chat._id) {
        await axios
          .put(`/api/chat/${this.chat._id}`, {
            messages: this.chat.messages,
          })
          .catch(console.error);
        return;
      }
      await axios
        .post("/api/chat", this.chat)
        .then((response) => (this.chat._id = response.data._id));
      this.addChatIdToUsers();
    },
    async addChatIdToUsers() {
      const users = this.chat.users;
      for (let i = 0; i < users.length; i++) {
        await axios
          .post(`/api/users/${users[i]}/chats`, {
            chat: this.chat._id,
          })
          .catch(console.error);
      }
    },
    parsedDate(date) {
      date = new Date(date);
      const year = String(date.getFullYear());
      const month = String(date.getMonth() + 1).padStart(2, "0");
      const day = String(date.getDate()).padStart(2, "0");
      const hours = String(date.getHours()).padStart(2, "0");
      const minutes = String(date.getMinutes()).padStart(2, "0");
      return `${year}-${month}-${day} ${hours}:${minutes}`;
    },
  },
};
</script>
<style lang="scss" scoped>
.messages-container {
  display: flex;
  flex-direction: column;
  overflow: scroll;
}

.message-container {
  display: flex;
  flex-direction: column;
  padding-bottom: 20px;
  margin: 0 40px 20px 40px;
  border-bottom: 2px solid $primary-gray;
}

.message-container:last-child {
  border-bottom: none;
}

.input-container {
  display: flex;
  margin: 20px 40px 20px 40px;
}

.input-container_input {
  margin: 0;
  border-radius: 10px 0 0 10px;
}

.empty-input {
  border-radius: $standard-radius;
}

.message-container_text {
  padding: 20px 10px;
  border-radius: $standard-radius;
  background-color: $primary-color;
  color: white;
  font-weight: bold;
}

.friend-message {
  border: 2px solid $primary-color;
  background-color: white;
  color: $primary-color;
}

.message-container_date {
  margin: 5px 0;
  font-size: 12px;
  color: $text-gray;
}

.send-button {
  border-radius: 0 10px 10px 0;
}
</style>
