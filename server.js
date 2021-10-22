// const express = require('express')
// const path = require('path')
const puppeteer = require('puppeteer');
// require('dotenv').config()

// const PORT = process.env.PORT || 4004

// const app = express()

// app.use(express.json())

// app.use(express.static('client/build'))

// app.get('/api/youtube', (_, res) =>{
//     res.send({
//         msg: 'Hello world'
//     })
// });
// app.get('/*', (_, res) => {
//     res.sendFile(path.join(__dirname, './client/build/index.html'))
// });
// app.listen(PORT, () => {
//     console.log(`Server start on port : ${PORT}`)
// });

(async () => {
    const browser = await puppeteer.launch({headless: false});
    const page = await browser.newPage();


    // await page.goto('https://www.wakanim.tv/fr/v2/whats-new');
    // const wakanim = await page.evaluate(() => {
    //     let adn = []
    //     let elements = document.querySelectorAll('div.WhatsNew-container:nth-child(4) > section:nth-child(1) > div:nth-child(2) > ul:nth-child(1) > li');
    //     for (element of elements){
    //         adn.push({
    //             titre: element.querySelector('.slider_item_title > strong').innerHTML
    //         })
    //     }
    //     return adn;
    // });
    // console.log(wakanim);


    await page.goto('https://www.crunchyroll.com/lineup');
    // await page.waitForNavigation();
    const crunchyroll = await page.evaluate(() => {
        let adn = []
        // console.log(window);
        let elements = document.querySelectorAll('div.lineup-grid:nth-child(4) > ul:nth-child(1) > li');
        for (element of elements){
            adn.push({
                titre: element.querySelector('.lineup-series-title').innerHTML
            })
        }
        return adn;
    });
    console.log(crunchyroll);
    await browser.close();
}) ();
