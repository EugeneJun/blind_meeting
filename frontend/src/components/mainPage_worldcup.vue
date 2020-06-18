<template>
  <div id="main">
    <b-dropdown id="dropdown" variant="primary" text="Menu">
      <b-dropdown-item v-on:click="goto_image_recognition">이미지 인식 소개팅</b-dropdown-item>
      <b-dropdown-item>이상형 월드컵</b-dropdown-item>
      <b-dropdown-item v-on:click="goto_chatList">채팅방</b-dropdown-item>
    </b-dropdown>
    <b-button id="logout" variant="danger" v-on:click="logout">로그아웃</b-button>
    <div id="title">
      <h1 v-on:click="goto_main">오늘의 이상형 월드컵</h1>
      <div>{{ this.id }}님 환영합니다!</div>
    </div>
    <div id="round">{{ this.round }}</div>
    <div v-if="round_num > 1" id="left_idol" v-on:click="select_left()">
      <img class="rank" v-bind:src="'./images/idol/' + this.left" />
    </div>
    <div v-if="round_num > 1" id="right_idol" v-on:click="select_right()">
      <img class="rank" v-bind:src="'./images/idol/' + this.right" />
    </div>
    <div v-if="round_num === 1" id="winner">
      <img class="rank" v-on:click="get_similar_person(winner)" v-bind:src="'./images/idol/' + this.winner" />
    </div>
    <div id="bottom">
      <h6>역대 우승자</h6>
      <ul>
        <li v-for="pre_winner in winners_list">
            <img class="winner" v-on:click="get_similar_person(pre_winner)" v-bind:src="'./images/idol/' + pre_winner" />
        </li>
      </ul>
    </div>
    <!-- Modal -->
    <b-modal id="bv-modal-example" hide-footer>
      <template v-slot:modal-title>
        닮은 사람 소개팅
      </template>
      <div class="d-block text-center">
        <h3>{{ this.modal_idol.id }}</h3>
        <img class="person" v-bind:src="this.modal_idol.img" />
      </div>
      <b-button class="mt-3" variant="success" block @click="insert_chatList(); $bvModal.hide('bv-modal-example')">받을래요!</b-button>
      <b-button class="mt-3" block @click="$bvModal.hide('bv-modal-example')">죄송합니다.</b-button>
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
  name: 'mainPage_worldcup',
  props: {
    title: String
  },
  data: function () {
    return {
      id: '',
      right: '',
      left: '',
      winner: '',
      round_num: 16,
      round: '16 강',
      modal_idol: '',
      images: [],
      seleted_idol: [],
      winners_list: [],
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
    res = await axios.post('/api/get_imgs_list');
    this.images = res.data.imgs;
    this.right = await this.get_random_img();
    this.left = await this.get_random_img();
    res = await axios.post('/api/get_winners_list');
    this.winners_list = res.data.winners_list;
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
    get_random_img: async function () {
      let idx = Math.floor(Math.random() * 100) % this.images.length;
      console.log("11:", this.images[idx]);
      return this.images.splice(idx, 1)[0];
    },
    select_left: async function () {
      this.seleted_idol.push(this.left);
      if(this.images.length === 0){
        this.round_num /= 2;
        if(this.round_num === 1){
          this.round = '우승';
          this.winner = this.left;
          await axios.post('/api/insert_winner', {winner: this.winner});
        }
        else if(this.round_num === 2){
          this.round = '준우승';
        } else {
          this.round = `${this.round_num}강`
        }
        this.images = this.seleted_idol;
        this.seleted_idol = [];
      }
      this.left = await this.get_random_img();
      this.right = await this.get_random_img();
    },
    select_right: async function () {
      this.seleted_idol.push(this.right);
      if(this.images.length === 0){
        this.round_num /= 2;
        if(this.round_num === 1){
          this.round = '우승';
          this.winner = this.right;
          await axios.post('/api/insert_winner', {winner: this.winner});
        }
        else if(this.round_num === 2){
          this.round = '준우승';
        } else {
          this.round = `${this.round_num}강`
        }
        this.images = this.seleted_idol;
        this.seleted_idol = [];
      }
      this.left = await this.get_random_img();
      this.right = await this.get_random_img();
    },
    get_similar_person: async function (pre_winner) {
      let res = await axios.post('/api/get_similar_person', {winner: pre_winner});
      if(res.data.ok){
        this.modal_idol = res.data.matched_person;
        console.log(res.data.matched_person);
        this.$bvModal.show('bv-modal-example')
      } else {
        alert(res.data.msg);
      }
    },
    insert_chatList: async function() {
      let res = await axios.post('/api/insert_chatList', {id: this.id, person: this.modal_idol.split('.')[0]});
      if(res.data.ok){
        alert(`${this.modal_idol.split('.')[0]}님이 대화상대에 추가되었습니다!`);
      } else {
        alert("대화상대에 추가에 실패하였습니다..");
      }
    },
    goto_chatList: async function() {
      await this.$router.push('/chatList');
    },
    goto_main: async function() {
      await this.$router.push('/mainPage');
    },
    goto_image_recognition: async function() {
      await this.$router.push('/image_recognition');
    },
    logout: async function() {
      await axios.get('/api/logout');
      await this.$router.push('/login');
    }
  }
}
</script>

<style>
  #left_idol, #right_idol{
    font-family: Avenir, Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    writing-mode: vertical-lr;
    align-content: center;
    color: #2c3e50;
  }
  #winner{
    grid-column-start: 1;
    grid-column-end: 3;
    font-family: Avenir, Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
  }
  #round{
    font-size: 30px;
    grid-column-start: 1;
    grid-column-end: 3;
  }
  #title {
    grid-column-start: 1;
    grid-column-end: 3;
    font-family: Avenir, Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }
  #bottom {
    grid-column-start: 1;
    grid-column-end: 3;
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
    margin-left: -59%;
    padding: 1px 1px;
    display: inline-block;
  }
  ul {
    -webkit-padding-start: 0px;
    list-style:none;
    white-space:nowrap;
    overflow-x: auto;
  }
  li {
    margin-right: 3px;
    flaot: left;
    display:inline-block;
  }
  img.rank {
    horiz-align: center;
    vertical-align: middle;
    max-width:100%;
    max-height:100%;
  }
  img.winner, img.person {
    max-height: 180px;
  }
  b-navbar, #navbar-toggle-collapse {
    background-color: white;
  }
  img:hover {
    background-color: grey;
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
