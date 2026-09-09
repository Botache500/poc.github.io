// ============================================
// LISTA DE POCs - ACTUALIZAR AQUÍ
// ============================================
const pocList = [
    {
        id: 'cve-2024-1234',
        title: 'CVE-2024-1234 - Escalada de Privilegios en Windows',
        date: '15/09/2026',
        categories: ['Windows', 'CVE'],
        tags: ['windows', 'privesc', 'kernel'],
        cve: 'CVE-2024-1234',
        excerpt: 'Explotación de una vulnerabilidad en el kernel de Windows que permite escalar privilegios de usuario a SYSTEM.',
        url: 'pocs/cve-2024-1234/'
    },
    {
        id: 'linux-kernel-exploit',
        title: 'Linux Kernel Exploit - Escalada de Privilegios',
        date: '20/09/2026',
        categories: ['Linux'],
        tags: ['linux', 'kernel', 'privesc', 'ubuntu'],
        cve: 'CVE-2024-XXXX',
        excerpt: 'Explotación de una vulnerabilidad en el kernel de Linux para escalar privilegios.',
        url: 'pocs/linux-kernel-exploit/'
    },
    {
        id: 'web-ssti-rce',
        title: 'SSTI a RCE en Flask - Jinja2',
        date: '25/09/2026',
        categories: ['Web', 'CVE'],
        tags: ['python', 'flask', 'ssti', 'rce'],
        cve: 'CVE-2024-XXXX',
        excerpt: 'Explotación de Server-Side Template Injection (SSTI) en Flask/Jinja2 para ejecución remota de comandos.',
        url: 'pocs/web-ssti-rce/'
    }
];

// ============================================
// FUNCIONES DE RENDERIZADO
// ============================================

function renderPosts(postsToShow) {
    const container = document.getElementById('posts-container');
    if (!container) return;

    if (!postsToShow || postsToShow.length === 0) {
        container.innerHTML = `<p style="text-align: center; color: var(--text-secondary); padding: 40px 0;">📝 No hay POCs disponibles.</p>`;
        return;
    }

    container.innerHTML = postsToShow.map(post => `
        <article class="post-preview">
            <h3><a href="${post.url}">${post.title}</a></h3>
            <div class="post-meta">
                <span class="date">📅 ${post.date}</span>
                <span class="category">🏷️ ${post.categories.join(', ')}</span>
                ${post.cve ? `<span class="cve-badge">🔴 ${post.cve}</span>` : ''}
            </div>
            <p>${post.excerpt}</p>
            <div class="tags">
                ${post.tags.map(tag => `<span class="tag">#${tag}</span>`).join('')}
            </div>
        </article>
    `).join('');
}

// ============================================
// FUNCIONES DE BÚSQUEDA Y FILTROS
// ============================================

function searchPosts(query) {
    const q = query.toLowerCase().trim();
    const resultsContainer = document.getElementById('search-results');
    const postsContainer = document.getElementById('posts-container');

    if (!q) {
        if (resultsContainer) resultsContainer.innerHTML = '';
        renderPosts(pocList);
        return;
    }

    const results = pocList.filter(post => {
        const searchable = [
            post.title,
            post.excerpt,
            ...post.tags,
            ...post.categories,
            post.cve || ''
        ].join(' ').toLowerCase();
        return searchable.includes(q);
    });

    // Mostrar resultados en el contenedor principal
    renderPosts(results);

    // Mostrar mensaje en el contenedor de resultados
    if (resultsContainer) {
        if (results.length === 0) {
            resultsContainer.innerHTML = `<div style="text-align: center; color: var(--text-secondary); padding: 20px; border: 1px solid var(--border-color); margin-top: 20px;">🔍 No se encontraron resultados para "${q}"</div>`;
        } else {
            resultsContainer.innerHTML = `<div style="background: rgba(0,255,65,0.05); border: 1px solid var(--border-color); padding: 10px; margin-top: 20px; text-align: center; color: var(--text-secondary);">🎯 ${results.length} resultados encontrados</div>`;
        }
    }
}

function filterCategory(category) {
    const searchInput = document.getElementById('search-input');
    const resultsContainer = document.getElementById('search-results');
    
    if (searchInput) searchInput.value = '';
    if (resultsContainer) resultsContainer.innerHTML = '';
    
    const results = pocList.filter(post =>
        post.categories.some(c => c.toLowerCase().includes(category.toLowerCase()))
    );
    renderPosts(results);
}

function showAllPosts() {
    const searchInput = document.getElementById('search-input');
    const resultsContainer = document.getElementById('search-results');
    
    if (searchInput) searchInput.value = '';
    if (resultsContainer) resultsContainer.innerHTML = '';
    
    renderPosts(pocList);
}

// ============================================
// FUNCIÓN PARA COPIAR CÓDIGO
// ============================================

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

// ============================================
// INICIALIZACIÓN
// ============================================

document.addEventListener('DOMContentLoaded', function() {
    // Renderizar posts en la página actual
    const container = document.getElementById('posts-container');
    if (container) {
        renderPosts(pocList);
    }

    // Configurar búsqueda en tiempo real
    const searchInput = document.getElementById('search-input');
    if (searchInput) {
        searchInput.addEventListener('input', function(e) {
            searchPosts(this.value);
        });
    }

    // Agregar botones de copiar a todos los bloques de código
    document.querySelectorAll('pre').forEach(pre => {
        const button = document.createElement('button');
        button.className = 'copy-btn';
        button.textContent = '📋 Copiar';
        button.onclick = function(e) {
            e.stopPropagation();
            copyCode(this);
        };
        pre.style.position = 'relative';
        pre.appendChild(button);
    });
});

// Exportar para uso global
window.pocList = pocList;
window.renderPosts = renderPosts;
window.searchPosts = searchPosts;
window.filterCategory = filterCategory;
window.showAllPosts = showAllPosts;
window.copyCode = copyCode;
