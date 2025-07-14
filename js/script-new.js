// Article Management System
let articles = [
  {
    id: 1,
    title: "How AI is Transforming Product Management",
    subtitle: "The intersection of artificial intelligence and product strategy",
    category: "ai",
    tags: ["AI", "Product Management", "Technology"],
    excerpt: "Exploring how artificial intelligence is revolutionizing product management practices and enabling data-driven decision making.",
    content: `
      <p>Artificial Intelligence is fundamentally changing how product managers approach their work. From predictive analytics to automated testing, AI tools are becoming essential for modern product management.</p>
      
      <h3>Key Areas of AI Impact</h3>
      <ul>
        <li><strong>Customer Insights:</strong> AI analyzes user behavior patterns to identify pain points and opportunities</li>
        <li><strong>Feature Prioritization:</strong> Machine learning algorithms help rank features based on impact predictions</li>
        <li><strong>A/B Testing:</strong> Automated testing platforms accelerate experiment cycles</li>
        <li><strong>Personalization:</strong> AI enables tailored user experiences at scale</li>
      </ul>
      
      <h3>The Future of AI in Product Management</h3>
      <p>As AI capabilities continue to advance, product managers must evolve their skillsets to leverage these tools effectively. The future belongs to those who can combine human intuition with AI-powered insights.</p>
    `,
    author: "Khrum Kashan",
    date: "2025-01-05",
    readTime: "5 min read",
    image: ""
  },

  {
    id: 3,
    title: "The Evolution of Cloud Computing",
    subtitle: "From virtualization to serverless architectures",
    category: "tech",
    tags: ["Cloud Computing", "Azure", "Technology"],
    excerpt: "Tracing the evolution of cloud computing from basic virtualization to modern serverless and edge computing paradigms.",
    content: `
      <p>Cloud computing has transformed from a novel concept to the backbone of modern technology infrastructure. Let's explore this remarkable journey.</p>
      
      <h3>The Cloud Evolution Timeline</h3>
      <ul>
        <li><strong>2006-2010:</strong> Basic virtualization and Infrastructure as a Service (IaaS)</li>
        <li><strong>2011-2015:</strong> Platform as a Service (PaaS) and container adoption</li>
        <li><strong>2016-2020:</strong> Serverless computing and microservices architecture</li>
        <li><strong>2021-Present:</strong> Edge computing and AI-powered cloud services</li>
      </ul>
      
      <h3>Current Trends and Future Outlook</h3>
      <p>The cloud continues to evolve with emerging technologies like quantum computing, advanced AI services, and edge computing bringing computation closer to data sources.</p>
    `,
    author: "Khrum Kashan",
    date: "2024-12-15",
    readTime: "6 min read",
    image: ""
  }
];

// Local Storage key for articles
const STORAGE_KEY = 'portfolio_articles';

// Load articles from localStorage or use default
function loadArticles() {
  const stored = localStorage.getItem(STORAGE_KEY);
  if (stored) {
    articles = JSON.parse(stored);
  }
  return articles;
}

// Save articles to localStorage
function saveArticles() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(articles));
}

// Display articles in the grid
function displayArticles(articlesToShow = articles) {
  const articlesGrid = document.getElementById('articles-grid');
  if (!articlesGrid) return;

  articlesGrid.innerHTML = '';

  articlesToShow.forEach(article => {
    const articleCard = document.createElement('div');
    articleCard.className = 'article-card';
    articleCard.onclick = () => openArticle(article.id);

    const categoryColor = getCategoryColor(article.category);
    
    articleCard.innerHTML = `
      <div class="article-meta">
        <span class="article-category" style="background-color: ${categoryColor}; color: white;">${getCategoryName(article.category)}</span>
        <span>${article.date}</span>
        <span>${article.readTime}</span>
      </div>
      <h3 class="article-title">${article.title}</h3>
      <p class="article-subtitle">${article.subtitle}</p>
      <p class="article-excerpt">${article.excerpt}</p>
      <div class="article-footer">
        <div class="article-tags">
          ${article.tags.map(tag => `<span class="tag">${tag}</span>`).join('')}
        </div>
        <span>By ${article.author}</span>
      </div>
    `;

    articlesGrid.appendChild(articleCard);
  });
}

// Get category color
function getCategoryColor(category) {
  const colors = {
    'ai': '#4a90e2',
    'product': '#7ed321',
    'tech': '#f5a623',
    'leadership': '#d0021b',
    'career': '#9013fe'
  };
  return colors[category] || '#666';
}

// Get category display name
function getCategoryName(category) {
  const names = {
    'ai': 'AI & ML',
    'product': 'Product',
    'tech': 'Technology',
    'leadership': 'Leadership',
    'career': 'Career'
  };
  return names[category] || category;
}

// Filter articles by category
function filterArticles(category) {
  // Update active filter button
  document.querySelectorAll('.filter-btn').forEach(btn => {
    btn.classList.remove('active');
  });
  event.target.classList.add('active');

  // Filter and display articles
  const filteredArticles = category === 'all' 
    ? articles 
    : articles.filter(article => article.category === category);
  
  displayArticles(filteredArticles);
}

// Open article modal/page
function openArticle(articleId) {
  const article = articles.find(a => a.id === articleId);
  if (!article) return;

  // Create article view modal
  const modal = document.createElement('div');
  modal.className = 'modal';
  modal.style.display = 'block';
  modal.innerHTML = `
    <div class="modal-content" style="max-width: 800px;">
      <div class="modal-header">
        <div>
          <h2>${article.title}</h2>
          <p style="margin: 0; color: #666;">${article.subtitle}</p>
        </div>
        <button class="close-btn" onclick="closeModal()">&times;</button>
      </div>
      <div class="modal-body">
        <div class="article-meta" style="margin-bottom: 2rem;">
          <span class="article-category" style="background-color: ${getCategoryColor(article.category)}; color: white;">${getCategoryName(article.category)}</span>
          <span>${article.date}</span>
          <span>${article.readTime}</span>
          <span>By ${article.author}</span>
        </div>
        <div class="article-content">
          ${article.content}
        </div>
        <div class="article-tags" style="margin-top: 2rem;">
          ${article.tags.map(tag => `<span class="tag">${tag}</span>`).join('')}
        </div>
      </div>
    </div>
  `;

  document.body.appendChild(modal);
  
  // Close modal when clicking outside
  modal.onclick = function(e) {
    if (e.target === modal) {
      closeModal();
    }
  };
}

// Show add article modal
function showAddArticleModal() {
  const modal = document.getElementById('addArticleModal');
  if (modal) {
    modal.style.display = 'block';
  }
}

// Close modal
function closeModal() {
  const modals = document.querySelectorAll('.modal');
  modals.forEach(modal => {
    modal.style.display = 'none';
    if (modal.id !== 'addArticleModal') {
      modal.remove();
    }
  });
}

// Handle article form submission
function handleArticleSubmit(event) {
  event.preventDefault();
  
  const formData = new FormData(event.target);
  const editor = document.getElementById('articleContent');
  
  const newArticle = {
    id: Date.now(),
    title: formData.get('title'),
    subtitle: formData.get('subtitle') || '',
    category: formData.get('category'),
    tags: formData.get('tags').split(',').map(tag => tag.trim()),
    excerpt: generateExcerpt(editor.innerHTML),
    content: editor.innerHTML,
    author: 'Khrum Kashan',
    date: new Date().toISOString().split('T')[0],
    readTime: calculateReadTime(editor.innerHTML),
    image: formData.get('image') || ''
  };

  articles.unshift(newArticle);
  saveArticles();
  displayArticles();
  closeModal();
  
  // Reset form
  event.target.reset();
  editor.innerHTML = '';
  
  // Show success message
  showNotification('Article published successfully!');
}

// Generate excerpt from content
function generateExcerpt(content) {
  const tempDiv = document.createElement('div');
  tempDiv.innerHTML = content;
  const text = tempDiv.textContent || tempDiv.innerText || '';
  return text.slice(0, 150) + (text.length > 150 ? '...' : '');
}

// Calculate reading time
function calculateReadTime(content) {
  const tempDiv = document.createElement('div');
  tempDiv.innerHTML = content;
  const text = tempDiv.textContent || tempDiv.innerText || '';
  const words = text.trim().split(/\s+/).length;
  const minutes = Math.ceil(words / 200); // Average reading speed
  return `${minutes} min read`;
}

// Show notification
function showNotification(message, type = 'success') {
  const notification = document.createElement('div');
  notification.style.cssText = `
    position: fixed;
    top: 20px;
    right: 20px;
    background: ${type === 'success' ? '#4CAF50' : '#f44336'};
    color: white;
    padding: 1rem 1.5rem;
    border-radius: 4px;
    z-index: 10000;
    animation: slideIn 0.3s ease-out;
  `;
  notification.textContent = message;
  
  document.body.appendChild(notification);
  
  setTimeout(() => {
    notification.remove();
  }, 3000);
}

// Rich text editor functions
function formatText(command, value = null) {
  document.execCommand(command, false, value);
  document.getElementById('articleContent').focus();
}

function insertList() {
  document.execCommand('insertUnorderedList', false, null);
  document.getElementById('articleContent').focus();
}

function insertLink() {
  const url = prompt('Enter URL:');
  if (url) {
    document.execCommand('createLink', false, url);
  }
  document.getElementById('articleContent').focus();
}

// Save draft
function saveDraft() {
  const form = document.getElementById('articleForm');
  const formData = new FormData(form);
  const editor = document.getElementById('articleContent');
  
  const draft = {
    title: formData.get('title'),
    subtitle: formData.get('subtitle'),
    category: formData.get('category'),
    tags: formData.get('tags'),
    content: editor.innerHTML,
    image: formData.get('image')
  };
  
  localStorage.setItem('article_draft', JSON.stringify(draft));
  showNotification('Draft saved successfully!');
}

// Load draft
function loadDraft() {
  const draft = localStorage.getItem('article_draft');
  if (draft) {
    const data = JSON.parse(draft);
    document.getElementById('articleTitle').value = data.title || '';
    document.getElementById('articleSubtitle').value = data.subtitle || '';
    document.getElementById('articleCategory').value = data.category || 'ai';
    document.getElementById('articleTags').value = data.tags || '';
    document.getElementById('articleContent').innerHTML = data.content || '';
    document.getElementById('articleImage').value = data.image || '';
  }
}

// Load more articles (pagination)
function loadMoreArticles() {
  // In a real application, this would fetch more articles from a server
  showNotification('All articles loaded!', 'info');
}

// Initialize the application
document.addEventListener('DOMContentLoaded', function() {
  // Load articles from storage
  loadArticles();
  
  // Display articles
  displayArticles();
  
  // Set up form handler
  const articleForm = document.getElementById('articleForm');
  if (articleForm) {
    articleForm.addEventListener('submit', handleArticleSubmit);
  }
  
  // Load draft on modal open
  const writeBtn = document.querySelector('button[onclick="showAddArticleModal()"]');
  if (writeBtn) {
    writeBtn.addEventListener('click', () => {
      setTimeout(loadDraft, 100); // Load draft after modal opens
    });
  }
  
  // Close modal on escape key
  document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape') {
      closeModal();
    }
  });
});

// Add CSS for animations
const style = document.createElement('style');
style.textContent = `
  @keyframes slideIn {
    from { transform: translateX(100%); opacity: 0; }
    to { transform: translateX(0); opacity: 1; }
  }
  
  .article-content h3 {
    margin: 2rem 0 1rem 0;
    color: #333;
  }
  
  .article-content ul {
    margin: 1rem 0;
    padding-left: 2rem;
  }
  
  .article-content li {
    margin-bottom: 0.5rem;
  }
  
  .article-content p {
    margin-bottom: 1rem;
    line-height: 1.6;
  }
`;
document.head.appendChild(style);
