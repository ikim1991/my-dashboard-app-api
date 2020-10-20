const axios = require('axios');
const cheerio = require('cheerio');

const getStockPrices = async (stockTickers) => {
	try {
    const stockPrices = []
    for(let ticker of stockTickers){
			let url = ""
			if(ticker.market.toUpperCase() === "CRYPTO"){
				url = `https://ca.finance.yahoo.com/quote/${ticker.symbol}-USD`
			}else if(ticker.market.toUpperCase() === "NASDAQ" || ticker.market.toUpperCase() === "NYSE"){
				url = `https://ca.finance.yahoo.com/quote/${ticker.symbol}`
			}else{
				if(ticker.market.toUpperCase() === "VN"){
					url = `https://ca.finance.yahoo.com/quote/${ticker.symbol}.V`
				}else{
					url = `https://ca.finance.yahoo.com/quote/${ticker.symbol}.${ticker.market}`
				}
			}

			const { data } = await axios.get(url)
			const $ = cheerio.load(data);

			if(ticker.market.toUpperCase() === "CRYPTO"){
				stockPrices.push({
					ticker: `${ticker.symbol}-USD`,
					company: $('h1[class="D(ib) Fz(18px)"]').text().trim(),
					price: $('span[class="Trsdu(0.3s) Fw(b) Fz(36px) Mb(-4px) D(ib)"]').text().trim(),
					change: $('div[class="D(ib) Mend(20px)"] span[data-reactid="33"]').text().trim(),
					status: $('div#quote-market-notice').text().trim()
				})
			}else if(ticker.market.toUpperCase() === "NASDAQ" || ticker.market.toUpperCase() === "NYSE"){
				stockPrices.push({
					ticker: `${ticker.symbol}`,
					company: $('h1[class="D(ib) Fz(18px)"]').text().trim(),
					price: $('span[class="Trsdu(0.3s) Fw(b) Fz(36px) Mb(-4px) D(ib)"]').text().trim(),
					change: $('div[class="D(ib) Mend(20px)"] span[data-reactid="33"]').text().trim(),
					status: $('div#quote-market-notice').text().trim()
				})
			}else{
				stockPrices.push({
					ticker: `${ticker.symbol}.${ticker.market}`,
					company: $('h1[class="D(ib) Fz(18px)"]').text().trim(),
					price: $('span[class="Trsdu(0.3s) Fw(b) Fz(36px) Mb(-4px) D(ib)"]').text().trim(),
					change: $('div[class="D(ib) Mend(20px)"] span[data-reactid="33"]').text().trim(),
					status: $('div#quote-market-notice').text().trim()
				})
			}
    }
    return stockPrices
  } catch (error) {
    throw error;
  }
}

const getStockNews = async (stockTickers) => {
	try {
		const news = []

		for(let ticker of stockTickers){
			let url = ""
      if(ticker.market.toUpperCase() === 'NASDAQ' || ticker.market.toUpperCase() === 'NYSE'){
				url = `https://www.barchart.com/stocks/quotes/${ticker.symbol}`
			} else{
        url = `https://www.barchart.com/stocks/quotes/${ticker.symbol}.${ticker.market}`
      }

			if(ticker.market.toUpperCase() !== "CRYPTO"){
				const { data } = await axios.get(url);
				const $ = cheerio.load(data);

				$('div.story.clearfix').each((index, el) => {
					const date = $(el).find('span.story-meta').text().trim().split("-")
					news.push({
						title: $(el).find('a.story-link').text().trim(),
						link: `https://www.barchart.com${$(el).find('a.story-link').attr('href').trim()}`,
						date: date[date.length - 1].trim(),
						description: $(el).find('p.story-excerpt').text().trim()
					})

					if(index === 1){
						return false
					}
				})
			}
		}

		return news

	} catch (error) {
		throw error;
	}
}

const getTorontoJobPosts = async () => {
	try{
		const { data } = await axios.get(
			'https://ca.indeed.com/jobs?as_and=javascript+developer&as_phr=&as_any=node+nodejs+react+developer+javascript+junior+intermediate+web+front-end+frontend+back-end+backend+fullstack+full-stack&as_not=senior+advanced&as_ttl=developer&as_cmp=&jt=all&st=&sr=directhire&salary=&radius=25&l=Toronto%2C+ON&fromage=3&limit=10&sort=date&psf=advsrch&from=advancedsearch'
		);

		const $ = cheerio.load(data);
		const postings = []

		$('div.jobsearch-SerpJobCard').each((ind, el) => {
			postings.push({
				title: $(el).find('h2.title').text().trim().replace("new", ""),
				company: $(el).find('div > span.company').text().trim(),
				location: $(el).find('div > .location').text().trim(),
				summary: $(el).find('div > div.summary').text().trim(),
				link: `https://ca.indeed.com${$(el).find('h2.title > a.jobtitle').attr('href')}`
			})
		})

		return postings

	} catch(error){
		throw error
	}
}

const getEdmontonJobPosts = async () => {
	try {
		const { data } = await axios.get(
			'https://ca.indeed.com/jobs?as_and=javascript+developer&as_phr=&as_any=node+nodejs+react+developer+javascript+junior+intermediate+web+front-end+frontend+back-end+backend+fullstack+full-stack&as_not=senior+advanced&as_ttl=&as_cmp=&jt=all&st=&sr=directhire&salary=&radius=25&l=Edmonton%2C+AB&fromage=3&limit=10&sort=date&psf=advsrch&from=advancedsearch'
		);

		const $ = cheerio.load(data);
		const postings = []

		$('div.jobsearch-SerpJobCard').each((ind, el) => {
			postings.push({
				title: $(el).find('h2.title').text().trim().replace("new", ""),
				company: $(el).find('div > span.company').text().trim(),
				location: $(el).find('div > .location').text().trim(),
				summary: $(el).find('div > div.summary').text().trim(),
				link: `https://ca.indeed.com${$(el).find('h2.title > a.jobtitle').attr('href')}`
			})
		})

			return postings

	}catch(error){
		throw error
	}
}

const getCalgaryJobPosts = async () => {
	try {
		const { data } = await axios.get(
			'https://ca.indeed.com/jobs?as_and=javascript+developer&as_phr=&as_any=node+nodejs+react+developer+javascript+junior+intermediate+web+front-end+frontend+back-end+backend+fullstack+full-stack&as_not=senior+advanced&as_ttl=&as_cmp=&jt=all&st=&sr=directhire&salary=&radius=25&l=Calgary%2C+AB&fromage=3&limit=10&sort=date&psf=advsrch&from=advancedsearch'
		);

		const $ = cheerio.load(data);
		const postings = []

		$('div.jobsearch-SerpJobCard').each((ind, el) => {
			postings.push({
				title: $(el).find('h2.title').text().trim().replace("new", ""),
				company: $(el).find('div > span.company').text().trim(),
				location: $(el).find('div > .location').text().trim(),
				summary: $(el).find('div > div.summary').text().trim(),
				link: `https://ca.indeed.com${$(el).find('h2.title > a.jobtitle').attr('href')}`
			})
		})
			return postings

	}catch(error){
		throw error
	}
}

const getVancouverJobPosts = async () => {
	try {
		const { data } = await axios.get(
			'https://ca.indeed.com/jobs?as_and=javascript+developer&as_phr=&as_any=node+nodejs+react+developer+javascript+junior+intermediate+web+front-end+frontend+back-end+backend+fullstack+full-stack&as_not=senior+advanced&as_ttl=&as_cmp=&jt=all&st=&sr=directhire&salary=&radius=25&l=Vancouver%2C+BC&fromage=3&limit=10&sort=date&psf=advsrch&from=advancedsearch'
		);

		const $ = cheerio.load(data);
		const postings = []

		$('div.jobsearch-SerpJobCard').each((ind, el) => {
			postings.push({
				title: $(el).find('h2.title').text().trim().replace("new", ""),
				company: $(el).find('div > span.company').text().trim(),
				location: $(el).find('div > .location').text().trim(),
				summary: $(el).find('div > div.summary').text().trim(),
				link: `https://ca.indeed.com${$(el).find('h2.title > a.jobtitle').attr('href')}`
			})
		})

			return postings

	}catch(error){
		throw error
	}
}

module.exports = {
  getStockPrices,
  getStockNews,
  getTorontoJobPosts,
  getEdmontonJobPosts,
  getVancouverJobPosts,
  getCalgaryJobPosts
}
