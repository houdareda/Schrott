// Main JavaScript File

// Header Scroll Behavior
let lastScroll = 0;
const header = document.getElementById('header');
const mobileMenuToggle = document.getElementById('mobileMenuToggle');
const headerNav = document.getElementById('headerNav');
const dropdownItems = document.querySelectorAll('.nav-item-dropdown');

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    
    // Close mobile menu on scroll
    if (window.innerWidth <= 992 && mobileMenuToggle && headerNav) {
        if (headerNav.classList.contains('active')) {
            mobileMenuToggle.classList.remove('active');
            headerNav.classList.remove('active');
            // Close all dropdowns
            dropdownItems.forEach(item => {
                item.classList.remove('active');
            });
        }
    }
    
    if (currentScroll <= 0) {
        header.classList.remove('hidden');
        return;
    }
    
    if (currentScroll > lastScroll && !header.classList.contains('hidden')) {
        // Scrolling down
        header.classList.add('hidden');
    } else if (currentScroll < lastScroll && header.classList.contains('hidden')) {
        // Scrolling up
        header.classList.remove('hidden');
    }
    
    lastScroll = currentScroll;
});

// Mobile Menu Toggle

if (mobileMenuToggle && headerNav) {
    mobileMenuToggle.addEventListener('click', () => {
        mobileMenuToggle.classList.toggle('active');
        headerNav.classList.toggle('active');
    });
    
    // Close menu when clicking on a link (except dropdown items)
    const navLinks = headerNav.querySelectorAll('.nav-link:not(.dropdown-trigger)');
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            if (window.innerWidth <= 992) {
                mobileMenuToggle.classList.remove('active');
                headerNav.classList.remove('active');
            }
        });
    });
    
    // Close menu when clicking on dropdown menu items
    const dropdownMenuLinks = headerNav.querySelectorAll('.dropdown-menu a');
    dropdownMenuLinks.forEach(link => {
        link.addEventListener('click', () => {
            if (window.innerWidth <= 992) {
                mobileMenuToggle.classList.remove('active');
                headerNav.classList.remove('active');
                // Close dropdown
                dropdownItems.forEach(item => {
                    item.classList.remove('active');
                });
            }
        });
    });
}

// Dropdown Menu Toggle on Mobile

dropdownItems.forEach(item => {
    const trigger = item.querySelector('.dropdown-trigger');
    
    if (trigger) {
        trigger.addEventListener('click', (e) => {
            e.preventDefault();
            e.stopPropagation();
            if (window.innerWidth <= 992) {
                item.classList.toggle('active');
            }
        });
    }
});

// Close dropdown when clicking outside
document.addEventListener('click', (e) => {
    if (window.innerWidth <= 992) {
        dropdownItems.forEach(item => {
            if (!item.contains(e.target)) {
                item.classList.remove('active');
            }
        });
    }
});
