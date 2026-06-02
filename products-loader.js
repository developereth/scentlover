// ============================================
// SCENT LOVERS - PRODUCTS LOADER (Universal)
// ============================================
// Include this script on all your product pages

const API_URL = 'https://scent-lovers-api.developeraddis.workers.dev';

/**
 * Load products and render them into a grid
 * @param {string} category - 'women', 'men', 'gift', 'sale', or 'all'
 * @param {string} gridElementId - ID of the container element
 * @param {string} countElementId - ID of the count display element (optional)
 */
async function loadProducts(category = 'all', gridElementId = 'productGrid', countElementId = 'productCount') {
    const grid = document.getElementById(gridElementId);
    const countEl = countElementId ? document.getElementById(countElementId) : null;
    
    if (!grid) {
        console.error('Product grid element not found:', gridElementId);
        return;
    }
    
    // Show loading state
    grid.innerHTML = `
        <div style="text-align:center; padding:60px 20px; grid-column:1/-1;">
            <div style="font-size:40px; margin-bottom:20px;">⏳</div>
            <div style="color:#D4A853;">Loading products...</div>
        </div>
    `;
    
    try {
        // Fetch from API
        const url = category === 'all' 
            ? `${API_URL}/api/products`
            : `${API_URL}/api/products/${category}`;
        
        const response = await fetch(url);
        const data = await response.json();
        
        console.log('API Response:', data);
        
        if (!data.success) {
            throw new Error(data.error || 'Failed to load products');
        }
        
        const products = Array.isArray(data.products) ? data.products : [];
        
        // Update count
        if (countEl) {
            countEl.textContent = `${products.length} products — from floral to oriental, find your perfect scent`;
        }
        
        // Render products
        if (products.length === 0) {
            grid.innerHTML = `
                <div style="text-align:center; padding:60px 20px; grid-column:1/-1; color:#888;">
                    <div style="font-size:48px; margin-bottom:20px;">🛍️</div>
                    <p>No products in this category yet.</p>
                    <p style="font-size:0.9rem;">Check back soon for new arrivals!</p>
                </div>
            `;
            return;
        }
        
        grid.innerHTML = products.map(product => createProductCard(product)).join('');
        
    } catch (error) {
        console.error('Error loading products:', error);
        grid.innerHTML = `
            <div style="text-align:center; padding:40px; grid-column:1/-1; color:#e74c3c;">
                <p>⚠️ Unable to load products.</p>
                <p style="font-size:0.8rem;">Please try refreshing the page.</p>
            </div>
        `;
    }
}

function createProductCard(product) {
    const imageUrl = product.image || 'https://via.placeholder.com/400x300?text=No+Image';
    const brand = escapeHtml(product.brand || '');
    const name = escapeHtml(product.name || 'Unnamed Product');
    const price = escapeHtml(product.price || 'Price on request');
    const tag = escapeHtml(product.tag || '');
    
    return `
        <div class="product-card">
            <div class="product-card-img">
                <img src="${imageUrl}" alt="${name}" onerror="this.src='https://via.placeholder.com/400x300?text=No+Image'" loading="lazy">
                ${tag ? `<span class="product-card-tag">${tag}</span>` : ''}
            </div>
            <div class="product-card-body">
                <div class="brand">${brand}</div>
                <h4>${name}</h4>
                <span class="price">${price}</span>
                <button class
