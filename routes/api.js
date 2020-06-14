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
    await DB.collection('users').insertOne({id: req.body.id, pw: req.body.pw});
    res.send({ok: 1, msg: "회원가입 성공!"});
  }
});

router.post('/login', async function(req, res, next) {
  let exist_user = await DB.collection('users').findOne({id: req.body.id, pw: req.body.pw});
  if(exist_user){
    req.session.user = {
      id: req.body.id,
      pw: req.body.pw,
      authorized: true
    };
    res.send({ok: 1, msg: "로그인 성공!"});
  } else{
    res.send({ok: 0, msg: "로그인 실패.. 아이디나 비밀번호가 잘못되었습니다."});
  }
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

router.post('/get_similar_person', async function(req, res) {
  let exist_user = await DB.collection('similar').findOne({name: req.body.winner});
  let similar_people = exist_user.similar_people;
  if(similar_people && similar_people[0]) {
    res.send({ok: 1, person: similar_people[Math.floor(Math.random() * 1000) % similar_people.length]});
  }
  else {
    res.send({ok: 0, msg: "죄송합니다.. 닮은 사람이 존재하지 않습니다."});
  }
});

router.post('/get_winners_list', async function(req, res) {
  let exist_user = await DB.collection('users').findOne({id: req.session.user.id});
  res.send({winners_list: exist_user.winners})
});

module.exports = router;
