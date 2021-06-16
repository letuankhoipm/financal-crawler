
const getAllData = require('../crawler/data');

async function findByCodex(req, res) {
    let codex = req.params.id
    const data = await getAllData.generalData(codex);
    res.json(data);
}

async function getAll(req, res, nex) {
    let codex = req.body.codex;
    const data = await getAllData.generalData(codex)
    res.json(data);
}

module.exports.getAll = getAll
module.exports.findByCodex = findByCodex