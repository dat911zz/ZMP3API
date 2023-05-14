const { Zing } = require("zingmp3-api-full")
class ZMP3Controller {
    testGetPlaylist(req, res) {
        Zing.getDetailPlaylist('ZU9ZO7DU')
            .then(data => res.json(data), error => res.json(error))
            .catch(err => console.log("error:", err));
    }
    getChartHome(req, res) {
        Zing.getChartHome()
            .then(data => res.json(data), error => res.json(error))
            .catch(err => console.log("error:", err));
    }
    getTop(req, res) {
        Zing.getTop100()
            .then(data => res.json(data), error => res.json(error))
            .catch(err => console.log("error:", err));
    }
    getSongInfo(req, res) {
        Zing.getInfoMusic(req.params.id)
            .then(data => res.json(data), error => res.json(error))
            .catch(err => console.log("error:", err));
    }
    getStreamings(req, res) {
        Zing.getStreaming(req.params.id)
            .then(data => res.json(data), error => res.json(error))
            .catch(err => console.log("error:", err));
    }
    getLyricInfo(req, res) {
        Zing.getLyric(req.params.id)
            .then(data => res.json(data), error => res.json(error))
            .catch(err => console.log("error:", err));
    }
    getFullInfo(req, res) {
        Zing.getFullInfo(req.params.id)
            .then(data => res.json(data), error => res.json(error))
            .catch(err => console.log("error:", err));
    }
    getPlaylist(req, res) {
        Zing.getDetailPlaylist(req.params.id)
            .then(data => res.json(data), error => res.json(error))
            .catch(err => console.log("error:", err));
    }
    getArtist(req, res) {
        Zing.getDetailArtist(req.params.alias)
            .then(data => res.json(data), error => res.json(error))
            .catch(err => console.log("error:", err));
    }
    search(req, res) {
        Zing.search(req.params.keyword)
            .then(data => res.json(data), error => res.json(error))
            .catch(err => console.log("error:", err));
    }
}
module.exports = new ZMP3Controller();