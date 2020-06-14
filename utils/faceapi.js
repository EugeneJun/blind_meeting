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
    let people_imgs = await fs.readdirSync('./public/images/people/').map(e => {return {name: e, uri: './public/images/people/' + e}});
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
  }
}