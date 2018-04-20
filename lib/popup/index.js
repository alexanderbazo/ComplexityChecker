(function() {

    var numberOfLinksEl,
        numberOfImagesEl,
        numberOfWordsEl,
        pageSizeRatioEl,
        urlEl;

    function initUI() {
        urlEl = document.querySelector(".url");
        numberOfLinksEl = document.querySelector(".stats .links .value");
        numberOfImagesEl = document.querySelector(".stats .images .value");
        numberOfWordsEl = document.querySelector(".stats .words .value");
        pageSizeRatioEl = document.querySelector(".stats .page-size .value");
    }

    function requestComplexityStats(callback) {
        chrome.tabs.query({ active: true, currentWindow: true }, function(tabs) {
            setUrl(tabs[0].url);
            chrome.tabs.sendMessage(tabs[0].id, { type: "stats" }, function(response) {
                callback(response);
            });
        });
    }

    function setUrl(url) {
        urlEl.innerHTML = url.match(/:\/\/(www[0-9]?\.)?(.[^/:]+)/i)[2];
    }

    function onComplexityStatsAvailable(stats) {
        numberOfLinksEl.innerHTML = stats.data.links.numberOfLinks;
        numberOfImagesEl.innerHTML = stats.data.images.numberOfImages;
        numberOfWordsEl.innerHTML = stats.data.text.numberOfWords;
        pageSizeRatioEl.innerHTML = stats.data.page.pageRatio;
    }

    function init() {
        initUI();
        requestComplexityStats(onComplexityStatsAvailable);
    }

    window.addEventListener('DOMContentLoaded', init);
}());