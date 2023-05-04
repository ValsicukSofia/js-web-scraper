let webscraper = require('../index.js');
let fs = require('fs');

function replaceComma(str) {
    return str.replaceAll(",", " ");
}

(async () => {
    try {
        let random_contacts_csv = '';
        let random_names = [];
        let random_phones = [];
        let random_address = [];
        let random_postcode = [];

        let result = await webscraper.scrape({
            url: 'https://www.generatormix.com/random-address-in-berlin?number=30',
            tags: '.text-left'
        });

        address = result.filter(e => e.startsWith('Street:')).map(element => {
            return element.replace('Street:', '');
        });

        random_address.push(...address);

        postcode = result.filter(e => e.startsWith('Postcode:')).map(element => {
            return element.replace('Postcode:', '');
        });

        random_postcode.push(...postcode);

        for (let index = 0; index < 5; index++) {
            let result = await webscraper.scrape({
                url: 'https://www.fakephonenumber.org/Germany/phone_number_generator?state=Berlin',
                tags: '.numbers a'
            });

            result = result.filter(e => e.startsWith('030'));
            random_phones.push(...result);
        }

        for (let index = 0; index < 6; index++) {
            let result = await webscraper.scrape({
                url: 'https://blog.reedsy.com/character-name-generator/language/german/?filter=Male&commit=Generate%20names',
                tags: '#names-container h3'
            });
            random_names.push(...result);
        }
        console.log(random_names.length);
        console.log(random_phones.length);
        console.log(random_address.length);
        console.log(random_postcode.length);

        for (let index = 0; index < random_names.length; index++) {
            random_contacts_csv += replaceComma(random_names[index]) + ',' + replaceComma(random_address[index]) + ',' + replaceComma(random_phones[index]) + ',' + replaceComma(random_postcode[index]) + '\n';
        }

        fs.writeFileSync("./contacts.csv", random_contacts_csv, 'ascii');
    } catch (e) {
        console.log(e);
    }
})();