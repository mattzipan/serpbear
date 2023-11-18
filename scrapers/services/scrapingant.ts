const scrapingAnt:ScraperSettings = {
   id: 'scrapingant',
   name: 'ScrapingAnt',
   website: 'scrapingant.com',
   headers: (keyword) => {
      // eslint-disable-next-line max-len
      const mobileAgent = 'Mozilla/5.0 (Linux; Android 10; SM-G996U Build/QP1A.190711.020; wv) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Mobile Safari/537.36';
      return keyword && keyword.device === 'mobile' ? { 'Ant-User-Agent': mobileAgent } : {};
   },
   scrapeURL: (keyword, settings, countryData) => {
      const scraperCountries = ['AE', 'BR', 'CN', 'DE', 'ES', 'FR', 'GB', 'HK', 'PL', 'IN', 'IT', 'IL', 'JP', 'NL', 'RU', 'SA', 'US', 'CZ'];
      const country = scraperCountries.includes(keyword.country.toUpperCase()) ? keyword.country : 'US';
      const lang = countryData[country][2];
      const url = encodeURI(`https://www.google.com/search?num=100&hl=${lang}&q=${keyword.keyword}`);
      return `https://api.scrapingant.com/v2/extended?url=${url}&x-api-key=${settings.scaping_api}&proxy_country=${country}&browser=false`;
   },
   resultObjectKey: 'result',
};

export default scrapingAnt;
