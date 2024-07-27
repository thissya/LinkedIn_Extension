document.getElementById('scrape').addEventListener('click', () => {
    chrome.tabs.query({ active: true, currentWindow: true }, tabs => {
        const url = tabs[0].url;
        chrome.storage.local.get('profiles', (data) => {
            if (data.profiles && data.profiles[url]) {
                console.log("Profiles already scraped for this URL.");
                displayProfiles(url);
            } else {
                chrome.scripting.executeScript({
                    target: { tabId: tabs[0].id },
                    files: ['content.js']
                });
            }
        });
    });
});

function displayProfiles(url) {
    chrome.storage.local.get('profiles', (data) => {
        const profileList = document.getElementById('profileList');
        profileList.innerHTML = '';
        if (data.profiles && data.profiles[url] && data.profiles[url].length > 0) {
            data.profiles[url].forEach(profile => {
                const li = document.createElement('li');
                li.textContent = profile;
                profileList.appendChild(li);
            });
        } else {
            profileList.textContent = 'No profiles found.';
        }
    });
}

// Automatically display profiles for the current tab when the popup is opened
chrome.tabs.query({ active: true, currentWindow: true }, tabs => {
    displayProfiles(tabs[0].url);
});