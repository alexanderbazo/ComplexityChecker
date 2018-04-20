class TextProcessor extends Processor {
    countWords() {
        let words = document.body.innerText.split("\n").join(" ").split(" ");
        return words.length;
    }

    process() {
        let that = this,
            result = new Promise(function(resolve, reject) {
                let results = new Results("text"),
                    numberOfWords = that.countWords();
                results.setValue("numberOfWords", numberOfWords);
                resolve(results);
            });
        return result;
    }
}