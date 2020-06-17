<template>
  <div class="registerPage">
    <div style="grid-column-start: 1; grid-column-end: 3;">
      <h1 v-on:click="goto_login">홍덕해듀오</h1>
      <h4 style="margin-top:5%">회원가입</h4>
    </div>
    <div class="IDPW" style="grid-column-start: 1; grid-column-end: 3;">
      <div class="ID">
        <p>아이디</p>
        <input v-model="id" placeholder="아이디를 입력해주세요">
      </div>
      <div class="PW">
        <p>비밀번호</p>
        <input type="password" v-model="password" placeholder="비밀번호를 입력해주세요">
      </div>
      <div class="PWCheck">
        <p>비밀번호 확인</p>
        <input type="password" v-model="passwordCheck" placeholder="비밀번호를 입력해주세요">
      </div>
      <div class="sex" style="margin-top: 5%; grid-column-start: 1; grid-column-end: 3;">
        <b-form-group label="자신의 성별을 골라주세요">
          <b-form-checkbox-group
                  id="checkbox-group-1"
                  v-model="sex"
                  :options="options"
                  name="flavour-1"
          ></b-form-checkbox-group>
        </b-form-group>
      </div>
    </div>
    <div class="buttons" style="grid-column-start: 1; grid-column-end: 3;">
      <div class="btn">
        <button v-on:click="register" class="btn btn-warning">회원가입</button>
      </div>
    </div>
  </div>
</template>

<script>
  import axios from 'axios'

  export default {
  name: 'registerPage',
  props: {
    title: String
  },
  data: function () {
    return {
      id: '',
      password: '',
      passwordCheck: '',
      options: [
        { text: '남자', value: 'male' },
        { text: '여자', value: 'female' },
      ],
      sex: [],
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
      if (this.id && this.password === this.passwordCheck) {
        let res = await axios.post('/api/register', { id: this.id, pw: this.password, sex: this.sex })
        alert(res.data.msg);
        if(res.data.ok){
          await this.$router.push('/register2');
        }
      } else if(this.password !== this.passwordCheck) {
        alert('입력한 비밀번호가 서로 다릅니다')
      } else if(!this.id) {
        alert('아이디를 입력해주세요')
      }
    },
    goto_login: async function() {
      await this.$router.push('/login');
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
  .registerPage {
    display: grid;
    grid-template-columns: 50% 50%;
    grid-template-rows: 15% 50% 5%;
    margin-top:15%;
    font-family: Avenir, Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    height: 100vh;
    color: #2c3e50;
  }
</style>
