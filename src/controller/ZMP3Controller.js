const { ZingMp3 } = require("zingmp3-api-full/dist");
class ZMP3Controller {
    testGetPlaylist(req, res) {
        ZingMp3.getDetailPlaylist('ZU9ZO7DU')
            .then(data => res.json(data.data), error => res.json(error))
            .catch(err => console.log("error:", err));
    }
    getChartHome(req, res) {
        ZingMp3.getChartHome()
            .then(data => res.json(data.data), error => res.json(error))
            .catch(err => console.log("error:", err));
    }
    getTop(req, res) {
        ZingMp3.getTop100()
            .then(data => res.json(data.data), error => res.json(error))
            .catch(err => console.log("error:", err));
    }
    getSongInfo(req, res) {
        ZingMp3.getInfoSong(req.params.id)
            .then(data => res.json(data.data), error => res.json(error))
            .catch(err => console.log("error:", err));
    }
    getStreamings(req, res) {
        ZingMp3.getSong(req.params.id)
            .then(data => res.json(data.data), error => res.json(error))
            .catch(err => console.log("error:", err));
    }
    getLyricInfo(req, res) {
        ZingMp3.getLyric(req.params.id)
            .then(data => res.json(data.data), error => res.json(error))
            .catch(err => console.log("error:", err));
    }
    getFullInfo(req, res) {
        ZingMp3.getFullInfo(req.params.id)
            .then(data => res.json(data), error => res.json(error))
            .catch(err => console.log("error:", err));
    }
    getPlaylist(req, res) {
        ZingMp3.getDetailPlaylist(req.params.id)
            .then(data => res.json(data.data), error => res.json(error))
            .catch(err => console.log("error:", err));
    }
    getArtist(req, res) {
        ZingMp3.getDetailArtist(req.params.alias)
            .then(data => res.json(data.data), error => res.json(error))
            .catch(err => console.log("error:", err));
    }
    search(req, res) {
        ZingMp3.search(req.params.keyword)
            .then(data => res.json(data.data), error => res.json(error))
            .catch(err => console.log("error:", err));
    }
}
module.exports = new ZMP3Controller;