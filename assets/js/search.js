// Búsqueda en tiempo real
const searchInput = document.getElementById('search-input');
const resultsContainer = document.getElementById('search-results');

// Todos los posts (se cargarán desde los metadatos)
let allPosts = [];

// Función para indexar todos los posts
function indexPosts() {
    const postElements = document.querySelectorAll('.post-preview');
    allPosts = Array.from(postElements).map(el => {
        const title = el.querySelector('h3 a')?.textContent || '';
        const excerpt = el.querySelector('p')?.textContent || '';
        const tags = Array.from(el.querySelectorAll('.tag'))
            .map(t => t.textContent.replace('#', ''));
        const link = el.querySelector('h3 a')?.href || '';
        const category = el.querySelector('.category')?.textContent || '';
        
        return { title, excerpt, tags, link, category, element: el };
    });
}

// Función de búsqueda
function search(query) {
    query = query.toLowerCase().trim();
    
    if (!query) {
        resultsContainer.innerHTML = '';
        return;
    }
    
    const results = allPosts.filter(post => {
        const searchable = [
            post.title,
            post.excerpt,
            ...post.tags,
            post.category
        ].join(' ').toLowerCase();
        
        return searchable.includes(query);
    });
    
    displayResults(results);
}

// Mostrar resultados
function displayResults(results) {
    if (results.length === 0) {
        resultsContainer.innerHTML = `
            <div class="result-item" style="text-align: center; color: var(--text-secondary);">
                🔍 No se encontraron resultados para "${searchInput.value}"
            </div>
        `;
        return;
    }
    
    // Ocultar todos los posts
    allPosts.forEach(p => p.element.style.display = 'none');
    
    // Mostrar solo los resultados (hasta 10)
    results.slice(0, 10).forEach((result, index) => {
        result.element.style.display = 'block';
        if (index === 0) {
            result.element.style.borderLeft = '4px solid #00ff41';
        }
    });
    
    // Mostrar contador
    resultsContainer.innerHTML = `
        <div class="result-item" style="background: rgba(0,255,65,0.05); border-color: var(--border-color);">
            🎯 ${results.length} resultados encontrados
        </div>
    `;
}

// Event listeners
if (searchInput) {
    searchInput.addEventListener('input', function(e) {
        search(this.value);
    });
    
    // Limpiar búsqueda con Escape
    searchInput.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') {
            this.value = '';
            search('');
            allPosts.forEach(p => p.element.style.display = 'block');
        }
    });
}

// Indexar al cargar la página
document.addEventListener('DOMContentLoaded', indexPosts);

// Función para copiar código
function copyCode(button) {
    const codeBlock = button.parentElement.querySelector('code');
    if (codeBlock) {
        navigator.clipboard.writeText(codeBlock.textContent);
        button.textContent = '✅ Copiado!';
        setTimeout(() => {
            button.textContent = '📋 Copiar';
        }, 2000);
    }
}

// Agregar botones de copiar a todos los bloques de código
document.addEventListener('DOMContentLoaded', function() {
    document.querySelectorAll('pre').forEach(pre => {
        const button = document.createElement('button');
        button.className = 'copy-btn';
        button.textContent = '📋 Copiar';
        button.onclick = function() { copyCode(this); };
        pre.style.position = 'relative';
        pre.appendChild(button);
    });
});
