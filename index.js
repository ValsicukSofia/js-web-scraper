const request = require('request-promise');

const jsdom = require('jsdom');

const {
    JSDOM
} = jsdom;

/*
 * TODO: if names are the same merge?
 */
exports.scrape = async (params) => {

    if (!params) {
        throw new Error('Parameters missing!');
    }

    if (!params.url || !params.tags) {
        throw new Error('Parameters missing!');
    }

    const {
        url,
        tags
    } = params;

    let body = await request(params.url);

    if (body === null || body === undefined)
        return;

    const vdom = new JSDOM(body);
    let $ = require('jquery')(vdom.window);

    let sample = [];

    $(tags).each(function () {
        sample.push($(this).text());
    })

    return sample;
}
