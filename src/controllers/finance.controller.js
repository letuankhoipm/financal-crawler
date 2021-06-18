
const getData = require('../crawler/fialda');

async function findByCodexGet(req, res) {
    let codex = req.params.id
    const data = await getData.fialda(codex);
    res.json(data);
}

async function findByCodePost(req, res, nex) {
    let codex = req.body.codex;
    const data = await getData.fialda(codex)
    res.json(data);
}

module.exports.findByCodePost = findByCodePost
module.exports.findByCodexGet = findByCodexGet