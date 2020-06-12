<template>
  <div id="main">
    <div id="title">
      <h1>오늘의 이상형 월드컵</h1>
    </div>
    <div id="left_idol" v-on:click="select_left()">
      <img v-bind:src="'./images/' + this.left" />
    </div>
    <div id="right_idol" v-on:click="select_right()">
      <img v-bind:src="'./images/' + this.right" />
    </div>
    <div id="bottom">아랫부분</div>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  name: 'mainPage',
  props: {
    title: String
  },
  data: function () {
    return {
      right: '',
      left: '',
      images: [],
      seleted_idol: [],
    }
  },
  created: async function () {
    // `this` points to the vm instance
    let res = await axios.post('http://49.247.128.56:3000/get_imgs_list');
    this.images = res.data.imgs.slice(1, res.data.imgs.length);
    this.right = this.get_random_img();
    this.left = this.get_random_img();
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
      let idx = Math.floor(Math.random() * Math.floor(this.images.length)) - 1;
      console.log("11:", this.images[idx]);
      return this.images.splice(idx, 1);
    },
    select_left: async function () {
      this.seleted_idol.push(this.left);
      if(this.images.length === 0){
        this.images = this.seleted_idol;
        this.seleted_idol = [];
      }
      this.left = await this.get_random_img();
      this.right = await this.get_random_img();
    },
    select_right: async function () {
      this.seleted_idol.push(this.right);
      if(this.images.length === 0){
        this.images = this.seleted_idol;
        this.seleted_idol = [];
      }
      this.left = await this.get_random_img();
      this.right = await this.get_random_img();
    }
  }
}
</script>

<style>
  h1{
    margin-top: 60px;
  }
  #left_idol, #right_idol{
    font-family: Avenir, Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    writing-mode: vertical-lr;
    background-color: gray;
    color: #2c3e50;
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
    background-color: brown;
  }
  #main {
    display: grid;
    grid-template-columns: 50% 50%;
    grid-template-rows: 25% 45% 30%;
    font-family: Avenir, Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    height: 100vh;
    color: #2c3e50;
  }
  img {
    vertical-align: middle;
    max-width:100%;
  }
</style>
