const puppeteer = require('puppeteer');
const fs = require('fs');


async function getOnAdn(array){
	console.info("Analyse ADN ...")
	const browser = await puppeteer.launch({headless: true});
	const page = await browser.newPage();
	await page.setUserAgent("Mozilla/5.0 (Macintosh; Intel Mac OS X 10_14_1) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/73.0.3683.75 Safari/537.36")
	await page.goto('https://gw.api.animedigitalnetwork.fr/show/simulcast?year=2021');
	await page.content(); 

    const adn = await page.evaluate(() =>  {
		const json = JSON.parse(document.querySelector("body").innerText)
        return Object.values(json)[0][0]['shows']; 
    });
	for (element of adn){
		array.push(element)
	}
	// console.log(adn)
	console.info("Analyse ADN Terminé",array.length)
	await browser.close();
}

async function getOnWakanim(array){
	console.info("Analyse Wakanim ...")
	const browser = await puppeteer.launch({headless: true});
	const page = await browser.newPage();
	await page.setUserAgent("Mozilla/5.0 (Macintosh; Intel Mac OS X 10_14_1) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/73.0.3683.75 Safari/537.36")
	await page.goto('https://www.wakanim.tv/fr/v2/whats-new');
	const wakanims = await page.evaluate(() => {
		var elements = Array.from(document.querySelectorAll('div.WhatsNew-container:nth-child(4) > section:nth-child(1) > div:nth-child(2) > ul:nth-child(1) > li'))
		elements = elements.map(element=>{
			return {
				title: element.querySelector('.slider_item_title > strong')?.innerHTML,
				img: element.querySelector('.slider_item_image > img')?.getAttribute('data-src'),
				season: element.querySelector('.slider_item_season_title')?.innerText.trim(),
				episodeSortie: element.querySelector('.tooltip_text > strong')?.innerHTML,
				synopsis: element.querySelector('.tooltip_text > br')?.nextSibling.data.trim(),
				genres: Array.from(element.querySelectorAll('.tooltip_genre')).map(e => e.text.replace(', ','')),
				originalName: element.getAttribute('data-originalname'),
				rating: element?.getAttribute('data-rating'),
				subbed: element?.getAttribute('data-subbed'),
				dubbed: element?.getAttribute('data-dubbed'),
			}
		})
		return elements
	});
	for (element of wakanims){
		array.push(element)
	}
	console.info("Analyse Wakanim Terminé",array.length)
	await browser.close();
}

async function getOnCrunchyroll(array){
	console.info("Analyse Crunchyroll ...")
	const browser = await puppeteer.launch({headless: true});
	const page = await browser.newPage();
	await page.setUserAgent("Mozilla/5.0 (Macintosh; Intel Mac OS X 10_14_1) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/73.0.3683.75 Safari/537.36")
	await page.goto('https://www.crunchyroll.com/fr/videos/anime/seasons/fall-2021');
	const crunchyrollAnimes = await page.evaluate(() => {
		return Array.from(document.querySelectorAll('.portrait-grid > li')).map(e => 'http://www.crunchyroll.com/' + e.querySelector('.portrait-element').getAttribute('href'))
	});
	for(element of crunchyrollAnimes){
		await page.goto(element + '/more');
		const crunchyroll = await page.evaluate(() => {
			return {
				titre: document.querySelector('h1.ellipsis > span')?.innerHTML,
				img: document.querySelector('.poster')?.getAttribute('src'),
				synopsis: document.querySelector('.series-extended-information')?.innerText,
				rating: document.querySelector('div.xsmall-margin-bottom:nth-child(2) > div:nth-child(2) > meta')?.getAttribute('content'),
				sortis: document.querySelector('.large-margin-bottom:nth-child(3) > .strong')?.textContent.replace('Simulcast en ligne ', '').replace('les ', ''),
				genres : Array.from(document.querySelectorAll('.large-margin-bottom:nth-child(5) li:nth-child(2) > a')).map(e => e.innerHTML),
			}
		});
		array.push(crunchyroll)
	}
	await browser.close();
	console.info("Analyse Crunchyroll Terminé",array.length)
}
function onTerminate(array){
	if(onTerminate.wakanim && onTerminate.crunchyroll && onTerminate.adn){
		// la suite
		// console.log(array)
		fs.writeFileSync('donnee.json', JSON.stringify(array));
		console.info("Donnée récupérer dans donnee.json", array.length, "Object");
	}
}
(() => {
	var array = new Array()
	getOnWakanim(array).then(()=>{
		onTerminate.wakanim = true
		onTerminate(array)
	})
	getOnCrunchyroll(array).then(()=>{
		onTerminate.crunchyroll = true
		onTerminate(array)
	})
	getOnAdn(array).then(()=>{
		onTerminate.adn = true
		onTerminate(array)
	})

}) ();


