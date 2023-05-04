let webscraper = require('../index.js');

(async () => {

    try {
        let result = await webscraper.scrape({
            url: 'https://blog.reedsy.com/character-name-generator/language/german/?filter=Male&commit=Generate%20names',
            tags: {
                text: "div"
            }
        });
        console.log(result);
    } catch (e) {
        console.log(e);
    }
})();
