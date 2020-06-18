const express = require('express');
const router = express.Router();
const faceapi = require('../utils/faceapi');
const fs = require('fs');
const DB = require('../db/meeting').DB;

faceapi.init();
/* GET users listing. */
router.post('/register', async function(req, res, next) {
  let exist_user = await DB.collection('users').findOne({id: req.body.id});
  if(exist_user){
    res.send({ok: 0, msg: "같은 아이디를 가진 유저가 이미 존재합니다"});
  } else {
    await DB.collection('users').insertOne({id: req.body.id, pw: req.body.pw, sex: req.body.sex});
    console.log(req.body.sex);
    req.session.user = {
      id: req.body.id,
      pw: req.body.pw,
      sex: req.body.sex,
      authorized: true
    };
    res.send({ok: 1, msg: "회원가입 성공!"});
  }
});

router.post('/login', async function(req, res, next) {
  let exist_user = await DB.collection('users').findOne({id: req.body.id, pw: req.body.pw});
  if(exist_user){
    req.session.user = {
      id: req.body.id,
      pw: req.body.pw,
      sex: exist_user.sex,
      authorized: true
    };
    res.send({ok: 1, msg: "로그인 성공!"});
  } else{
    res.send({ok: 0, msg: "로그인 실패.. 아이디나 비밀번호가 잘못되었습니다."});
  }
});

router.get('/logout', async function(req, res, next) {
  req.session.destroy();
  res.send({ok: 1});
});

router.post('/get_id', async function(req, res, next) {
  if(req.session.user){
    res.send({ok: 1, id: req.session.user.id});
  } else{
    res.send({ok: 0, msg: "로그인을 해주십시오!"});
  }
});

router.post('/get_imgs_list', async function(req, res, next) {
  let imgs = await fs.readdirSync('./public/images/idol/');
  res.send({imgs});
});

router.post('/insert_winner', async function(req, res) {
  let exist_user = await DB.collection('users').findOne({id: req.session.user.id});
  let winners = [req.body.winner];
  if(exist_user.winners) {
    winners = winners.concat(exist_user.winners);
  }
  DB.collection('users').updateOne({_id: exist_user._id}, {$set: {winners}});
});

router.post('/upload_img', async function(req, res) {
  try{
    if(~req.session.user.sex.indexOf('male')) {
      await fs.writeFileSync(`./src/images/male/${req.session.user.id}`, req.body.img);
    }
    if(~req.session.user.sex.indexOf('female')) {
      await fs.writeFileSync(`./src/images/female/${req.session.user.id}`, req.body.img);
    }
    res.send({ok: 1, msg: '이미지 업로드에 성공하였습니다!'});
  } catch(e) {
    res.send({ok: 0, msg: e});
  }
});

router.post('/img_recognition', async function(req, res) {
  let matched_person = '';
  console.log(req.session.user.sex);
  if(~req.session.user.sex.indexOf('male')) {
    matched_person = await faceapi.img_recognition_female(req.body.img);
  } else {
    matched_person = await faceapi.img_recognition_male(req.body.img);
  }
  if(matched_person)
    res.send({ok: 1, matched_person});
  else
    res.send({ok: 0, msg: '닮은 사람을 찾는 것을 실패했습니다 ㅜ'});
});

router.post('/get_chatList', async function(req, res) {
  let data = await DB.collection('chatList').findOne({id: req.body.id});
  res.send({ok: 1, chatList: data.chatList});
});

router.post('/insert_chatList', async function(req, res) {
  let chatList = await DB.collection('chatList').findOne({id: req.body.id});
  if(chatList && chatList.chatList) chatList = chatList.chatList.concat(req.body.person);
  else chatList = [req.body.person];
  await DB.collection('chatList').updateOne({id: req.body.id}, {$set: {chatList}}, {upsert: true});
  res.send({ok: 1});
});

router.post('/get_similar_person', async function(req, res) {
  let exist_user = await DB.collection('similar').findOne({name: req.body.winner});
  let similar_people = exist_user.similar_people;
  if(similar_people && similar_people[0]) {
    let person = similar_people[Math.floor(Math.random() * 1000) % similar_people.length];
    let img = await fs.readFileSync('./src/images/male/' + person, {encoding: 'utf-8'})
    res.send({ok: 1, matched_person: {id: person, img}});
  }
  else {
    res.send({ok: 0, msg: "죄송합니다.. 닮은 사람이 존재하지 않습니다."});
  }
});

router.post('/get_winners_list', async function(req, res) {
  let exist_user = await DB.collection('users').findOne({id: req.session.user.id});
  res.send({winners_list: exist_user.winners})
});

router.post('/deleteChat', async function(req, res) {
  let chatList = await DB.collection('chatList').findOne({id: req.session.user.id});
  chatList.chatList.splice(chatList.chatList.indexOf(req.body.person), 1);
  await DB.collection('chatList').updateOne({id: req.session.user.id}, {$set: {chatList:chatList.chatList}});
  res.send({ok: 1});
});

module.exports = router;
