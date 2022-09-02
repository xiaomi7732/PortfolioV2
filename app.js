const pages = [
    {
        "name": "page1",
        "path": ["/", "/index.html", "/404.html"]
    },
    {
        "name": "page2",
        "path": ["/videos"]
    },
    {
        "name": "page3",
        "path": ["/projects"]
    }
];

const activePageClass = 'main-page-content active';
const hiddenPageClass = 'main-page-content';

document.addEventListener('DOMContentLoaded', () => {
    console.log('doc is ready. Start the script!');

    hideAllPages();

    let pageName = getPageName();
    goToPage(pageName);
});

window.onpopstate = (e => {
    console.log(`Popped history: ${e.state}`);
    if (!!e.state) {
        goToPage(e.state);
    }
});

function hideAllPages() {
    pages.forEach(p => {
        let pageDiv = document.getElementById(p.name);
        if (!!pageDiv) {
            console.log('Hiding page: ' + pageDiv.id);
            pageDiv.setAttribute('class', hiddenPageClass);
        }
    });
}

function navigateTo(route) {
    console.log(`Invoking navigate to ${route}`);
    let pageName = getPageName(route);
    window.history.pushState(pageName, "", route);
    console.log(`Navigating to page: ${pageName}`);
    goToPage(pageName);
}

function goToPage(pageName) {
    console.log(`Go to page by name: ${pageName}`)

    if (!pageName) {
        console.log('Use default page name.');
        pageName = "page1";
    }

    hideAllPages();

    let targetPage = document.getElementById(pageName);
    if (!!targetPage) {
        targetPage.setAttribute("class", activePageClass);
    }
}

function getPageName(path) {
    if (!path) {
        path = window.location.pathname;
    }
    path = path.toLowerCase();
    console.log(`Current path: ${path}`);

    // Route matching
    let page = null;
    pages.forEach(p => {
        p.path.forEach(r => {
            // Already found one.
            if (!!page) {
                return;
            }

            // Special case for root
            if (r === '/' && path === '/') {
                console.log('Routing special: /');
                page = p.name;
            }

            if (r !== '/' && path.startsWith(r)) {
                console.log(`Hit by routing. Location: ${path}, Route: ${r}`)
                page = p.name;
            }
        });
    });

    if (!page) {
        page = pages[0].name;
        console.log(`No route matched. Falls back to default: ${page}`);
    }
    // Haven't returned yet?
    console.log(`Decided page name: ${page}`);
    return page;
}