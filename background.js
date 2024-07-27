let profiles = [];


chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    if (message.type === 'profiles') {
        profiles = message.profiles;
        console.log('Scraped profiles:', profiles);
        chrome.storage.local.set({ profiles: profiles });
    }
});
