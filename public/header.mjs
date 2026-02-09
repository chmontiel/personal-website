import { toHtmlElement } from './toHtmlElement.mjs';

// Define nav links in ONE place - easy to maintain!
const NAV_LINKS = [
    { href: './index.html', text: 'Home' },
    { href: './hobbies.html', text: 'Hobbies' }
];

/**
 * Creates the navigation links HTML
 * @returns {string} HTML string for nav links
 */
function createNavLinksHtml() {
    return NAV_LINKS.map(link => 
        `<a href="${link.href}">${link.text}</a>`
    ).join('\n                ');
}

/**
 * Creates the complete header HTML
 * @returns {string} HTML string for the entire header
 */
function createHeaderHtml() {
    return `
        <header>
            <h1>Chris Montiel</h1>
            <div class="header-controls">
                <button id="menu-toggle" class="menu-toggle" aria-label="Toggle menu" aria-expanded="false">
                    <span></span>
                    <span></span>
                    <span></span>
                </button>
                <nav id="main-nav">
                    ${createNavLinksHtml()}
                </nav>
                <label class="dark-mode-toggle">
                    <input type="checkbox" id="dark-mode-checkbox" autocomplete="off" />
                    Dark mode
                </label>
            </div>
        </header>
    `;
}

/**
 * Inserts the header into the document
 */
function insertHeader() {
    const headerHtml = createHeaderHtml();
    const headerElement = toHtmlElement(headerHtml);
    
    // Insert at the beginning of body
    document.body.prepend(headerElement.firstElementChild);
    
    // Set up menu toggle functionality
    setupMenuToggle();
    
    // Set up dark mode functionality
    setupDarkMode();
    
    // Set up click outside to close menu
    setupClickOutsideClose();
}

/**
 * Sets up the mobile menu toggle functionality
 */
function setupMenuToggle() {
    const menuToggle = document.getElementById('menu-toggle');
    const nav = document.getElementById('main-nav');
    
    if (!menuToggle || !nav) return;
    
    menuToggle.addEventListener('click', () => {
        const isExpanded = menuToggle.getAttribute('aria-expanded') === 'true';
        menuToggle.setAttribute('aria-expanded', !isExpanded);
        nav.classList.toggle('active');
        menuToggle.classList.toggle('active');
    });
}

/**
 * Sets up click outside header to close menu (Lab 10 requirement)
 */
function setupClickOutsideClose() {
    const header = document.querySelector('header');
    const nav = document.getElementById('main-nav');
    const menuToggle = document.getElementById('menu-toggle');
    
    if (!header || !nav || !menuToggle) return;
    
    document.body.addEventListener('click', (event) => {
        // Check if click is outside the header
        if (!header.contains(event.target)) {
            // Close the menu if it's open
            if (nav.classList.contains('active')) {
                nav.classList.remove('active');
                menuToggle.classList.remove('active');
                menuToggle.setAttribute('aria-expanded', 'false');
            }
        }
    });
}

/**
 * Sets up dark mode toggle functionality (Lab 10 requirement)
 */
function setupDarkMode() {
    const darkModeCheckbox = document.getElementById('dark-mode-checkbox');
    
    if (!darkModeCheckbox) return;
    
    // Check for saved dark mode preference in localStorage
    const isDarkMode = localStorage.getItem('darkMode') === 'true';
    if (isDarkMode) {
        document.body.classList.add('dark-mode');
        darkModeCheckbox.checked = true;
    }
    
    // Toggle dark mode on checkbox change
    darkModeCheckbox.addEventListener('change', () => {
        const isChecked = darkModeCheckbox.checked;
        
        if (isChecked) {
            document.body.classList.add('dark-mode');
        } else {
            document.body.classList.remove('dark-mode');
        }
        
        // Save to localStorage (store as string)
        localStorage.setItem('darkMode', isChecked.toString());
    });
}

// Insert header when DOM is loaded
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', insertHeader);
} else {
    insertHeader();
}
