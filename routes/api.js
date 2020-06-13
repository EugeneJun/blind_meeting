const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const fs = require('fs');

const DB = mongoose.createConnection('mongodb://localhost:27017/meeting', {useNewUrlParser: true, useUnifiedTopology: true });
/* GET users listing. */
router.post('/register', async function(req, res, next) {
  let exist_user = await DB.collection('users').findOne({id: req.body.id});
  if(exist_user){
    res.send({ok: 0, msg: "같은 아이디를 가진 유저가 이미 존재합니다"});
  } else {
    await DB.collection('users').insertOne({id: req.body.id, pw: req.body.pw});
    res.send({ok: 1, msg: "회원가입 성공!"});
  }
});

router.post('/login', async function(req, res, next) {
  console.log(req);
  let exist_user = await DB.collection('users').findOne({id: req.body.id, pw: req.body.pw});
  if(exist_user){
    res.send({ok: 1, msg: "로그인 성공!"});
  } else{
    res.send({ok: 0, msg: "로그인 실패.. 아이디나 비밀번호가 잘못되었습니다."});
  }
});

router.post('/get_imgs_list', async function(req, res, next) {
  let imgs = await fs.readdirSync('./public/images/');
  res.send({imgs});
});

module.exports = router;
