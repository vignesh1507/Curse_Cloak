document.addEventListener('DOMContentLoaded', function() {
    const websiteInput = document.getElementById('websiteInput');
    const addSiteButton = document.getElementById('addSite');
    const whitelistElement = document.getElementById('whitelist');

    // load and display the whitelisted sites
    function loadWhitelist() {
        chrome.storage.sync.get(['whitelistedSites'], function(result) {
            const whitelistedSites = result.whitelistedSites || [];
            whitelistElement.innerHTML = '';

            whitelistedSites.forEach((site, index) => {
                const li = document.createElement('li');
                li.textContent = site;
                const removeButton = document.createElement('button');
                removeButton.textContent = 'Remove';
                removeButton.onclick = () => removeSite(index);
                li.appendChild(removeButton);
                whitelistElement.appendChild(li);
            });
        });
    }

    function addSite() {
        const newSite = websiteInput.value.trim();
        if (newSite) {
            chrome.storage.sync.get(['whitelistedSites'], function(result) {
                const whitelistedSites = result.whitelistedSites || [];
                whitelistedSites.push(newSite);

                chrome.storage.sync.set({ whitelistedSites }, function() {
                    websiteInput.value = '';
                    loadWhitelist();
                });
            });
        }
    }

    function removeSite(index) {
        chrome.storage.sync.get(['whitelistedSites'], function(result) {
            const whitelistedSites = result.whitelistedSites || [];
            whitelistedSites.splice(index, 1);

            chrome.storage.sync.set({ whitelistedSites }, function() {
                loadWhitelist();
            });
        });
    }

    addSiteButton.addEventListener('click', addSite);

    loadWhitelist();
});
