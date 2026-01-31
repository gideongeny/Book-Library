const BASE_URL = 'https://openlibrary.org';

const BookService = {
  searchBooks: async (query, limit = 12) => {
    try {
      const response = await fetch(`${BASE_URL}/search.json?q=${encodeURIComponent(query)}&limit=${limit}`);
      const data = await response.json();
      return data.docs.map(book => ({
        id: book.key,
        title: book.title,
        author: book.author_name ? book.author_name.join(', ') : 'Unknown Author',
        cover_id: book.cover_i,
        cover_url: book.cover_i 
          ? `https://covers.openlibrary.org/b/id/${book.cover_i}-L.jpg` 
          : 'https://via.placeholder.com/400x600?text=No+Cover',
        first_publish_year: book.first_publish_year,
        subject: book.subject ? book.subject.slice(0, 5) : [],
      }));
    } catch (error) {
      console.error('Error fetching books:', error);
      return [];
    }
  },

  getTrendingBooks: async () => {
    try {
      // Using a predefined search for "bestsellers" or similar to populate home
      return await BookService.searchBooks('world classics', 12);
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
