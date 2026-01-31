const BASE_URL = 'https://openlibrary.org';

const BookService = {
  searchBooks: async (query, limit = 100) => {
    try {
      const response = await fetch(`${BASE_URL}/search.json?q=${encodeURIComponent(query)}&limit=${limit}&fields=key,title,author_name,cover_i,first_publish_year,subject,ia`);
      const data = await response.json();
      return data.docs.map(book => {
        const iaId = book.ia ? book.ia[0] : null;
        return {
          id: book.key,
          title: book.title,
          author: book.author_name ? book.author_name.join(', ') : 'Unknown Author',
          cover_id: book.cover_i,
          cover_url: book.cover_i
            ? `https://covers.openlibrary.org/b/id/${book.cover_i}-L.jpg`
            : 'https://via.placeholder.com/400x600?text=No+Cover',
          first_publish_year: book.first_publish_year,
          subject: book.subject ? book.subject.slice(0, 5) : [],
          read_url: iaId ? `https://archive.org/details/${iaId}/page/n1/mode/2up` : `https://openlibrary.org${book.key}`,
          download_url: iaId ? `https://archive.org/download/${iaId}` : null
        };
      });
    } catch (error) {
      console.error('Error fetching books:', error);
      return [];
    }
  },

  getTrendingBooks: async () => {
    try {
      // Fetching multiple popular subjects to reach 100+ books
      const queries = ['world classics', 'business', 'technology', 'science', 'history'];
      const results = await Promise.all(queries.map(q => BookService.searchBooks(q, 25)));
      return results.flat().slice(0, 120); // Aim for ~120 books
    } catch (error) {
      console.error('Error fetching trending books:', error);
      return [];
    }
  },

  getBookDetails: async (workKey) => {
    try {
      const response = await fetch(`${BASE_URL}${workKey}.json`);
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error fetching book details:', error);
      return null;
    }
  }
};

export default BookService;
