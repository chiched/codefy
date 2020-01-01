
let favUrl = '';
let cssCodefied = '';
const cssCollection = document.styleSheets;

const codefyCss = () => { 
    const link = document.createElement('link'); 
    link.id = 'codefy'
    link.rel = 'stylesheet';  
    link.type = 'text/css'; 
    link.href = browser.runtime.getURL("style.css");
    for (let i = 1; i < cssCollection.length; i++) {
        cssCollection[i].disabled = true;
    }
    document.documentElement.append(link); 
    cssCodefied = true;
    browser.storage.local.set({codefyValue: true});
    setFavicon();
    // check value stored
    browser.storage.local.get()
    .then(function(value) {
        console.log('stored value is: ' + value.codefyValue);
    });
}

const unCodefyCss = () => {
    for (let i = 1; i < cssCollection.length; i++) {
        cssCollection[i].disabled = false;
    }
    let element = document.getElementById('codefy');
    element.parentNode.removeChild(element);
    cssCodefied = false;
    browser.storage.local.set({codefyValue: false});
    setFavicon();
        // check value stored
        browser.storage.local.get()
        .then(function(value) {
            console.log('stored value is: ' + value.codefyValue);
        });
}

const setFavicon = function(){
    const nodeList = document.getElementsByTagName("link");
    for (let i = 0; i < nodeList.length; i++)
    {
        if((nodeList[i].getAttribute("rel") == "icon")||(nodeList[i].getAttribute("rel") == "shortcut icon")) {
            if (cssCodefied === true) {
                favUrl = nodeList[i].getAttribute("href");
                nodeList[i].setAttribute("href", browser.runtime.getURL("icons/favicon.ico"));
            } else {
                nodeList[i].setAttribute("href", favUrl);
            }
        }
    }     
}

const toggleCss = () => {
    if (cssCodefied === '') {
    browser.storage.local.get()
    .then(function(response) {
        if (response.codefyValue === true) {
            unCodefyCss();
        } else if (response.codefyValue === false) {
            codefyCss();
        } else {
        }
    });
    } else if (cssCodefied === true){
        unCodefyCss();
    } else {
        codefyCss();
    }
}
browser.runtime.onMessage.addListener(toggleCss);

window.addEventListener('DOMContentLoaded', (event) => {
    browser.storage.local.get()
    .then(function(response) {
        if (response.codefyValue === true) {
            codefyCss();
        } else {
            browser.storage.local.set({codefyValue: false})
        }
    })
});

