class LinkProcessor extends Processor {
    countLinks() {
        let links = document.querySelectorAll("a");
        return links.length;
    }

    process() {
        let that = this,
            result = new Promise(function(resolve, reject) {
                let results = new Results("links"),
                    numberOfLinks = that.countLinks();
                results.setValue("numberOfLinks", numberOfLinks);
                resolve(results);
            });
        return result;
    }
}