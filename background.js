var setIcon = tabId => {
  browser.browserAction.setIcon({
    path: "icons/favicon-activated-32x32.png",
    tabId: tabId
  });
};

var unsetIcon = tabId => {
  browser.browserAction.setIcon({
    path: "icons/favicon-32x32.png",
    tabId: tabId
  });
};

var sendClick = tab => {
  browser.tabs.sendMessage(tab.id, {
    action: "buttonClick",
    tabId: tab.id
  });
};

var checkStatus = (tab, changeInfo) => {
  if (changeInfo.status === "complete") {
    browser.tabs.sendMessage(tab, { action: "tabUpdated", tabId: tab });
  }
};

var updateIcon = response => {
  if (response.message === "setIcon") {
    setIcon(response.tabId);
  } else if (response.message === "unSetIcon") {
    unsetIcon(response.tabId);
  }
};

browser.browserAction.onClicked.addListener(sendClick);
browser.tabs.onUpdated.addListener(checkStatus);
browser.runtime.onMessage.addListener(updateIcon);
