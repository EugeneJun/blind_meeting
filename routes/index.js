const express = require('express');
const router = express.Router();
const fs = require('fs');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.post('/get_imgs_list', async function(req, res, next) {
  let imgs = await fs.readdirSync('./frontend/public/images/');
  res.send({imgs});
});

module.exports = router;
