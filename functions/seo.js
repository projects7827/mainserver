
const seochecker = require("seo-checker")
const fs = require("fs")
const SeoAnalyzer = require("seo-analyzer")

let elements_info = { "elements_info": {}, "errors": [] };

function analyze_seo(input_url, on_data_success = () => { }, on_error = () => { }) {
    try {
        seochecker.load(input_url, function (response) {
            if (!response) { // response will be false on error
                console.log(response)
                // error
            } else {
                fs.writeFileSync(`./dist/sample.html`, Buffer.from(response))
                new SeoAnalyzer()
                    .inputFiles(['./dist/sample.html'])
                    .addRule('imgTagWithAltAttributeRule')
                    .addRule('titleLengthRule', { min: 10, max: 60 })
                    .addRule('aTagWithRelAttributeRule')
                    .addRule('metaBaseRule', { list: ['description', 'viewport'] })
                    .addRule('metaSocialRule', {
                        properties: [
                            'og:url',
                            'og:type',
                            'og:site_name',
                            'og:title',
                            'og:description',
                            'og:image',
                            'og:image:width',
                            'og:image:height',
                            'twitter:card',
                            'twitter:text:title',
                            'twitter:description',
                            'twitter:image:src',
                            'twitter:url'
                        ],
                    })
                    .addRule('canonicalLinkRule')
                    .addRule((dom) => element_validation(dom, "p"))
                    .addRule((dom) => element_validation(dom, "h1"))
                    .addRule((dom) => element_validation(dom, "h2"))
                    .addRule((dom) => element_validation(dom, "h3"))
                    .addRule((dom) => element_validation(dom, "img"))
                    .addRule(get_additional_info)
                    .outputJson((value) => {
                        value = JSON.parse(value)
                        if (value[0] && value[0].report) {
                            elements_info["errors"] = value[0].report
                        }
                        console.log(elements_info)
                        on_data_success(elements_info)
                    });
            }
        });
    }
    catch (err) {
        on_error(err);
    }

}


function get_additional_info(dom) {
    return new Promise(async (resolve, reject) => {
        try {
            var language = dom.window.document.getElementsByTagName("html")[0].getAttribute("lang");
            elements_info["elements_info"]["language code"] = language
            let document = dom.window.document.body
            let total_sentences = document.textContent.split(/(\r\n|\n|\r)/).filter((value) => {
                if (value.replace(/(\r\n|\n|\r)/gm, "").trim() !== "") {
                    return value
                }
            })
            elements_info["elements_info"]["total sentences"] = total_sentences.length

            let final_arr = document.textContent.replace(/(\r\n|\n|\r)/gm, " ").split(" ").filter((value) => {
                if (value.trim() !== "") {
                    return value
                }
            })
            const element = document.querySelectorAll("script");
            for (let i = 0; i < element.length; i++) {
                element[i].remove();
            }
            elements_info["elements_info"]["total words"] = final_arr.length;
            resolve('');
        } catch (e) {
            reject(e);
        }
    });
}

function element_validation(dom, element_type) {
    return new Promise(async (resolve, reject) => {
        const elements = dom.window.document.querySelectorAll(element_type);
        if (elements.length !== 0) {
            if (element_type !== "img") {
                elements_info["elements_info"][element_type + "(main)"] = elements[0].textContent;
            }
            elements_info["elements_info"][element_type] = elements.length
            resolve('');
        } else {
            reject(`Not found ${element_type} tags`);
        }
    });
}


module.exports = analyze_seo