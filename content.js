function scrapeLinkedInProfiles() {
    console.log("Content script is running...");

    const url = window.location.href;

    chrome.storage.local.get('profiles', (data) => {
        if (data.profiles && data.profiles[url]) {
            console.log("Profiles already scraped for this URL.");
            return;  // Exit if profiles are already scraped
        }

        const links = document.querySelectorAll('a[href*="linkedin.com/"]');
        console.log(`Found ${links.length} LinkedIn links.`);
        
        const profiles = Array.from(links).map(link => link.href);
        console.log("Scraped profiles:", profiles);  
        
        chrome.runtime.sendMessage({ type: 'profiles', url: url, profiles: profiles });
    });
}

scrapeLinkedInProfiles();