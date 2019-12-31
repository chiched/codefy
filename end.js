
let favUrl = '';


const codefyCss = () => { 
    const cssCollection = document.styleSheets;
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
    browser.storage.local.set({codefyValue: true})
    .then(console.log('local storage set to true'));
    setFavicon();
}

const unCodefyCss = () => {
    const cssCollection = document.styleSheets;

    for (let i = 1; i < cssCollection.length; i++) {
        cssCollection[i].disabled = false;
    }
    let element = document.getElementById('codefy');
    element.parentNode.removeChild(element);
    cssCodefied = false;
    browser.storage.local.set({codefyValue: false})
    .then(console.log('local storage set to false'));
    setFavicon();
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
    browser.storage.local.get()
    .then(function(response) {
        console.log(response);
        if (response.codefyValue === true) {
            console.log('response is true');
            unCodefyCss();
        } else if (response.codefyValue === false) {
            console.log('response is false');
            codefyCss();
        } else {
            console.log('no value stored');
        }
    });
}
browser.runtime.onMessage.addListener(toggleCss);

window.addEventListener('DOMContentLoaded', (event) => {
    console.log('dom loaded');
    browser.storage.local.get()
    .then(function(response) {
        if (response.codefyValue === true) {
            codefyCss();
        } else {
            browser.storage.local.set({codefyValue: false})
        }
    })
});

