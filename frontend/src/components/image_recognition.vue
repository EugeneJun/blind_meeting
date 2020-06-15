<template>
  <div class="registerPage">
    <b-dropdown id="dropdown" text="Menu">
      <b-dropdown-item>이미지 인식 소개팅</b-dropdown-item>
      <b-dropdown-item v-on:click="goto_mainPage_worldcup">이상형 월드컵</b-dropdown-item>
      <b-dropdown-item v-on:click="goto_chatList">채팅방</b-dropdown-item>
    </b-dropdown>
    <div style="grid-column-start: 1; grid-column-end: 3;">
      <h1 v-on:click="goto_main">홍덕해듀오</h1>
      <h4 style="margin-top:5%">사진 업로드</h4>
      <p style="margin-top:10%">원하는 이상형 사진을 업로드 해주세요!</p>
      <p style="margin-top:5%">AI를 통해 이상형의 얼굴과 가장 비슷한 사람을 찾아드립니다.</p>
    </div>
    <div style="grid-column-start: 1; grid-column-end: 3;">
      <div class="file-upload-form">
        <input type="file" @change="previewImage" accept="image/*">
      </div>
      <div class="image-preview" v-if="imageData.length > 0 && loading === false">
        <img class="preview" :src="imageData">
      </div>
      <div v-if="loading === true" class="loader"></div>
      <div style="margin-top:5%; grid-column-start: 1; grid-column-end: 3;" class="buttons">
        <div class="btn" style="margin-top: 2%">
          <button v-on:click="register" class="btn btn-warning">이상형 찾기</button>
        </div>
      </div>
    </div>
    <!-- Modal -->
    <b-modal id="bv-modal-example" hide-footer>
      <template v-slot:modal-title>
        닮은 사람 소개팅
      </template>
      <div class="d-block text-center">
        <h3>{{ this.modal_idol.split('.')[0] }}</h3>
        <img class="person" v-bind:src="'./images/people/' + this.modal_idol" />
      </div>
      <b-button class="mt-3" variant="success" block @click="insert_chatList(); $bvModal.hide('bv-modal-example')">받을래요!</b-button>
      <b-button class="mt-3" block @click="$bvModal.hide('bv-modal-example')">죄송합니다.</b-button>
    </b-modal>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  name: 'image_recognition',
  props: {
    title: String
  },
  data: function () {
    return {
      id: '',
      password: '',
      passwordCheck: '',
      imageData: '',
      loading: false,
      modal_idol: '',
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
    register: async function () {
      if (this.imageData) {
        this.loading = true;
        let res = await axios.post('/api/upload_img', { img: this.imageData });
        this.loading = false;
        this.modal_idol = res.data.matched_person;
        this.$bvModal.show('bv-modal-example')
      } else {
        alert('이미지를 먼저 업로드해주세요');
      }
    },
    // onChangeImages(e) {
    //   console.log(e.target.files)
    //   const file = e.target.files[0]; // Get first index in files
    //   this.imageUrl = URL.createObjectURL(file); // Create File URL
    // }
    previewImage: function(event) {
      // Reference to the DOM input element
      let input = event.target;
      // Ensure that you have a file before attempting to read it
      if (input.files && input.files[0]) {
        // create a new FileReader to read this image and convert to base64 format
        let reader = new FileReader();
        // Define a callback function to run, when FileReader finishes its job
        reader.onload = (e) => {
          // Note: arrow function used here, so that "this.imageData" refers to the imageData of Vue component
          // Read image as base64 and set to imageData
          this.imageData = e.target.result;
        }
        // Start the reader job - read file as a data url (base64 format)
        reader.readAsDataURL(input.files[0]);
      }
    },
    goto_main: async function() {
      await this.$router.push('/mainPage');
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
    goto_mainPage_worldcup: async function() {
      await this.$router.push('/mainPage_worldcup');
    },
  }
}
</script>

<style>
  .preview {
    margin-top: 5%;
    max-width: 50%;
    max-height: 50%;
  }
  .registerPage {
    display: grid;
    grid-template-columns: 50% 50%;
    grid-template-rows: 10% 31% 59%;
    font-family: Avenir, Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
    height: 100vh;
  }
  #dropdown{
    margin-left: -40%;
    padding: 1px 1px;
    display: inline-block;
  }
  .loader {
    border: 16px solid #f3f3f3; /* Light grey */
    border-top: 16px solid #3498db; /* Blue */
    border-radius: 50%;
    margin-left:35vw;
    width: 120px;
    height: 120px;
    animation: spin 2s linear infinite;
  }
  @keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }
</style>
