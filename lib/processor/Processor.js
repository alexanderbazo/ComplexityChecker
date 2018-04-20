class Processor {
    constructor() {
    }

    run() {
        return this.process();
    }

    process() {
        // Must return a promise which resolves to a Results object
        let result = new Promise(function(resolve, reject) {
            resolve(undefined);
        });
        return result;
    }

}