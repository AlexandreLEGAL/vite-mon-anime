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
    const browser = await puppeteer.launch({headless: true});
    const page = await browser.newPage();
    //setUserAgent permet que le code fonctionne partout meme si headless est a true 
    //(Why this is interesting? Suppose you want to scrap a website using Puppeteer in headless mode and the target website put a protection by detecting the User Agent string (blocking ChromeHeadless) then your scraping activity might be blocked.)
    await page.setUserAgent("Mozilla/5.0 (Macintosh; Intel Mac OS X 10_14_1) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/73.0.3683.75 Safari/537.36")
    // await page.goto('https://www.wakanim.tv/fr/v2/whats-new');
    // const wakanim = await page.evaluate(() => {
    //     let adn = []
    //     let elements = document.querySelectorAll('div.WhatsNew-container:nth-child(4) > section:nth-child(1) > div:nth-child(2) > ul:nth-child(1) > li');
    //     for (element of elements){
    //         adn.push({
    //             title: element.querySelector('.slider_item_title > strong')?.innerHTML,
    //             img: element.querySelector('.slider_item_image > img')?.getAttribute('data-src'),
    //             season: element.querySelector('.slider_item_season_title')?.innerText.trim(),
    //             episodeSortie: element.querySelector('.tooltip_text > strong')?.innerHTML,
    //             synopsis: element.querySelector('.tooltip_text > br')?.nextSibling.data.trim(),
    //             genres: Array.from(element.querySelectorAll('.tooltip_genre')).map(e => e.text.replace(', ','')),
    //             originalName: element.getAttribute('data-originalname'),
    //             rating: element?.getAttribute('data-rating'),
    //             subbed: element?.getAttribute('data-subbed'),
    //             dubbed: element?.getAttribute('data-dubbed'),
    //         })
    //     }
    //     return adn;
    // });
    // console.log(wakanim);


    await page.goto('https://www.crunchyroll.com/fr/videos/anime/seasons/fall-2021');
    // await page.waitForNavigation();
    const crunchyrollAnimes = await page.evaluate(() => {
        return Array.from(document.querySelectorAll('.portrait-grid > li')).map(e => 'http://www.crunchyroll.com/' + e.querySelector('.portrait-element').getAttribute('href'))
    });
console.log(crunchyrollAnimes)
let crunch= [];
    for(element of crunchyrollAnimes){
        await page.goto(element + '/more');
        const crunchyroll = await page.evaluate(() => {
        return {
            titre: document.querySelector('h1.ellipsis > span')?.innerHTML,
            img: document.querySelector('.poster')?.getAttribute('src'),
            synopsis: document.querySelector('.series-extended-information')?.innerText,
            rating: document.querySelector('div.xsmall-margin-bottom:nth-child(2) > div:nth-child(2) > meta')?.getAttribute('content'),
            sortis: document.querySelector('.large-margin-bottom:nth-child(3) > .strong')?.textContent.replace('Simulcast en ligne ', '').replace('les ', ''),
            genres : document.querySelectorAll('.large-margin-bottom:nth-child(5) li:nth-child(2) > a'),
        }
        });
        crunch.push(crunchyroll);
        console.log(crunchyroll)
    }
    console.log(crunch);
    // const crunchyroll = await page.evaluate(() => {
    //     let adn = []
    //     let elements = document.querySelectorAll('.portrait-grid > li');
    //     for (element of elements){
    //         adn.push({
    //             titre: element.querySelector('.series-title').innerHTML,
    //             nbEpisode: element.querySelector('.series-data').innerHTML.trim(),
	// 			image: element.querySelector('.portrait').getAttribute('src'),
    //         })
    //     }
    //     return adn;
    // });
    // console.log(crunchyroll);

    // await page.goto('https://gw.api.animedigitalnetwork.fr/show/simulcast?year=2021');
    // // TODO API ADN
    // console.log(adn);
    
    await browser.close();
}) ();
