<template>
  <div id="app">
    <div class="loginPage">
      <h1>홍덕해듀오</h1>
      <h4 style="margin-top:5%">회원가입</h4>
      <div class="IDPW" style="margin-top:15%">
        <div class="ID">
          <p>아이디</p>
          <input v-model="id" placeholder="아이디를 입력해주세요">
        </div>
        <div class="PW">
          <p>비밀번호</p>
          <input type="password"  v-model="password" placeholder="비밀번호를 입력해주세요">
        </div>
        <div class="PWCheck">
          <p>비밀번호 확인</p>
          <input type="password"  v-model="passwordCheck" placeholder="비밀번호를 입력해주세요">
        </div>
      </div>
      <div class="buttons">
        <div class="btn">
          <button v-on:click="register" class="btn btn-warning">회원가입</button>
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
      password: '',
      passwordCheck: ''
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
    register: async function () {
      if (this.password === this.passwordCheck) {
        let res = await axios.post('http://49.247.128.56:3000/users/register', { id: this.id, pw: this.password })
        alert(res.data.msg);
        if(res.data.ok){
          await this.$router.push('/login');
        }
      } else {
        alert('입력한 비밀번호가 서로 다릅니다')
      }
    }
  }
}
</script>

<style>
  .ID,.PW,.PWCheck {
    font-family: Avenir, Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
    margin-top: 5%;
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
