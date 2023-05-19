const express = require("express");
const zmp3Controller = require("../controller/ZMP3Controller");
const router = express.Router()

router.get('/testGetPlaylist', zmp3Controller.testGetPlaylist);
router.get('/getChartHome', zmp3Controller.getChartHome);
router.get('/top100', zmp3Controller.getTop);
router.get('/getSongInfo/:id', zmp3Controller.getSongInfo);
router.get('/getStreaming/:id', zmp3Controller.getStreamings);
router.get('/getLyric/:id', zmp3Controller.getLyricInfo);
router.get('/getFullInfo/:id', (req, res) => {
    res.send("error: this resource has temporary suspended");
});
router.get('/getCategoryMV/:id', zmp3Controller.getCategoryMV);
router.get('/getVideo/:id', zmp3Controller.getVideo);
router.get('/getPlaylist/:id', zmp3Controller.getPlaylist);
router.get('/getArtist/:alias', zmp3Controller.getArtist);
router.get('/search/:keyword', zmp3Controller.search);

module.exports = router;