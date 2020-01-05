
let favUrl = '';
let cssCodefied = '';
const cssCollection = document.styleSheets;

const codefyCss = (tabId) => { 
    console.log('codefyCss activated for tabid: ' + tabId);
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
    let obj = {codefyValue: {[tabId] : true}};
    browser.storage.local.set(obj);
    setFavicon();
    // check value stored
    browser.storage.local.get()
    .then(function(value) {
        console.log('stored value is: ' + value.codefyValue.tabId);
    });
    browser.runtime.sendMessage({
        message: "setIcon",
        tabId: tabId
      });
}

const unCodefyCss = (tabId) => {
    console.log('unCodefyCss activated for tabid: ' + tabId);
    for (let i = 1; i < cssCollection.length; i++) {
        cssCollection[i].disabled = false;
    }
    console.log('next line should delete the css link');
    let element = document.getElementById('codefy');
    console.log('element should be :' + element);
    element.parentNode.removeChild(element);
    console.log('element should be deleted');
    cssCodefied = false;
    let obj = {codefyValue: {[tabId] : false}};
    browser.storage.local.set(obj);
    setFavicon();
        // check value stored
        browser.storage.local.get()
        .then(function(value) {
            console.log('stored value is: ' + value.codefyValue.tabId);
        });
        browser.runtime.sendMessage({
            message: "unSetIcon",
            tabId: tabId
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

const toggleCss = (tabId) => {
    if (cssCodefied === '') {
    browser.storage.local.get()
    .then(function(response) {
        if (response.codefyValue.tabId === true) {
            unCodefyCss(tabId);
        } else{
            codefyCss(tabId);
        }
    });
    } else if (cssCodefied === true){
        unCodefyCss(tabId);
    } else {
        codefyCss(tabId);
    }
}
browser.runtime.onMessage.addListener((request) => {
    // if (request.action === 'newTab') {
    //     console.log('newTaaaaaab')
    //     return Promise.resolve({response: cssCodefied});
    // } 
    if (request.action === 'buttonClick') {
        console.log('button is clicked ' + request.tabId);
        toggleCss(request.tabId);
    } else if (request.action === 'tabUpdated') {
        console.log('message received for tab: ' + request.tabId + ' Action: ' + request.action);
        browser.storage.local.get()
        .then(function(response) {
            console.log(response);
            console.log(request.tabId);
            let tabNumb = request.tabId;
            console.log(response.codefyValue[tabNumb]);
            if (response.codefyValue[tabNumb] === true) {
                codefyCss(tabNumb);
                console.log('success');
               
            }
        });
    }
});



// window.addEventListener('DOMContentLoaded', (event) => {
//     browser.storage.local.get()
//     .then(function(response) {
//         if (response.codefyValue === true) {
//             codefyCss();
//         } else {
//             browser.storage.local.set({codefyValue: false})
//         }
//     })
// });

