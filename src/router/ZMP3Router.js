const express = require("express");
const zmp3Controller = require("../controller/zmp3Controller.js");
const router = express.Router()

router.get('/testGetPlaylist', (req, res) => {
    zmp3Controller.testGetPlaylist(req, res);
});
router.get('/getChartHome', (req, res) => {
    zmp3Controller.getChartHome(req, res);
});
router.get('/top100', (req, res) => {
    zmp3Controller.getTop(req, res);
});
router.get('/getSongInfo/:id', (req, res) => {
    zmp3Controller.getSongInfo(req, res);
});
router.get('/getStreaming/:id', (req, res) => {
    zmp3Controller.getStreamings(req, res);
});
router.get('/getLyric/:id', (req, res) => {
    zmp3Controller.getLyric(req, res);
});
router.get('/getFullInfo/:id', (req, res) => {
    zmp3Controller.getFullInfo(req, res);
});
router.get('/getPlaylist/:id', (req, res) => {
    zmp3Controller.getPlaylist(req, res);
});
router.get('/getDetailArtist/:alias', (req, res) => {
    zmp3Controller.getArtistDetail(req, res);
});
router.get('/search/:keyword', (req, res) => {
    zmp3Controller.search(req, res);
});

module.exports = router;