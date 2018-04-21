class EventBusClient extends EventTarget {
    constructor(origin) {
    	super();
        this.origin = origin;
        chrome.runtime.onMessage.addListener(this.onMessage.bind(this));
    }

    send(type, msg) {
        if (this.origin === "popup") {
            this.sendFromPopup(type, msg);
        }
        if (this.origin === "content") {
            this.sendFromContent(type, msg);
        }
    }

    sendFromPopup(type, msg) {
        let event = { type: type, msg: msg };
        chrome.tabs.query({ active: true, currentWindow: true }, function(tabs) {
            chrome.tabs.sendMessage(tabs[0].id, event);
        });
    }

    sendFromContent(type, msg) {
        let event = { type: type, msg: msg };
        chrome.runtime.sendMessage(event);
    }

    onMessage(request, sender, sendResponse) {
        this.dispatchEvent(request);
        sendResponse(null);
        return true;
    }
}