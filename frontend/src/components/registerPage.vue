<template>
  <div id="app">
    <div class="registerPage">
      <h1 v-on:click="goto_home">홍덕해듀오</h1>
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
        <div class="sex" style="margin-top: 5%">
          <b-form-group label="소개받기 원하는 성별을 골라주세요">
            <b-form-checkbox-group
                    id="checkbox-group-1"
                    v-model="sex"
                    :options="options"
                    name="flavour-1"
            ></b-form-checkbox-group>
          </b-form-group>
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
        { text: '남자', value: '남자' },
        { text: '여자', value: '여자' },
      ],
      sex: '',
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
        console.log(this.selected);
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
    goto_home: async function () {
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
  .btn {
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
