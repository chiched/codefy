
let cssCodefied = '';
let favUrl = '';

function onTabCreated() {
    console.log('New tab opened')
}
browser.tabs.onCreated.addListener(onTabCreated)

function gotVar(item) {
    console.log('gotVar activated');
        toggleCss();
}

function notGotVar(item) {
    console.log('noGotVar activated');
    console.log(item)
}

browser.storage.local.get()
.then(gotVar, notGotVar);


const toggleCss = () => {
    console.log('toggleCss started');
    // create link to external stylesheet
    const cssCollection = document.styleSheets;
    const link = document.createElement('link'); 
    link.id = 'codefy'
    link.rel = 'stylesheet';  
    link.type = 'text/css'; 
    link.href = browser.runtime.getURL("style.css");

    if (cssCodefied === false) {
        for (let i = 1; i < cssCollection.length; i++) {
            cssCollection[i].disabled = true;
        }
        document.documentElement.append(link); 
        cssCodefied = true;
        browser.storage.local.set({codefyValue: true})
  .then(console.log('local storage set to true'));
    } else if (cssCodefied === true) {
        for (let i = 1; i < cssCollection.length; i++) {
            cssCollection[i].disabled = false;
        }
        let element = document.getElementById('codefy');
        element.parentNode.removeChild(element);

        cssCodefied = false;
        browser.storage.local.set({codefyValue: false})
        .then(console.log('local storage set to false'));
    } else {
        console.log('nothing stored');
    }
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

browser.runtime.onMessage.addListener(toggleCss);



