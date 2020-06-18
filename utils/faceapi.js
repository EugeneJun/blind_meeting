const faceapi = require('face-api.js');
const canvas = require('canvas');
const { Canvas, Image, ImageData } = canvas;
const fs = require('fs');
const DB = require('../db/meeting').DB;

module.exports = {
  dist: {},
  init: async () => {
    faceapi.env.monkeyPatch({ Canvas, Image, ImageData });
    await faceapi.nets.ssdMobilenetv1.loadFromDisk('./utils/weights');
    await faceapi.nets.faceRecognitionNet.loadFromDisk('./utils/weights');
    let idol_imgs = await fs.readdirSync('./public/images/idol/').map(e => {return {name: e, uri: './public/images/idol/' + e}});
    if(idol_imgs[0].name === '.DS_Store') idol_imgs.shift();
    let people_imgs = await fs.readdirSync('./src/images/male/');
    if(people_imgs[0].name === '.DS_Store') people_imgs.shift();
    people_imgs = await Promise.all(people_imgs.map(async(e) => {return {name: e, uri: await fs.readFileSync('./src/images/male/' + e, {encoding: 'utf-8'})}}));
    idol_imgs = await Promise.all(idol_imgs.map(async (e) => {return {...e, aligned_img: await canvas.loadImage(e.uri)}}));
    people_imgs = await Promise.all(people_imgs.map(async (e) => {return {...e, aligned_img: await canvas.loadImage(e.uri)}}));
    // convert blobs (buffers) to HTMLImage elements
    idol_imgs = await Promise.all(idol_imgs.map(
      async (img) => {return {...img, discriptor: await faceapi.computeFaceDescriptor(img.aligned_img)}}
    ))
    people_imgs = await Promise.all(people_imgs.map(
      async (img) => {return {...img, discriptor: await faceapi.computeFaceDescriptor(img.aligned_img)}}
    ))
    idol_imgs.map(async (idol, i) => {
      let similar_people = [];
      people_imgs.map((person, j) => {
        let dist = faceapi.euclideanDistance(idol.discriptor, person.discriptor);
        people_imgs[j][idol.name] = dist;
        if(dist < 0.4){
          similar_people.push(person.name);
        }
      })
      await DB.collection('similar').updateOne({name: idol.name}, {$set: {name: idol.name, similar_people}}, {upsert: true});
    })
    console.log("이미지 similarity 업데이트 완료");
  },
  img_recognition_male: async (img_data) => {
    let st = new Date();
    console.log("start time:", st);
    faceapi.env.monkeyPatch({ Canvas, Image, ImageData });
    await faceapi.nets.ssdMobilenetv1.loadFromDisk('./utils/weights');
    await faceapi.nets.faceRecognitionNet.loadFromDisk('./utils/weights');
    let people_imgs = await fs.readdirSync('./src/images/male/');
    people_imgs = await Promise.all(people_imgs.map(async(e) => {return {name: e, uri: await fs.readFileSync('./src/images/male/' + e, {encoding: 'utf-8'})}}));
    if(people_imgs[0].name === '.DS_Store') people_imgs.shift();
    people_imgs = await Promise.all(people_imgs.map(async (e) => {return {...e, aligned_img: await canvas.loadImage(e.uri)}}));
    let wanted_img = {aligned_img: await canvas.loadImage(img_data)};
    people_imgs = await Promise.all(people_imgs.map(
      async (img) => {return {...img, discriptor: await faceapi.computeFaceDescriptor(img.aligned_img)}}
    ))
    wanted_img = {...wanted_img, discriptor: await faceapi.computeFaceDescriptor(wanted_img.aligned_img)};
    let similar_people = [];
    await Promise.all(people_imgs.map(async (person, i) => {
      let dist = await faceapi.euclideanDistance(person.discriptor, wanted_img.discriptor);
      wanted_img[person.name] = dist;
      if(dist < 0.5){
        similar_people.push({id: person.name, img: person.uri});
      }
    }));
    console.log(wanted_img);
    console.log("이미지 similarity 업데이트 완료", (new Date() - st) / 1000, 's');
    return similar_people[Math.floor((Math.random() * 10000)) % similar_people.length];
  },
  img_recognition_female: async (img_data) => {
    let st = new Date();
    console.log("start time:", st);
    faceapi.env.monkeyPatch({ Canvas, Image, ImageData });
    await faceapi.nets.ssdMobilenetv1.loadFromDisk('./utils/weights');
    await faceapi.nets.faceRecognitionNet.loadFromDisk('./utils/weights');
    let people_imgs = await fs.readdirSync('./src/images/female/');
    people_imgs = await Promise.all(people_imgs.map(async(e) => {return {name: e, uri: await fs.readFileSync('./src/images/female/' + e, {encoding: 'utf-8'})}}));
    if(people_imgs[0].name === '.DS_Store') people_imgs.shift();
    people_imgs = await Promise.all(people_imgs.map(async (e) => {return {...e, aligned_img: await canvas.loadImage(e.uri)}}));
    let wanted_img = {aligned_img: await canvas.loadImage(img_data)};
    people_imgs = await Promise.all(people_imgs.map(
      async (img) => {return {...img, discriptor: await faceapi.computeFaceDescriptor(img.aligned_img)}}
    ))
    wanted_img = {...wanted_img, discriptor: await faceapi.computeFaceDescriptor(wanted_img.aligned_img)};
    let similar_people = [];
    await Promise.all(people_imgs.map(async (person, i) => {
      let dist = await faceapi.euclideanDistance(person.discriptor, wanted_img.discriptor);
      wanted_img[person.name] = dist;
      if(dist < 0.5){
        similar_people.push({id: person.name, img: person.uri});
      }
    }));
    console.log(wanted_img);
    console.log("이미지 similarity 업데이트 완료", (new Date() - st) / 1000, 's');
    return similar_people[Math.floor((Math.random() * 10000)) % similar_people.length];
  },
}