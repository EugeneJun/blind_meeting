<template>
  <div id="main">
    <b-dropdown id="dropdown" text="Menu">
      <b-dropdown-item v-on:click="goto_image_recognition">이미지 인식 소개팅</b-dropdown-item>
      <b-dropdown-item v-on:click="goto_mainPage_worldcup">이상형 월드컵</b-dropdown-item>
      <b-dropdown-item v-on:click="goto_chatList">채팅방</b-dropdown-item>
    </b-dropdown>
    <div id="title">
      <h1>홍덕해듀오</h1>
      <div>{{ this.id }}님 환영합니다!</div>
      <div>원하시는 방법을 선택해주세요!</div>
    </div>
    <div id="imageRecognition" v-on:click="imageRecognition()">
      <img class="menu" v-bind:src="'./images/' + 'imageRecognition.png'"/>
    </div>
    <div id="worldcupRecognition" v-on:click="worldcupRecognition()">
      <img class="menu" v-bind:src="'./images/' + 'worldcupRecognition.png'"/>
    </div>
  </div>
</template>

<script>
import axios from 'axios'

history.pushState(null, null, location.href);
window.onpopstate = function () {
  history.go(1);
};

export default {
  name: 'mainPage',
  props: {
    title: String
  },
  data: function () {
    return {
      id: '',
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
    imageRecognition: async function () {
      await this.$router.push('/image_recognition');
    },
    worldcupRecognition: async function () {
      await this.$router.push('/mainPage_worldcup');
    },
    goto_chatList: async function() {
      await this.$router.push('/chatList');
    },
    goto_image_recognition: async function() {
      await this.$router.push('/image_recognition');
    },
    goto_mainPage_worldcup: async function() {
      await this.$router.push('/mainPage_worldcup');
    }
  }
}
</script>

<style>
  #title {
    grid-column-start: 1;
    grid-column-end: 3;
    font-family: Avenir, Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }
  #main {
    display: grid;
    grid-template-columns: 50% 50%;
    grid-template-rows: 10% 13% 5% 43% 29%;
    font-family: Avenir, Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    height: 100vh;
    color: #2c3e50;
  }
  #dropdown{
    margin-left: -40%;
    padding: 1px 1px;
    display: inline-block;
  }
  img.menu{
    margin-top: 30%;
    max-width: 100%;
  }
</style>
