<template>
  <div id="app">
    <div class="loginPage">
      <h1 href="./">홍덕해듀오</h1>
      <div class="IDPW" style="margin-top:25%">
        <div class="ID">
          <p>아이디</p>
          <input v-model="id" placeholder="아이디를 입력해주세요">
        </div>
        <div class="PW">
          <p>비밀번호</p>
          <input type="password" v-model="password" placeholder="비밀번호를 입력해주세요">
        </div>
      </div>
      <div class="buttons">
        <div class="btn">
          <button v-on:click="login()" class="btn btn-success">로그인</button>
        </div>
        <div class="btn">
          <router-link to="/register" tag='button' class="btn btn-warning">회원가입</router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  name: 'loginPage',
  props: {
    title: String
  },
  data: function () {
    return {
      id: '',
      password: ''
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
    login: async function () {
      let res = await axios.post('/api/login', { id: this.id, pw: this.password });
      if(res.data.ok) {
        alert(res.data.msg);
        await this.$router.push('/mainPage');
      } else {
        alert(res.data.msg);
      }
    }
  }
}
</script>

<style>
  .ID,.PW {
    font-family: Avenir, Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
    margin-top: 10%;
  }
  .btn {
    margin-top: 10%;
    float: center;
  }
  #app {
    font-family: Avenir, Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
    margin-top: 60px;
  }
</style>
