const request = require('request');
const cheerio = require('cheerio');

function combine(arr) {
  const newArr = [];
  arr.forEach(el => {
    const data = {};
    el.titleValues.titles.forEach((key, index) => {
      data[key] = el.titleValues.values[index];
    })
    newArr.push({ ...el, data: data, titleValues: undefined });
  });
  return newArr;
}

function scrape(codex) {
  console.log(codex);
  return new Promise((resolve, reject) => {
    request(`https://finance.tvsi.com.vn/Enterprises/FinancialStatements?symbol=${codex}`, (err, res, html) => {
      if (!err && res.statusCode === 200) {
        const $ = cheerio.load(html, { decodeEntities: true });
        $('script').each(function (i, el) {
          const temp = $(this).html();
          if (temp.includes('var bang')) {
            const raw = temp.match(/var bangcandoikt=(.*)\n/)[0].trim();
            const rs = eval(raw.slice(raw.indexOf('[')));
            const data = combine(rs);
            if (data) {
              resolve(data);
            }
            else {
              reject({ err: 'err' })
            }
          }
        })
      }
      else {
        reject(err)
      }
    });
  })
}

module.exports.scrape = scrape
