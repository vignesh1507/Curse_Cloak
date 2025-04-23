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
                removeButton.className = 'remove-button';
                removeButton.onclick = () => removeSite(index);
                li.appendChild(removeButton);
                whitelistElement.appendChild(li);
            });
            
            // Show "no sites" message if list is empty
            if (whitelistedSites.length === 0) {
                const emptyMessage = document.createElement('p');
                emptyMessage.textContent = 'No websites have been whitelisted yet.';
                emptyMessage.className = 'empty-message';
                whitelistElement.appendChild(emptyMessage);
            }
        });
    }

    function addSite() {
        const newSite = websiteInput.value.trim();
        if (newSite) {
            chrome.storage.sync.get(['whitelistedSites'], function(result) {
                const whitelistedSites = result.whitelistedSites || [];
                
                // Check if site already exists
                if (whitelistedSites.includes(newSite)) {
                    alert('This website is already in your whitelist.');
                    return;
                }
                
                whitelistedSites.push(newSite);

                chrome.storage.sync.set({ whitelistedSites }, function() {
                    websiteInput.value = '';
                    loadWhitelist();
                });
            });
        } else {
            alert('Please enter a valid website URL');
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
    
    // Also add Enter key support for the input field
    websiteInput.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            addSite();
        }
    });

    loadWhitelist();
});