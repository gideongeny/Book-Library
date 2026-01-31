import React, { useState, useEffect } from 'react';
import './App.css';
import BookService from './BookService';

const BookCard = ({ book, onClick }) => (
  <div className="book-card glass animate-up" onClick={() => onClick(book)}>
    <div className="book-cover-container">
      <img src={book.cover_url} alt={book.title} className="book-cover" />
      <div className="book-overlay">
        <button className="btn btn-primary">Read More</button>
      </div>
    </div>
    <div className="book-info">
      <h3 className="book-title">{book.title}</h3>
      <p className="book-author">{book.author}</p>
      <div className="book-meta">
        <span className="book-year">{book.first_publish_year || 'N/A'}</span>
        <div className="book-tags">
          {book.subject?.slice(0, 2).map((tag, i) => (
            <span key={i} className="book-tag">{tag}</span>
          ))}
        </div>
      </div>
    </div>
  </div>
);

const Navbar = ({ onNavClick }) => (
  <nav className="navbar glass">
    <div className="nav-container">
      <div className="logo-section" onClick={() => onNavClick('home')} style={{ cursor: 'pointer' }}>
        <div className="logo-icon">B</div>
        <span className="logo-text">LIBRA<span className="accent-text">WORLD</span></span>
      </div>
      <div className="nav-links">
        <button onClick={() => onNavClick('home')} className="nav-btn">Home</button>
        <button onClick={() => onNavClick('discover')} className="nav-btn">Discover</button>
        <button onClick={() => onNavClick('about')} className="nav-btn">About</button>
        <button onClick={() => onNavClick('contact')} className="nav-btn">Contact</button>
      </div>
      <div className="nav-actions">
        <button className="btn btn-primary" onClick={() => onNavClick('discover')}>Get Started</button>
      </div>
    </div>
  </nav>
);

const App = () => {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedBook, setSelectedBook] = useState(null);
  const [activeCategory, setActiveCategory] = useState('world classics');
  const [currentView, setCurrentView] = useState('home');

  const categories = [
    { id: 'world classics', label: 'Classics' },
    { id: 'business', label: 'Business' },
    { id: 'technology', label: 'Technology' },
    { id: 'science', label: 'Science' },
    { id: 'history', label: 'History' },
    { id: 'art', label: 'Art' }
  ];

  useEffect(() => {
    fetchBooksByCategory(activeCategory);
  }, [activeCategory]);

  const fetchBooksByCategory = async (category) => {
    setLoading(true);
    const results = await BookService.searchBooks(category, 60);
    setBooks(results);
    setLoading(false);
  };

  const handleSearch = async (e) => {
    e.preventDefault();
    if (!searchQuery.trim()) return;
    setLoading(true);
    const results = await BookService.searchBooks(searchQuery);
    setBooks(results);
    setLoading(false);
  };

  const handleNavClick = (view) => {
    setCurrentView(view);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="app-container">
      <Navbar onNavClick={handleNavClick} />

      <main className="main-content">
        {currentView === 'home' || currentView === 'discover' ? (
          <>
            <header className="hero-section">
              <div className="hero-content animate-up">
                <h1 className="gradient-text">World-Class Digital Library</h1>
                <p className="hero-subtitle">Access millions of books from across the globe. Your portal to universal knowledge and literature.</p>

                <form onSubmit={handleSearch} className="search-container glass">
                  <input
                    type="text"
                    placeholder="Search by title, author, or subject..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="search-input"
                  />
                  <button type="submit" className="btn btn-primary">Scan Library</button>
                </form>
              </div>
            </header>

            <section id="discover" className="explore-section">
              <div className="section-header">
                <h2 className="section-title">Explore Global Collection</h2>
                <div className="category-tabs">
                  {categories.map(cat => (
                    <button
                      key={cat.id}
                      className={`category-tab ${activeCategory === cat.id ? 'active' : ''}`}
                      onClick={() => setActiveCategory(cat.id)}
                    >
                      {cat.label}
                    </button>
                  ))}
                </div>
                <div className="section-line"></div>
              </div>

              {loading ? (
                <div className="loader-container">
                  <div className="loader"></div>
                  <p>Scanning global databases for 100+ books...</p>
                </div>
              ) : (
                <>
                  <div className="books-grid">
                    {books.map((book) => (
                      <BookCard key={book.id} book={book} onClick={setSelectedBook} />
                    ))}
                  </div>
                  {books.length === 0 && <p className="no-results">No books found. Try a different search.</p>}
                </>
              )}
            </section>
          </>
        ) : currentView === 'about' ? (
          <section className="info-page animate-up">
            <h1 className="gradient-text">About LIBRAWORLD</h1>
            <div className="info-content glass">
              <p>LIBRAWORLD is a premier digital library founded on the principle of free and universal access to knowledge. Our mission is to bridge the gap between global literature and readers everywhere.</p>
              <p>With a collection spanning millions of titles, we provide a world-class reading experience that includes rare manuscripts, modern bestsellers, and academic journals.</p>
              <div className="stats-grid">
                <div className="stat-card">
                  <h3 className="gradient-text">50M+</h3>
                  <p>Available Books</p>
                </div>
                <div className="stat-card">
                  <h3 className="gradient-text">200+</h3>
                  <p>Countries</p>
                </div>
                <div className="stat-card">
                  <h3 className="gradient-text">24/7</h3>
                  <p>Global Support</p>
                </div>
              </div>
            </div>
          </section>
        ) : (
          <section className="info-page animate-up">
            <h1 className="gradient-text">Get in Touch</h1>
            <div className="info-content glass">
              <p>Have questions or need support? Our global team is here to help you navigate our vast collection.</p>
              <form className="contact-form" onSubmit={(e) => e.preventDefault()}>
                <div className="form-group">
                  <label>Full Name</label>
                  <input type="text" placeholder="Your Name" />
                </div>
                <div className="form-group">
                  <label>Email Address</label>
                  <input type="email" placeholder="email@example.com" />
                </div>
                <div className="form-group">
                  <label>Message</label>
                  <textarea placeholder="How can we help you?"></textarea>
                </div>
                <button className="btn btn-primary" style={{ width: '100%' }}>Send Message</button>
              </form>
            </div>
          </section>
        )}
      </main>

      {selectedBook && (
        <div className="modal-overlay" onClick={() => setSelectedBook(null)}>
          <div className="book-modal glass animate-up" onClick={e => e.stopPropagation()}>
            <button className="close-btn" onClick={() => setSelectedBook(null)}>&times;</button>
            <div className="modal-body">
              <img src={selectedBook.cover_url} alt={selectedBook.title} className="modal-cover" />
              <div className="modal-details">
                <h2 className="modal-title">{selectedBook.title}</h2>
                <p className="modal-author">by {selectedBook.author}</p>
                <p className="modal-desc">
                  This world-class masterpiece is part of our global digital collection.
                  Published in {selectedBook.first_publish_year || 'various editions'}.
                </p>
                <div className="modal-subjects">
                  {selectedBook.subject?.map((s, i) => (
                    <span key={i} className="subject-pill">{s}</span>
                  ))}
                </div>
                <div className="modal-actions">
                  <a href={selectedBook.read_url} target="_blank" rel="noopener noreferrer" className="btn btn-primary">Start Reading</a>
                  {selectedBook.download_url && (
                    <a href={selectedBook.download_url} target="_blank" rel="noopener noreferrer" className="btn ghost-btn">Download PDF</a>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      <footer className="footer glass">
        <div className="footer-content">
          <div className="footer-brand">
            <h3>LIBRAWORLD</h3>
            <p>The world's premier digital library for the global citizen.</p>
          </div>
          <div className="footer-links">
            <div className="link-group">
              <h4>Library</h4>
              <a href="#all">All Books</a>
              <a href="#classics">Classics</a>
              <a href="#new">New Releases</a>
            </div>
            <div className="link-group">
              <h4>Support</h4>
              <a href="#help">Help Center</a>
              <a href="#terms">Terms of Service</a>
              <a href="#privacy">Privacy Policy</a>
            </div>
          </div>
        </div>
        <div className="footer-bottom">
          <p>&copy; 2026 LIBRAWORLD. Design & Creation by MUKHTAR.</p>
        </div>
      </footer>
    </div>
  );
};

export default App;
