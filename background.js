browser.browserAction.onClicked.addListener((tab) => {
        tab.id,
        {action: "Button clicked"}
    
    });