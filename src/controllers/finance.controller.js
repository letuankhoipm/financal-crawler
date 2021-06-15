const data = require('../data/data.json')
const crawler = require('../crawler/scrape')

function view(req, res, next) {
    res.send(data);
}

async function find(req, res, nex) {
    let codex = req.body.codex;
    const data = await crawler.scrape(codex)

    res.json(data);
}

module.exports.view = view
module.exports.find = find