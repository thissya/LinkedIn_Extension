
document.getElementById('scrape').addEventListener('click', () => {
    chrome.tabs.query({ active: true, currentWindow: true }, tabs => {
        chrome.scripting.executeScript({
            target: { tabId: tabs[0].id },
            files: ['content.js']
        });
    });
});


chrome.storage.local.get('profiles', (data) => {
    const profileList = document.getElementById('profileList');
    profileList.innerHTML = '';
    if (data.profiles && data.profiles.length > 0) {
        data.profiles.forEach(profile => {
            const li = document.createElement('li');
            li.textContent = profile;
            profileList.appendChild(li);
        });
    } else {
        profileList.textContent = 'No profiles found.';
    }
});
