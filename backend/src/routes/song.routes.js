const express = require("express");
const multer = require('multer');
const uploadFile = require("../service/storage.service");
const songModel = require("../models/songs.model")


const router = express.Router();
const app = express();

const upload = multer({
  storage: multer.memoryStorage()
});



router.post('/song', upload.single("audio") ,async (req,res) =>{
  console.log(req.body)
  console.log(req.file);
  const fileData = await uploadFile(req.file);

  const uploadSong = await songModel.create({
    title: req.body.title,
    artist: req.body.artist,
    audio: fileData.url,
    mood: req.body.mood
  })

    res.status(201).json({
    message: 'File uploaded successfully',
    audio: uploadSong
  })
})

router.get('/songs', async (req,res) =>{
  const {mood} = req.query
  // console.log(mood)


  const songs = await songModel.find({
    mood: mood,
  })


  res.status(200).json({
    message: 'Songs fetched successfully',
    songs,
  })
});

module.exports = router; 