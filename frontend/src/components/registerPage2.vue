<template>
  <div class="registerPage2">
    <div style="grid-column-start: 1; grid-column-end: 3; margin-top: 12%">
      <h1 v-on:click="goto_login">홍덕해듀오</h1>
      <h4 style="margin-top:5%">사진 업로드</h4>
      <p style="margin-top:10%">자신의 사진을 업로드 해주세요!</p>
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
          <button v-on:click="img_upload" class="btn btn-warning">사진 업로드</button>
        </div>
      </div>
    </div>
    <!-- Modal -->
  </div>
</template>

<script>
import axios from 'axios'

export default {
  name: 'registerPage2',
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
    img_upload: async function () {
      if (this.imageData) {
        this.loading = true;
        let res = await axios.post('/api/upload_img', { img: this.imageData });
        this.loading = false;
        await this.$router.push('/mainPage');
        alert(res.data.msg);
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
    insert_chatList: async function() {
      let res = await axios.post('/api/insert_chatList', {id: this.id, person: this.modal_idol.split('.')[0]});
      if(res.data.ok){
        alert(`${this.modal_idol.split('.')[0]}님이 대화상대에 추가되었습니다!`);
      } else {
        alert("대화상대에 추가에 실패하였습니다..");
      }
    },
    goto_login: async function() {
      await this.$router.push('/login');
    }
  }
}
</script>

<style>
  .preview {
    margin-top: 5%;
    max-width: 50%;
    max-height: 50%;
  }
  .registerPage2 {
    display: grid;
    grid-template-columns: 50% 50%;
    grid-template-rows: 32% 50%;
    font-family: Avenir, Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
    height: 100vh;
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
