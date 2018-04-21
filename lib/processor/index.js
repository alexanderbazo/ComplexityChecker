(function() {

    var processors,
        busClient;

    function init() {
        initBusClient();
        initProcessors();
        initMessaging();
    }

    function initBusClient() {
        busClient = new EventBusClient("content")
        busClient.addEventListener("complexityStatsRequest", onComplexityStatsRequested);
    }

    function initProcessors() {
        processors = [];
        processors.push(new LinkProcessor());
        processors.push(new ImageProcessor());
        processors.push(new PageProcessor());
        processors.push(new TextProcessor());
    }

    function initMessaging() {
        chrome.runtime.onMessage.addListener(
            function(request, sender, sendResponse) {
                if (request.type === "stats") {
                    onComplexityStatsRequested(request, sender, sendResponse);
                    return true;
                }
            });
    }

    function onComplexityStatsRequested(event) {
        let resultPromises = [];
        for (let i = 0; i < processors.length; i++) {
            resultPromises.push(processors[i].run());
        }
        Promise.all(resultPromises).then(function(values) {
            let stats = {};
            for (let i = 0; i < values.length; i++) {
                stats[values[i].label] = values[i].data;
            }
            busClient.send("complexityStatsAvailable", stats);
        });
    }

    init();

}());