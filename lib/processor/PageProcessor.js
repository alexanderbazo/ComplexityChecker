class PageProcessor extends Processor {
    getPageSize() {
        let body = document.body,
            html = document.documentElement,
            height = Math.max(body.scrollHeight, body.offsetHeight,
                html.clientHeight, html.scrollHeight, html.offsetHeight);
        return height;
    }

    getClientHeight() {
        return document.documentElement.clientHeight;
    }

    process() {
        let that = this,
            result = new Promise(function(resolve, reject) {
                let results = new Results("page"),
                    pageSize = that.getPageSize(),
                    pageRatio = pageSize / that.getClientHeight();
                results.setValue("pageSize", pageSize);
                results.setValue("pageRatio", pageRatio.toFixed(2));
                resolve(results);
            });
        return result;
    }
}