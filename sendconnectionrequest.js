// npm install @wdio/cli @wdio/local-runner @wdio/mocha-framework @wdio/sync selenium-standalone
// npx wdio config

const { remote } = require('webdriverio');

async function sendConnectionRequest(profileUrl) {
    const browser = await remote({
        logLevel: 'info',
        path: '/',
        capabilities: {
            browserName: 'chrome'
        }
    });

    try {
        // Open LinkedIn login page
        await browser.url('https://www.linkedin.com/login');

        // Enter login credentials
        await browser.setValue('#username', 'your-email@example.com');
        await browser.setValue('#password', 'your-password');
        await browser.click('.btn__primary--large');

        // Wait for login to complete
        await browser.pause(5000);

        // Navigate to the profile URL
        await browser.url(profileUrl);

        // Click the 'Connect' button
        await browser.click('button[data-control-name="connect"]');

        // Confirm the connection request
        await browser.click('button[aria-label="Send now"]');

        console.log(`Connection request sent to ${profileUrl}`);
    } catch (error) {
        console.error('Error sending connection request:', error);
    } finally {
        await browser.deleteSession();
    }
}

// Example usage
const profiles = ['https://www.linkedin.com/in/example1', 'https://www.linkedin.com/in/example2'];
profiles.forEach(sendConnectionRequest);

// node sendConnectionRequest.js