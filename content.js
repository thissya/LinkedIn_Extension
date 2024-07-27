function scrapeLinkedInProfiles() {

    console.log("Content script is running...");

    const links = document.querySelectorAll('a[href*="linkedin.com/"]');
    console.log(`Found ${links.length} LinkedIn links.`);
    
    const profiles = Array.from(links).map(link => link.href);
    console.log("Scraped profiles:", profiles);  // Debugging
    
    chrome.runtime.sendMessage({ type: 'profiles', profiles: profiles });
}

scrapeLinkedInProfiles();
