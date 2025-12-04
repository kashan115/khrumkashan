// =============================================
// KHRUM KASHAN - Site JavaScript
// =============================================

// Theme Toggle
function toggleTheme() {
  const html = document.documentElement;
  const currentTheme = html.getAttribute('data-theme');
  const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
  
  html.setAttribute('data-theme', newTheme);
  localStorage.setItem('theme', newTheme);
  
  // Update icon
  const icon = document.querySelector('.theme-toggle i');
  if (icon) {
    icon.className = newTheme === 'dark' ? 'fas fa-sun' : 'fas fa-moon';
  }
}

// Initialize theme from localStorage
function initTheme() {
  const savedTheme = localStorage.getItem('theme') || 'light';
  document.documentElement.setAttribute('data-theme', savedTheme);
  
  const icon = document.querySelector('.theme-toggle i');
  if (icon) {
    icon.className = savedTheme === 'dark' ? 'fas fa-sun' : 'fas fa-moon';
  }
}

// Articles data (placeholder)
const articles = [
  {
    id: 1,
    title: 'Building AI-Powered Products at Scale',
    excerpt: 'Lessons learned from shipping AI features to millions of users...',
    category: 'ai',
    date: 'Jan 10, 2025',
    image: 'images/article-ai.jpg'
  },
  {
    id: 2,
    title: 'The Art of Product Discovery',
    excerpt: 'How to identify and validate opportunities that matter...',
    category: 'product',
    date: 'Jan 5, 2025',
    image: 'images/article-product.jpg'
  },
  {
    id: 3,
    title: 'Modern Cloud Architecture Patterns',
    excerpt: 'Patterns for building resilient, scalable systems...',
    category: 'tech',
    date: 'Dec 28, 2024',
    image: 'images/article-tech.jpg'
  }
];

// Filter articles
function filterArticles(category) {
  const buttons = document.querySelectorAll('.filter-btn');
  buttons.forEach(btn => btn.classList.remove('active'));
  event.target.classList.add('active');
  
  renderArticles(category === 'all' ? articles : articles.filter(a => a.category === category));
}

// Render articles
function renderArticles(articlesToRender) {
  const grid = document.getElementById('articles-grid');
  if (!grid) return;
  
  grid.innerHTML = articlesToRender.map(article => `
    <article class="article-card" data-category="${article.category}">
      <div class="article-content">
        <div class="article-meta">
          <span class="article-category">${article.category}</span>
          <time class="article-date">${article.date}</time>
        </div>
        <h3 class="article-title">${article.title}</h3>
        <p class="article-excerpt">${article.excerpt}</p>
      </div>
    </article>
  `).join('');
}

// Load more articles
function loadMoreArticles() {
  console.log('Loading more articles...');
}

// Modal functions
function showAddArticleModal() {
  const modal = document.getElementById('addArticleModal');
  if (modal) modal.classList.add('active');
}

function closeModal() {
  const modal = document.getElementById('addArticleModal');
  if (modal) modal.classList.remove('active');
}

// Initialize on page load
document.addEventListener('DOMContentLoaded', () => {
  initTheme();
  renderArticles(articles);
  
  // Close modal on outside click
  const modal = document.getElementById('addArticleModal');
  if (modal) {
    modal.addEventListener('click', (e) => {
      if (e.target === modal) closeModal();
    });
  }
});
