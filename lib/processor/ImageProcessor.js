class ImageProcessor extends Processor {
    countImages() {
        let links = document.querySelectorAll("img");
        return links.length;
    }

    process() {
        let that = this,
            result = new Promise(function(resolve, reject) {
                let results = new Results("images"),
                    numberOfImages = that.countImages();
                results.setValue("numberOfImages", numberOfImages);
                resolve(results);
            });
        return result;
    }
}