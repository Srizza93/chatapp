<template>
  <div class="popup">
    <span class="close-button" @click="$emit('closeChat')">&times;</span>
    <div class="messages-container">
      <div
        class="message-container"
        v-for="(message, index) in chat.messages"
        :key="index + '-chat'"
      >
        <span>{{ message.sender }}</span>
        <span>{{ message.text }}</span>
        <span>{{ message.date }}</span>
      </div>
    </div>
    <div>
      <input
        type="text"
        placeholder="Write a message..."
        v-model="messageToBeSent"
        @keyup.enter="sendMessage"
      />
      <button @click="sendMessage">Send</button>
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
    chatId: {
      type: String,
      required: false,
    },
    friendId: {
      type: String,
      required: false,
    },
  },
  computed: {
    user() {
      return this.$store.getters.userData;
    },
    users() {
      return this.$store.getters.usersList;
    },
  },
  mounted() {
    this.chatCreation();
  },
  methods: {
    async chatCreation() {
      if (this.chatId) {
        this.getChatFromDatabase();
        return;
      }

      this.chat.users = this.chat.users.concat([this.user._id, this.friendId]);

      this.updateChatToDatabase();
    },
    async getChatFromDatabase() {
      try {
        const response = await axios.get("/api/chat/" + this.chatId);
        this.chat = response.data;
      } catch (error) {
        console.log("Error in chat " + error);
      }
    },

    async updateChatToDatabase() {
      try {
        console.log(this.chat, this.chatId);
        const response = await axios.post("/api/chat", this.chat);

        for (let i = 0; i < this.chat.users.length; i++) {
          let newChat = {
            chat: [
              ...this.users.find((user) => user._id === this.chat.users[i])
                .chat,
            ],
          };
          newChat.chat.push(response.data._id);

          if (this.chat.users[i]._id === this.user._id) {
            this.$store.dispatch("updateUserToDatabase", [
              this.user._id,
              newChat,
            ]);
          }

          await axios.put("/api/users/" + this.chat.users[i], newChat);
        }
      } catch (error) {
        console.log("Error in chat " + error);
      }
    },
    sendMessage() {
      const messageData = {
        sender: this.user.name,
        text: this.messageToBeSent,
        date: new Date(),
      };

      this.chat.messages.push(messageData);

      this.updateChatToDatabase();
    },
  },
};
</script>
<style lang="scss">
.messages-container {
  display: flex;
  flex-direction: column;
}

.message-container {
  display: flex;
  flex-direction: column;
  margin: $standard-distance;
}
</style>
