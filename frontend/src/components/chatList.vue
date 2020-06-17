<template>
  <div id="main">
    <b-dropdown id="dropdown" variant="primary" text="Menu">
      <b-dropdown-item v-on:click="goto_image_recognition">이미지 인식 소개팅</b-dropdown-item>
      <b-dropdown-item v-on:click="goto_mainPage_worldcup">이상형 월드컵</b-dropdown-item>
      <b-dropdown-item>채팅방</b-dropdown-item>
    </b-dropdown>
    <b-button id="logout" variant="danger" v-on:click="logout">로그아웃</b-button>
    <div id="title">
      <h1 v-on:click="goto_main">상대 리스트</h1>
      <div style="margin-bottom:50px;">{{ this.id }}님 환영합니다!</div>
      <ul class="list-group">
        <li class="list-group-item" v-for="chat in chatList">
          <div style="float:left">{{ chat.split('.')[0] }}</div>
          <div style="float:right">
            <button class="btn btn-outline-secondary" type="button" id="startchat" v-on:click="person = chat; $bvModal.show('bv-modal-example')">채팅하기</button>
            <button class="btn btn-outline-secondary" type="button" id="deletechat" v-on:click="deleteChat(chat)">삭제</button>
          </div>
        </li>
      </ul>
    </div>
    <!-- Modal -->
    <b-modal id="bv-modal-example" hide-footer>
      <template v-slot:modal-title>
        채팅방
      </template>
      <div class="d-block text-center">
        <h3>{{ this.person }}</h3>
      </div>
      <div>
        <b-form-textarea
                id="textarea"
                v-model="chat.join('\n')"
                rows="3"
                max-rows="6"
        ></b-form-textarea>
      </div>
      <div class="input-group mb-3">
        <input type="text" class="form-control" v-model="message" placeholder="메시지를 입력하세요." aria-label="Recipient's username" aria-describedby="button-addon2">
        <div class="input-group-append">
          <button class="btn btn-outline-secondary" type="button" id="button-addon2" v-on:click="chat.push(message); message = '';">전송</button>
        </div>
      </div>
    </b-modal>
  </div>
</template>

<script>
import axios from 'axios'

history.pushState(null, null, location.href);
window.onpopstate = function () {
  history.go(1);
};

export default {
  name: 'chatList',
  props: {
    title: String
  },
  data: function () {
    return {
      id: '',
      chatList: [],
      chat: [],
      person: '',
      message: '',
    }
  },
  created: async function () {
    // `this` points to the vm instance
    let res = await axios.post('/api/get_id');
    if(res.data.ok) this.id = res.data.id;
    else {
      alert(res.data.msg);
      await this.$router.push('/login');
    }
    res = await axios.post('/api/get_chatList', {id: this.id});
    this.chatList = res.data.chatList;
  },
  sockets: {
    connect: function () {
      console.log('socket connected')
    },
    customEmit: function (data) {
      console.log('this method was fired by the socket server. eg: io.emit("customEmit", data)')
    }
  },
  methods: {
    goto_main: async function() {
      await this.$router.push('/mainPage');
    },
    goto_image_recognition: async function() {
      await this.$router.push('/image_recognition');
    },
    goto_mainPage_worldcup: async function() {
      await this.$router.push('/mainPage_worldcup');
    },
    deleteChat: async function(person) {
      await axios.post('/api/deleteChat', {person});
      let res = await axios.post('/api/get_chatList', {id: this.id});
      this.chatList = res.data.chatList;
      alert("삭제 되었습니다");
    },
    logout: async function() {
      await axios.get('/api/logout');
      await this.$router.push('/login');
    }
  }
}
</script>

<style>
  #title {
    font-family: Avenir, Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }
  #main {
    font-family: Avenir, Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    height: 100vh;
    color: #2c3e50;
  }
  #dropdown {
    margin-left: -59%;
    padding: 1px 1px;
    display: inline-block;
  }
  #deletechat {
    margin-left: 2%;
  }
  .txt {
    height: 50%;
  }
  #logout{
    margin-top:1%;
    margin-left:49%;
    max-width:50%;
    max-height:50%;
    padding: 1px 1px;
    display: inline-block;
  }
</style>
