/**
 * Admin Panel JavaScript for OTIMI Source Website
 * Optimized for performance
 */

// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    // Initialize all functionality
    checkAuth();
    initLoginForm();
    initLogout();
    initProductManagement();
    highlightActiveMenu();
});

/**
 * Authentication handling - Check if user is logged in
 */
function checkAuth() {
    const isAuthenticated = localStorage.getItem('otimi_admin_auth');
    const currentPage = window.location.pathname;
    
    // Handle login page vs. admin pages
    if (currentPage.includes('admin-login.html')) {
        // If already authenticated, redirect to admin panel
        if (isAuthenticated === 'true') {
            window.location.href = 'admin-panel.html';
        }
    } else {
        // If not authenticated and not on login page, redirect to login
        if (isAuthenticated !== 'true') {
            window.location.href = 'admin-login.html';
        }
    }
}

/**
 * Initialize login form functionality
 */
function initLoginForm() {
    const loginForm = document.getElementById('login-form');
    if (!loginForm) return;
    
    loginForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const username = document.getElementById('username').value;
        const password = document.getElementById('password').value;
        
        // For demonstration: hardcoded credentials
        // In a real implementation, this would use a secure authentication API
        if (username === 'admin' && password === 'OtimiSource2025!') {
            // Set authentication in localStorage
            localStorage.setItem('otimi_admin_auth', 'true');
            
            // Redirect to admin panel
            window.location.href = 'admin-panel.html';
        } else {
            // Show error message
            const errorMessage = document.getElementById('error-message');
            if (errorMessage) {
                errorMessage.classList.add('show');
            }
        }
    });
}

/**
 * Initialize logout functionality
 */
function initLogout() {
    const logoutBtn = document.getElementById('logout-btn');
    if (!logoutBtn) return;
    
    logoutBtn.addEventListener('click', function() {
        // Clear authentication from localStorage
        localStorage.removeItem('otimi_admin_auth');
        
        // Redirect to login page
        window.location.href = 'admin-login.html';
    });
}

/**
 * Initialize product management features
 */
function initProductManagement() {
    initProductModals();
    initEditButtons();
    initDeleteButtons();
    initProductForm();
}

/**
 * Initialize product modal handling
 */
function initProductModals() {
    // Get modal elements
    const productModal = document.getElementById('product-modal');
    const deleteModal = document.getElementById('delete-modal');
    const addProductBtn = document.getElementById('add-product-btn');
    const closeModalBtn = document.getElementById('close-modal');
    const cancelProductBtn = document.getElementById('cancel-product');
    const closeDeleteModalBtn = document.getElementById('close-delete-modal');
    const cancelDeleteBtn = document.getElementById('cancel-delete');
    
    if (!productModal || !deleteModal) return;
    
    // Open product modal for new product
    if (addProductBtn) {
        addProductBtn.addEventListener('click', function() {
            // Reset form
            document.getElementById('product-form').reset();
            document.getElementById('product-id').value = '';
            document.getElementById('modal-title').textContent = 'Add New Product';
            productModal.classList.add('active');
        });
    }
    
    // Close product modal
    if (closeModalBtn) {
        closeModalBtn.addEventListener('click', function() {
            productModal.classList.remove('active');
        });
    }
    
    if (cancelProductBtn) {
        cancelProductBtn.addEventListener('click', function() {
            productModal.classList.remove('active');
        });
    }
    
    // Close delete modal
    if (closeDeleteModalBtn) {
        closeDeleteModalBtn.addEventListener('click', function() {
            deleteModal.classList.remove('active');
        });
    }
    
    if (cancelDeleteBtn) {
        cancelDeleteBtn.addEventListener('click', function() {
            deleteModal.classList.remove('active');
        });
    }
}

/**
 * Initialize edit buttons functionality
 */
function initEditButtons() {
    const editBtns = document.querySelectorAll('.edit-btn');
    if (!editBtns.length) return;
    
    const productModal = document.getElementById('product-modal');
    if (!productModal) return;
    
    editBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            const productId = this.getAttribute('data-id');
            
            // Get product data from demo database
            const productData = getProductById(productId);
            
            if (productData) {
                // Populate form with product data
                document.getElementById('product-id').value = productData.id;
                document.getElementById('product-name').value = productData.name;
                document.getElementById('product-category').value = productData.category;
                document.getElementById('product-description').value = productData.description;
                document.getElementById('product-features').value = productData.features;
                document.getElementById('product-status').value = productData.status;
                
                document.getElementById('modal-title').textContent = 'Edit Product';
                productModal.classList.add('active');
            }
        });
    });
}

/**
 * Initialize delete buttons functionality
 */
let productToDelete;
function initDeleteButtons() {
    const deleteBtns = document.querySelectorAll('.delete-btn');
    if (!deleteBtns.length) return;
    
    const deleteModal = document.getElementById('delete-modal');
    if (!deleteModal) return;
    
    deleteBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            productToDelete = this.getAttribute('data-id');
            deleteModal.classList.add('active');
        });
    });
    
    // Confirm delete
    const confirmDeleteBtn = document.getElementById('confirm-delete');
    if (confirmDeleteBtn) {
        confirmDeleteBtn.addEventListener('click', function() {
            // In a real implementation, you would send a delete request to the server
            // For demonstration, we'll just remove the row from the table
            const row = document.querySelector(`.delete-btn[data-id="${productToDelete}"]`).closest('tr');
            if (row) {
                row.remove();
                
                // Show a success message
                alert('Product deleted successfully!');
            }
            
            // Close the modal
            deleteModal.classList.remove('active');
        });
    }
}

/**
 * Initialize product form submission
 */
function initProductForm() {
    const productForm = document.getElementById('product-form');
    if (!productForm) return;
    
    productForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Get form data
        const productId = document.getElementById('product-id').value;
        const productName = document.getElementById('product-name').value;
        const productCategory = document.getElementById('product-category').value;
        const productStatus = document.getElementById('product-status').value;
        
        // In a real implementation, you would send the data to the server
        // For demonstration, we'll just show a success message
        
        if (productId) {
            // Update existing product
            alert(`Product "${productName}" updated successfully!`);
        } else {
            // Add new product
            alert(`Product "${productName}" added successfully!`);
            
            // Add a new row to the table
            addProductToTable({
                name: productName,
                category: productCategory,
                status: productStatus
            });
        }
        
        // Close the modal
        document.getElementById('product-modal').classList.remove('active');
    });
}

/**
 * Add a new product to the table
 */
function addProductToTable(product) {
    const tableBody = document.getElementById('products-table-body');
    if (!tableBody) return;
    
    const newId = 'new_' + Date.now(); // Generate a unique ID
    
    const newRow = document.createElement('tr');
    newRow.innerHTML = `
        <td>${product.name}</td>
        <td>${product.category}</td>
        <td>${product.status}</td>
        <td>
            <div class="action-btns">
                <button class="action-btn edit-btn" data-id="${newId}">Edit</button>
                <button class="action-btn delete-btn" data-id="${newId}">Delete</button>
            </div>
        </td>
    `;
    
    tableBody.appendChild(newRow);
    
    // Add event listeners to new buttons
    const newEditBtn = newRow.querySelector('.edit-btn');
    const newDeleteBtn = newRow.querySelector('.delete-btn');
    
    newEditBtn.addEventListener('click', function() {
        alert('Edit functionality would be added for this new item');
    });
    
    newDeleteBtn.addEventListener('click', function() {
        productToDelete = newId;
        document.getElementById('delete-modal').classList.add('active');
    });
}

/**
 * Get product data by ID (demo data)
 */
function getProductById(id) {
    // Demo database
    const products = {
        '1': {
            id: 1,
            name: 'Enterprise AI & Data Integration Platform',
            category: 'Core Platform',
            description: 'Our Enterprise AI & Data Integration Platform transforms your business by connecting systems, automating processes, and enabling data-driven decisions across industries.',
            features: 'Intelligent Reporting & Analytics\nProcess Automation Suite\nEnterprise Data Integration\nDigital Transformation Strategy',
            status: 'Active'
        },
        '2': {
            id: 2,
            name: 'IntelliForce AI',
            category: 'SaaS',
            description: 'Our Service as Software (SaaS) offerings put the power of AI automation directly into your hands. IntelliForce AI provides cloud-based, subscription-model AI solutions.',
            features: 'AI-powered customer service chatbots\nPredictive maintenance platforms\nFraud detection and prevention tools\nAI-driven sales and marketing automation',
            status: 'Active'
        },
        '3': {
            id: 3,
            name: 'WorkforceOS™',
            category: 'Talent Platform',
            description: 'Our flagship intelligent talent platform revolutionizes how organizations manage, develop, and optimize their workforce through AI-powered insights and automation.',
            features: 'AI Implementation & Solutions\nCustomForge™\nSkillForge™\nStrategyCompass™\nIntegrationHub™',
            status: 'Active'
        },
        '4': {
            id: 4,
            name: 'CustomForge™',
            category: 'Development Platform',
            description: 'Development platform for custom business applications, enabling organizations to create tailored solutions for their unique requirements.',
            features: 'No-code development interface\nAPI connectivity\nCustom business logic\nIntegration with other OTIMI products',
            status: 'Draft'
        }
    };
    
    return products[id];
}

/**
 * Highlight active sidebar menu item
 */
function highlightActiveMenu() {
    const currentPath = window.location.pathname;
    const sidebarLinks = document.querySelectorAll('.menu-link');
    
    if (!sidebarLinks.length) return;
    
    sidebarLinks.forEach(link => {
        const href = link.getAttribute('href');
        if (currentPath.includes(href)) {
            link.classList.add('active');
        }
    });
}