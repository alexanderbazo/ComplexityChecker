(function() {

    var busClient,
        numberOfLinksEl,
        numberOfImagesEl,
        numberOfWordsEl,
        pageSizeRatioEl,
        urlEl;

    function init() {
        initUI();
        initBusClient();
        requestComplexityStats();
    }

    function initUI() {
        urlEl = document.querySelector(".url");
        numberOfLinksEl = document.querySelector(".stats .links .value");
        numberOfImagesEl = document.querySelector(".stats .images .value");
        numberOfWordsEl = document.querySelector(".stats .words .value");
        pageSizeRatioEl = document.querySelector(".stats .page-size .value");
    }

    function initBusClient() {
        busClient = new EventBusClient("popup");
        busClient.addEventListener("complexityStatsAvailable", onComplexityStatsAvailable);
    }

    function requestComplexityStats() {
        busClient.send("complexityStatsRequest", null);
    }

    function setUrl(url) {
        urlEl.innerHTML = url.match(/:\/\/(www[0-9]?\.)?(.[^/:]+)/i)[2];
    }

    function onComplexityStatsAvailable(event) {
        numberOfLinksEl.innerHTML = event.msg.links.numberOfLinks;
        numberOfImagesEl.innerHTML = event.msg.images.numberOfImages;
        numberOfWordsEl.innerHTML = event.msg.text.numberOfWords;
        pageSizeRatioEl.innerHTML = event.msg.page.pageRatio;
    }

    window.addEventListener('DOMContentLoaded', init);
}());