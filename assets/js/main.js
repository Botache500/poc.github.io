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

// Lista de POCs (para el index y search)
// Esta lista debe actualizarse manualmente cuando se agregue un nuevo POC
const pocList = [
    {
        id: 'cve-2024-1234',
        title: 'CVE-2024-1234 - Escalada de Privilegios en Windows',
        date: '15/09/2026',
        categories: ['Windows', 'CVE'],
        tags: ['windows', 'privesc', 'kernel'],
        cve: 'CVE-2024-1234',
        excerpt: 'Explotación de una vulnerabilidad en el kernel de Windows que permite escalar privilegios de usuario a SYSTEM.',
        url: '/poc.github.io/pocs/cve-2024-1234/'
    },
    {
        id: 'linux-kernel-exploit',
        title: 'Linux Kernel Exploit - Escalada de Privilegios',
        date: '20/09/2026',
        categories: ['Linux'],
        tags: ['linux', 'kernel', 'privesc', 'ubuntu'],
        cve: 'CVE-2024-XXXX',
        excerpt: 'Explotación de una vulnerabilidad en el kernel de Linux para escalar privilegios.',
        url: '/poc.github.io/pocs/linux-kernel-exploit/'
    }
    // Añade aquí nuevos POCs cuando los crees
];

// Exportar para usar en otros scripts
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { pocList };
}
