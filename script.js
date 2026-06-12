// script.js

// Function to set the current year in the footer
function setCurrentYear() {
    const yearSpan = document.getElementById('currentYear');
    if (yearSpan) {
        yearSpan.textContent = new Date().getFullYear();
    }
}

// Global product data - shared across product detail and wishlist pages
const productsData = {
    'beige-dress': { 
        name: 'Beige Button Trim Dress', 
        price: '$4,600', 
        img: 'src/Beige1.avif', 
        thumbs: ["src/Beige1.avif", "src/Beige2.avif", "src/Beige3.avif"],
        description: 'This dress is crafted from wool-silk cady crepe for an elegantly elevated look. Short puff sleeves add gentle volume to the silhouette, while princess seams flatter the figure. The front is trimmed with three sets of gleaming golden LV-engraved buttons for a playfully dressy finish.',
        material: '70% Wool, 30% Silk',
        size: 'XS S M L XL',
        color: 'Beige'
    },
    'maya-sandal': { 
        name: 'Maya Platform Sandal', 
        price: '$1,310', 
        img: 'src/slepah1.avif', 
        thumbs: ["src/slepah1.avif", "src/slepah2.avif", "src/slepah3.avif"],
        description: 'Elevate your style with these comfortable platform sandals. Designed with premium materials and a modern aesthetic, perfect for both casual outings and formal occasions.',
        material: 'Leather, Rubber Sole',
        size: 'US 5 6 7 8 9 10 11',
        color: 'Black'
    },
    'side-trunk': { 
        name: 'Side Trunk', 
        price: '$4,200', 
        img: 'src/tas.avif', 
        thumbs: ["src/tas.avif", "src/tas2.avif", "src/tas3.avif"],
        description: 'A timeless handbag with modern design elements. This side trunk features a spacious interior, premium leather construction, and elegant hardware accents for a sophisticated look.',
        material: 'Premium Leather',
        size: 'One Size',
        color: 'Brown'
    },
    'blend-suit': { 
        name: 'Cashmere Blend Suit', 
        price: '$4,850', 
        img: 'src/kasmirsut.avif', 
        thumbs: ["src/kasmirsut.avif", "src/kasmirsut2.avif", "src/kasmirsut3.avif"],
        description: 'Luxuriously tailored from a premium cashmere blend, this suit offers exceptional comfort and sophistication. Perfect for formal events and professional settings with impeccable craftsmanship.',
        material: '50% Cashmere, 50% Wool',
        size: 'XS S M L XL',
        color: 'Charcoal Grey'
    },
    'red-jacket': { 
        name: 'Red Leather Jacket', 
        price: '$6,500', 
        img: 'src/redjacket1.avif', 
        thumbs: ["src/redjacket1.avif", "src/redjacket2.avif", "src/redjacket3.avif"],
        description: 'Make a bold statement with this striking red leather jacket. Crafted from premium Italian leather with meticulous attention to detail, it\'s a versatile piece that elevates any wardrobe.',
        material: '100% Italian Leather',
        size: 'XS S M L XL',
        color: 'Red'
    },
    'mint-gown': { 
        name: 'Mint Helm Flounce Gown', 
        price: '$3,100', 
        img: 'src/Mint1.avif', 
        thumbs: ["src/Mint1.avif", "src/Mint2.avif", "src/Mint3.avif"],
        description: 'An ethereal mint green gown featuring delicate flounce details. Perfect for evening events and special occasions, this gown combines elegance with contemporary design.',
        material: '100% Silk Chiffon',
        size: 'XS S M L XL',
        color: 'Mint Green'
    },
    'sailor-dress': { 
        name: 'Sailor Dress', 
        price: '$2,350', 
        img: 'src/navy.avif', 
        thumbs: ["src/navy.avif", "src/navy2.avif", "src/navy3.avif"],
        description: 'Classic navy sailor dress with timeless appeal. Featuring traditional sailor details and a flattering silhouette, perfect for creating an effortlessly chic ensemble.',
        material: '65% Cotton, 35% Polyester',
        size: 'XS S M L XL',
        color: 'Navy Blue'
    },
    'short-shirt': { 
        name: 'Short-Sleeved Silk Shirt', 
        price: '$2,650', 
        img: 'src/shirt.avif', 
        thumbs: ["src/shirt.avif", "src/shirt2.avif", "src/shirt3.avif"],
        description: 'Elegant short-sleeved silk shirt with a luxurious feel. Perfect for layering or wearing on its own, this versatile piece transitions seamlessly from day to night.',
        material: '100% Pure Silk',
        size: 'XS S M L XL',
        color: 'Ivory'
    },
    'hills-bag': { 
        name: "Hills Pochette", 
        price: "$750.00", 
        img: 'src/bagg.avif', 
        thumbs: ["src/bagg.avif", "src/bagg2.avif", "src/bagg3.avif"],
        description: 'A chic pochette perfect for evening outings. Compact yet stylish, this clutch features premium materials and elegant design details for sophisticated charm.',
        material: 'Leather with Metal Hardware',
        size: 'One Size',
        color: 'Black'
    },
    'ima-perfume': { 
        name: "Imagination Perfume", 
        price: "$280.00", 
        img: 'src/parfum.avif', 
        thumbs: ["src/parfum.avif", "src/parfum2.avif", "src/parfum3.avif"],
        description: 'A captivating fragrance that inspires imagination. Blending exotic notes with elegant sophistication, this signature scent leaves a lasting impression.',
        material: 'Eau de Parfum',
        size: '100ml',
        color: 'Clear'
    }
};

function initializeProductDetailPage() {
    const mainImage = document.getElementById('mainProductImage');
    // If mainImage doesn't exist, we're not on the product detail page, so do nothing.
    if (!mainImage) {
        return;
    }

    const thumbnails = document.querySelectorAll('.thumbnail-gallery .thumbnail');
    const quantityInput = document.getElementById('quantity');
    const decreaseBtn = document.getElementById('decreaseQuantity');
    const increaseBtn = document.getElementById('increaseQuantity');
    const addToCartBtn = document.getElementById('addToCartBtn');
    const orderNowBtn = document.getElementById('orderNowBtn');
    const productNameEl = document.getElementById('productName');
    const productPriceEl = document.getElementById('productPrice');
    const thumbnailGalleryEl = document.querySelector('.thumbnail-gallery');

    thumbnails.forEach(thumb => {
        thumb.addEventListener('click', function() {
            mainImage.src = this.dataset.fullimage;
            mainImage.alt = this.alt.replace('Thumbnail', 'Main View');

            thumbnails.forEach(t => t.classList.remove('active'));
            this.classList.add('active');
        });
    });

    if (decreaseBtn && quantityInput) {
        decreaseBtn.addEventListener('click', () => {
            let currentValue = parseInt(quantityInput.value);
            if (currentValue > parseInt(quantityInput.min)) {
                quantityInput.value = currentValue - 1;
            }
        });
    }

    if (increaseBtn && quantityInput) {
        increaseBtn.addEventListener('click', () => {
            let currentValue = parseInt(quantityInput.value);
            const maxVal = quantityInput.max ? parseInt(quantityInput.max) : Infinity;
            if (currentValue < maxVal) {
                quantityInput.value = currentValue + 1;
            }
        });
    }

    if (addToCartBtn && productNameEl) {
        addToCartBtn.addEventListener('click', () => {
            alert('"' + productNameEl.textContent + '" added to cart! (Functionality not implemented)');
        });
    }

    if (orderNowBtn && productNameEl) {
        orderNowBtn.addEventListener('click', () => {
            alert('Proceeding to checkout for "' + productNameEl.textContent + '"! (Functionality not implemented)');
        });
    }

    // Simulate dynamic product loading
    const urlParams = new URLSearchParams(window.location.search);
    const productId = urlParams.get('product');

    if (productId && productNameEl && productPriceEl && thumbnailGalleryEl) {
        const product = productsData[productId];
        if (product) {
            document.title = product.name + " - Christian Wijaya";
            productNameEl.textContent = product.name;
            productPriceEl.textContent = product.price;
            mainImage.src = product.img;
            mainImage.alt = product.name + " - Main View";

            // Update description and specs
            const descriptionEl = document.querySelector('.product-description');
            const specsEl = document.querySelector('.product-specs');
            
            if (descriptionEl) {
                descriptionEl.innerHTML = `<p>${product.description}</p>`;
            }
            
            if (specsEl) {
                specsEl.innerHTML = `
                    <p><strong>Material:</strong> ${product.material}</p>
                    <p><strong>Size:</strong> ${product.size}</p>
                    <p><strong>Color:</strong> ${product.color}</p>
                `;
            }

            thumbnailGalleryEl.innerHTML = ''; // Clear existing thumbs
            product.thumbs.forEach((thumbSrc, index) => {
                const img = document.createElement('img');
                img.src = thumbSrc;
                img.alt = `Thumbnail ${index + 1} for ${product.name}`;
                img.classList.add('thumbnail');
                img.dataset.fullimage = thumbSrc; // Each thumbnail has its own image
                if (index === 0) img.classList.add('active');
                img.addEventListener('click', function() { // Re-attach listener for new thumbs
                    mainImage.src = this.dataset.fullimage;
                    mainImage.alt = this.alt.replace('Thumbnail', 'Main View');
                    document.querySelectorAll('.thumbnail-gallery .thumbnail').forEach(t => t.classList.remove('active'));
                    this.classList.add('active');
                });
                thumbnailGalleryEl.appendChild(img);
            });
        } else {
            productNameEl.textContent = "Product Not Found";
            productPriceEl.textContent = "";
            mainImage.src = "https://via.placeholder.com/600x500/ccc/000?text=Not+Found";
            thumbnailGalleryEl.innerHTML = '';
        }
    }
}

function initializeSitePanels() {
    const mobileMenuToggle = document.getElementById('mobileMenuToggle');
    const mobileNavPanel = document.getElementById('mobileNavPanel');
    const closeMobileNavButton = document.getElementById('closeMobileNav');

    const cartButton = document.getElementById('header-cart-button');
    const shoppingCartPanel = document.getElementById('shopping-cart-panel');
    const closeCartButton = document.getElementById('close-cart-button');

    const pageOverlay = document.getElementById('pageOverlay');

    function openPanel(panel) {
        if (panel) {
            panel.classList.add('active');
            pageOverlay.classList.add('active');
            document.body.style.overflow = 'hidden'; // Prevent background scroll
        }
    }

    function closePanel(panel) {
        if (panel) {
            panel.classList.remove('active');
            // Only remove overlay if no other panel is active (more advanced, for now simple close)
            pageOverlay.classList.remove('active');
            document.body.style.overflow = ''; // Restore scroll
        }
    }

    function closeAllPanels() {
        if (mobileNavPanel) mobileNavPanel.classList.remove('active');
        if (shoppingCartPanel) shoppingCartPanel.classList.remove('active');
        pageOverlay.classList.remove('active');
        document.body.style.overflow = '';
    }

    if (mobileMenuToggle && mobileNavPanel) {
        mobileMenuToggle.addEventListener('click', () => {
            openPanel(mobileNavPanel);
            mobileMenuToggle.setAttribute('aria-expanded', 'true');
        });
    }
    if (closeMobileNavButton && mobileNavPanel) {
        closeMobileNavButton.addEventListener('click', () => {
            closePanel(mobileNavPanel);
            if (mobileMenuToggle) mobileMenuToggle.setAttribute('aria-expanded', 'false');
        });
    }


    if (cartButton && shoppingCartPanel) {
        cartButton.addEventListener('click', () => {
            openPanel(shoppingCartPanel);
        });
    }
    if (closeCartButton && shoppingCartPanel) {
        closeCartButton.addEventListener('click', () => {
            closePanel(shoppingCartPanel);
        });
    }

    if (pageOverlay) {
        pageOverlay.addEventListener('click', () => {
            closeAllPanels();
            if (mobileMenuToggle) mobileMenuToggle.setAttribute('aria-expanded', 'false');
        });
    }

    // Placeholder for cart badge update
    // This would be updated based on actual cart items
    const cartBadge = document.getElementById('header-cart-badge');
    let cartItemCount = 0; // Simulate cart count
    if (cartItemCount > 0) {
        if (cartBadge) {
            cartBadge.textContent = cartItemCount;
            cartBadge.style.display = 'flex'; // 'flex' because we use it for centering
        }
        if(document.getElementById('cart-empty-message')) document.getElementById('cart-empty-message').style.display = 'none';
        if(document.getElementById('cart-summary-area')) document.getElementById('cart-summary-area').style.display = 'block';

    } else {
        if (cartBadge) cartBadge.style.display = 'none';
        if(document.getElementById('cart-empty-message')) document.getElementById('cart-empty-message').style.display = 'block';
        if(document.getElementById('cart-summary-area')) document.getElementById('cart-summary-area').style.display = 'none';
    }
}

function setActiveNavLink() {
    const navLinks = document.querySelectorAll('.main-nav.desktop-nav .nav-link, .mobile-nav-panel .nav-link');
    const currentPage = window.location.pathname.split('/').pop(); // Gets the current filename (e.g., "products.html")

    navLinks.forEach(link => {
        const linkPage = link.getAttribute('href').split('/').pop();

        // Remove active-link from all first
        link.classList.remove('active-link');

        // Add active-link to the matching link
        // Handle index.html or empty path for home
        if (currentPage === linkPage || (currentPage === '' && (linkPage === 'index.html' || linkPage === ''))) {
            link.classList.add('active-link');
        }
    });
}

// =============================================
// WISHLIST MODULE
// =============================================

// Get wishlist from localStorage
function getWishlist() {
    try {
        const wishlist = localStorage.getItem('cw_wishlist');
        return wishlist ? JSON.parse(wishlist) : [];
    } catch (e) {
        return [];
    }
}

// Save wishlist to localStorage
function saveWishlist(list) {
    localStorage.setItem('cw_wishlist', JSON.stringify(list));
}

// Check if a product is in the wishlist
function isInWishlist(productId) {
    const wishlist = getWishlist();
    return wishlist.includes(productId);
}

// Toggle a product in the wishlist
function toggleWishlist(productId) {
    let wishlist = getWishlist();
    const index = wishlist.indexOf(productId);
    if (index > -1) {
        wishlist.splice(index, 1); // Remove
    } else {
        wishlist.push(productId); // Add
    }
    saveWishlist(wishlist);
    return wishlist.includes(productId); // Returns true if added, false if removed
}

// Update the wishlist badge count in the header
function updateWishlistBadge() {
    const badge = document.getElementById('header-wishlist-badge');
    if (!badge) return;
    const wishlist = getWishlist();
    const count = wishlist.length;
    if (count > 0) {
        badge.textContent = count;
        badge.style.display = 'flex';
    } else {
        badge.style.display = 'none';
    }
}

// Initialize wishlist toggle buttons on product cards (products.html)
function initWishlistToggles() {
    const toggleButtons = document.querySelectorAll('.wishlist-toggle');
    if (toggleButtons.length === 0) return;

    toggleButtons.forEach(btn => {
        const productId = btn.dataset.id;
        
        // Set initial state
        if (isInWishlist(productId)) {
            btn.classList.add('active');
        }

        btn.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            
            const isNowInWishlist = toggleWishlist(productId);
            
            if (isNowInWishlist) {
                this.classList.add('active');
            } else {
                this.classList.remove('active');
            }

            // Pulse animation
            this.classList.add('pulse');
            setTimeout(() => this.classList.remove('pulse'), 500);

            updateWishlistBadge();
        });
    });
}

// Initialize wishlist button on product detail page
function initWishlistDetailButton() {
    const wishlistBtn = document.getElementById('addToWishlistBtn');
    const wishlistBtnText = document.getElementById('wishlistBtnText');
    if (!wishlistBtn) return;

    const urlParams = new URLSearchParams(window.location.search);
    const productId = urlParams.get('product');
    if (!productId) return;

    // Set initial state
    if (isInWishlist(productId)) {
        wishlistBtn.classList.add('active');
        if (wishlistBtnText) wishlistBtnText.textContent = 'In Wishlist';
    }

    wishlistBtn.addEventListener('click', function() {
        const isNowInWishlist = toggleWishlist(productId);
        
        if (isNowInWishlist) {
            this.classList.add('active');
            if (wishlistBtnText) wishlistBtnText.textContent = 'In Wishlist';
        } else {
            this.classList.remove('active');
            if (wishlistBtnText) wishlistBtnText.textContent = 'Add to Wishlist';
        }

        updateWishlistBadge();
    });
}

// Render the wishlist page (wishlist.html)
function renderWishlistPage() {
    const wishlistGrid = document.getElementById('wishlist-grid');
    const emptyMessage = document.getElementById('wishlist-empty-message');
    if (!wishlistGrid) return; // Not on wishlist page

    const wishlist = getWishlist();

    if (wishlist.length === 0) {
        if (emptyMessage) emptyMessage.style.display = 'flex';
        wishlistGrid.innerHTML = '';
        return;
    }

    if (emptyMessage) emptyMessage.style.display = 'none';

    wishlistGrid.innerHTML = '';
    wishlist.forEach(productId => {
        const product = productsData[productId];
        if (!product) return; // Product not found in data

        const itemEl = document.createElement('div');
        itemEl.classList.add('wishlist-item');
        itemEl.dataset.id = productId;

        itemEl.innerHTML = `
            <div class="wishlist-item-image">
                <a href="product-detail.html?product=${productId}">
                    <img src="${product.img}" alt="${product.name}">
                </a>
            </div>
            <div class="wishlist-item-info">
                <h3><a href="product-detail.html?product=${productId}">${product.name}</a></h3>
                <p class="wishlist-item-price">${product.price}</p>
                <button class="wishlist-remove-btn" data-id="${productId}">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
                    Remove
                </button>
            </div>
        `;

        wishlistGrid.appendChild(itemEl);
    });

    // Attach remove button listeners
    const removeButtons = wishlistGrid.querySelectorAll('.wishlist-remove-btn');
    removeButtons.forEach(btn => {
        btn.addEventListener('click', function() {
            const id = this.dataset.id;
            const itemEl = this.closest('.wishlist-item');
            
            // Animate removal
            itemEl.classList.add('removing');
            setTimeout(() => {
                toggleWishlist(id); // Remove from localStorage
                updateWishlistBadge();
                renderWishlistPage(); // Re-render
            }, 300);
        });
    });
}

// Master initialization for all wishlist features
function initializeWishlist() {
    updateWishlistBadge();
    initWishlistToggles();
    initWishlistDetailButton();
    renderWishlistPage();
}

document.addEventListener('DOMContentLoaded', function() {
    setCurrentYear();
    initializeProductDetailPage();
    initializeSitePanels();
    setActiveNavLink();
    initializeWishlist();
});