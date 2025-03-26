/**
 * Main JavaScript file for Otimi Source website - Optimized for performance
 */

// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    // Initialize all functionality
    initMobileMenu();
    highlightCurrentPage();
    initTabSystem();
    initSmoothScrolling();
});

/**
 * Mobile menu functionality
 */
function initMobileMenu() {
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const navLinks = document.querySelector('.nav-links');
    
    // Only proceed if elements exist
    if (!mobileMenuBtn || !navLinks) return;
    
    // Toggle mobile menu on click
    mobileMenuBtn.addEventListener('click', function(e) {
        e.preventDefault();
        navLinks.classList.toggle('active');
    });
    
    // Close mobile menu when clicking outside
    document.addEventListener('click', function(event) {
        if (!navLinks.contains(event.target) && 
            !mobileMenuBtn.contains(event.target) && 
            navLinks.classList.contains('active')) {
            navLinks.classList.remove('active');
        }
    });
}

/**
 * Highlight current page in navigation
 */
function highlightCurrentPage() {
    // Get current page filename from URL
    const path = window.location.pathname;
    const currentPage = path.split('/').pop() || 'index.html';
    
    // Select all navigation links
    const navLinks = document.querySelectorAll('.nav-links a');
    
    // For each link, check if it matches current page
    navLinks.forEach(link => {
        const href = link.getAttribute('href');
        
        // Check various conditions for matching current page
        if (href === currentPage || 
            (currentPage === '' && href === 'index.html') || 
            (currentPage === '/' && href === 'index.html') ||
            (href.includes('#') && href.split('#')[0] === currentPage)) {
            
            link.classList.add('active');
        }
    });
}

/**
 * Tab system for solutions section
 */
function initTabSystem() {
    const tabBtns = document.querySelectorAll('.tab-btn');
    const solutionContent = document.querySelector('.solution-content');
    
    // Only proceed if elements exist
    if (!tabBtns.length || !solutionContent) return;
    
    // Define tab content
    const solutions = [
        {
            title: "Enterprise AI & Data Integration Platform",
            content: `<p>Our Enterprise AI & Data Integration Platform transforms your business by connecting systems, automating processes, and enabling data-driven decisions across industries.</p>
            <p><strong>Key Features:</strong></p>
            <ul>
                <li>Intelligent Reporting & Analytics</li>
                <li>Process Automation Suite</li>
                <li>Enterprise Data Integration</li>
                <li>Digital Transformation Strategy</li>
            </ul>
            <p>Our platform cuts manual work by up to 50%, reduces administrative costs by 10–12%, and delivers real-time insights for smarter decisions.</p>`
        },
        {
            title: "IntelliForce AI",
            content: `<p>Our Service as Software (SaaS) offerings put the power of AI automation directly into your hands. IntelliForce AI provides cloud-based, subscription-model AI solutions that are scalable, accessible, and easy to deploy.</p>
            <p><strong>SaaS Solutions Offered:</strong></p>
            <ul>
                <li>AI-powered customer service chatbots</li>
                <li>Predictive maintenance platforms for industrial equipment</li>
                <li>Fraud detection and prevention tools</li>
                <li>AI-driven sales and marketing automation</li>
            </ul>`
        },
        {
            title: "WorkforceOS™",
            content: `<p>Our flagship intelligent talent platform revolutionizes how organizations manage, develop, and optimize their workforce through AI-powered insights and automation.</p>
            <p><strong>Components:</strong></p>
            <ul>
                <li>AI Implementation & Solutions - Practical AI applications solving real business problems</li>
                <li>CustomForge™ - Development platform for custom business applications</li>
                <li>SkillForge™ - AI-driven learning management system</li>
                <li>StrategyCompass™ - Digital transformation advisory platform</li>
            </ul>`
        },
        {
            title: "Industry Solutions",
            content: `<p>We offer specialized AI solutions tailored to the unique challenges and opportunities in various industries.</p>
            <p><strong>Industry Applications:</strong></p>
            <ul>
                <li><strong>Construction & Real Estate:</strong> Streamline project reporting and documentation</li>
                <li><strong>Manufacturing:</strong> Optimize production workflows and supply chain visibility</li>
                <li><strong>Healthcare:</strong> Enhance patient data management and operational efficiency</li>
                <li><strong>Financial Services:</strong> Streamline compliance reporting and customer analytics</li>
            </ul>`
        }
    ];
    
    // Add click event for each tab button
    tabBtns.forEach((btn, index) => {
        btn.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Remove active class from all buttons
            tabBtns.forEach(b => b.classList.remove('active'));
            
            // Add active class to clicked button
            btn.classList.add('active');
            
            // Update content
            if (index < solutions.length) {
                solutionContent.innerHTML = `<h3>${solutions[index].title}</h3>${solutions[index].content}`;
            }
        });
    });
}

/**
 * Smooth scrolling for anchor links
 */
function initSmoothScrolling() {
    const anchorLinks = document.querySelectorAll('a[href^="#"]');
    
    // Only proceed if elements exist
    if (!anchorLinks.length) return;
    
    anchorLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            
            // Skip empty anchors
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                // Scroll to element with offset for fixed header
                window.scrollTo({
                    top: targetElement.offsetTop - 70,
                    behavior: 'smooth'
                });
                
                // Close mobile menu if open
                const navLinks = document.querySelector('.nav-links');
                if (navLinks && navLinks.classList.contains('active')) {
                    navLinks.classList.remove('active');
                }
            }
        });
    });
}