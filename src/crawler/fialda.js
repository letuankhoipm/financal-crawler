const request = require('request');
const cheerio = require('cheerio');

function combine(arr) {
    const newArr = [];
    arr.forEach(el => {
        const data = {};
        el.titleValues.titles.forEach((key, index) => {
            data[key] = el.titleValues.values[index];
        })
        newArr.push(data)
    });
    return newArr;
}

function getTitle(arr, start, position) {
    const newArr = [];
    for (var i = start; i < arr.length; i += position) {
        newArr.push(arr[i]);
    }
    return newArr;
}

function generalData(codex) {
    console.log(codex);
    return new Promise((resolve, reject) => {
        request(`https://finance.tvsi.com.vn/Enterprises/OverView?symbol=${codex}`, (err, res, html) => {
            if (!err && res.statusCode === 200) {
                const $ = cheerio.load(html, { decodeEntities: true });
                var retContent = [];
                var titles = [];
                var quarter_1 = [];
                var quarter_2 = [];
                var quarter_3 = [];
                var quarter_4 = [];
                var quarter_5 = [];
                const raw = $('#chitieuquantrong .table-data tbody tr');
                raw.each(async function (idx, elem) {
                    var elemText = [];
                    $(elem).children('td').each(function (childIdx, childElem) {
                        elemText.push($(childElem).text());
                    });
                    // console.log(elemText, '-----');
                    retContent = retContent.concat(elemText)
                });

                // Lay du lieu
                titles = getTitle(retContent, 0, 7);
                quarter_1 = getTitle(retContent, 2, 7);
                quarter_2 = getTitle(retContent, 3, 7);
                quarter_3 = getTitle(retContent, 4, 7);
                quarter_4 = getTitle(retContent, 5, 7);
                quarter_5 = getTitle(retContent, 6, 7);

                // Bien doi du lieu
                titles[0] = 'Qúy';

                const dat = [
                    {
                        titleValues: {
                            titles: titles,
                            values: quarter_1
                        }
                    },
                    {
                        titleValues: {
                            titles: titles,
                            values: quarter_2
                        }
                    },
                    {
                        titleValues: {
                            titles: titles,
                            values: quarter_3
                        }
                    },
                    {
                        titleValues: {
                            titles: titles,
                            values: quarter_4
                        }
                    },
                    {
                        titleValues: {
                            titles: titles,
                            values: quarter_5
                        }
                    },
                ]

                const data = combine(dat);
                resolve(data)
            }
            else {
                reject(err)
            }
        });
    })
}

function fialda(codex) {
    console.log(codex);
    return new Promise((resolve, reject) => {
        request(`https://api5.fialda.com/api/services/app/TechnicalAnalysis/GetFinancialHighlights?symbol=${codex}`, (err, res, html) => {
            if (!err && res.statusCode === 200) {
                const raw = res.body
                const data = JSON.parse(raw).result;
                var clear = [];
                data.forEach((el) => {
                    const obj = {
                        year: el.year,
                        quarter: el.quarter,
                        sale: el.netSale,
                        eps: el.eps
                    };
                    clear.push(obj);
                })
                resolve(clear)
            }
            else {
                reject(err)
            }
        });
    })
}

module.exports.fialda = fialda
