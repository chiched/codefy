var sendMessage = (tab) => {
    browser.tabs.sendMessage(
    tab.id,                   
    {message:  "Button clicked" }                                
  )
};

  browser.browserAction.onClicked.addListener(sendMessage);