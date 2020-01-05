let favUrl = "";
let cssCodefied = "";
const cssCollection = document.styleSheets;

const codefyCss = tabId => {
  const link = document.createElement("link");
  link.id = "codefy";
  link.rel = "stylesheet";
  link.type = "text/css";
  link.href = browser.runtime.getURL("style.css");

  for (let i = 1; i < cssCollection.length; i++) {
    cssCollection[i].disabled = true;
  }
  document.documentElement.append(link);
  cssCodefied = true;
  let obj = { codefyValue: { [tabId]: true } };
  browser.storage.local.set(obj);
  setFavicon();
  browser.runtime.sendMessage({
    message: "setIcon",
    tabId: tabId
  });
};

const unCodefyCss = tabId => {
  for (let i = 1; i < cssCollection.length; i++) {
    cssCollection[i].disabled = false;
  }
  let element = document.getElementById("codefy");
  element.parentNode.removeChild(element);
  cssCodefied = false;
  let obj = { codefyValue: { [tabId]: false } };
  browser.storage.local.set(obj);
  setFavicon();
  browser.storage.local.get().then(function(value) {});
  browser.runtime.sendMessage({
    message: "unSetIcon",
    tabId: tabId
  });
};

const setFavicon = function() {
  const nodeList = document.getElementsByTagName("link");
  for (let i = 0; i < nodeList.length; i++) {
    if (
      nodeList[i].getAttribute("rel") == "icon" ||
      nodeList[i].getAttribute("rel") == "shortcut icon"
    ) {
      if (cssCodefied === true) {
        favUrl = nodeList[i].getAttribute("href");
        nodeList[i].setAttribute(
          "href",
          browser.runtime.getURL("icons/favicon.ico")
        );
      } else {
        nodeList[i].setAttribute("href", favUrl);
      }
    }
  }
};

const toggleCss = tabId => {
  if (cssCodefied === "" || cssCodefied === false) {
    codefyCss(tabId);
  } else {
    unCodefyCss(tabId);
  }
};

browser.runtime.onMessage.addListener(request => {
  if (request.action === "buttonClick") {
    toggleCss(request.tabId);
  } else if (request.action === "tabUpdated") {
    browser.storage.local.get().then(function(response) {
      if (typeof response.codefyValue !== "undefined") {
        let tabNumb = request.tabId;
        if (response.codefyValue[tabNumb] === true) {
          codefyCss(tabNumb);
        }
      }
    });
  }
});
