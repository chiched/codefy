
let cssCodefied = false;
let favUrl = '';

const toggleCss = () => {
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
    } else {
        for (let i = 1; i < cssCollection.length; i++) {
            cssCollection[i].disabled = false;
        }
        let element = document.getElementById('codefy');
        element.parentNode.removeChild(element);

        cssCodefied = false;
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
