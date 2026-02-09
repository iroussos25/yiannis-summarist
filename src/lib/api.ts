import axios from "axios";

export interface Book {
    id: string;
    bookId: string;
    author: string;
    title: string;
    subTitle: string;
    imageLink: string;
    audioLink: string;
    totalRating: string;
    averageRating: string;
    keyIdeas: string;
    type: string;
    status: string;
    subscriptionRequired: boolean;
    summary: string;
    tags: string[];
    bookDescription: string;
    authorDescription: string;
    duration?: string;
    rating: number;
}

const API_URL = "https://us-central1-summaristt.cloudfunctions.net";


const generateMockDuration = () => {
  const mins = Math.floor(Math.random() * (15 - 8 + 1) + 8); 
  const secs = Math.floor(Math.random() * 60);
  return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
};

export const fetchSelectedBook = async (): Promise<Book | null> => {
    try {
        const { data } = await axios.get(`${API_URL}/getBooks?status=selected`);
        const book = Array.isArray(data) ? data[0] : data;
        
        if (book) {
            return { ...book, duration: book.duration || generateMockDuration() };
        }
        return null;
    } catch (error) {
        console.error("Error fetching selected book:", error);
        return null;
    }
};

export const fetchRecommendedBooks = async (): Promise<Book[]> => {
    try {
        const { data } = await axios.get(`${API_URL}/getBooks?status=recommended`);
        return (data || []).map((book: Book) => ({
            ...book,
            duration: book.duration || generateMockDuration()
        }));
    } catch (error) {
        console.error("Error fetching recommended books:", error);
        return [];
    }
};

export const fetchSuggestedBooks = async (): Promise<Book[]> => {
    try {
        const { data } = await axios.get(`${API_URL}/getBooks?status=suggested`);
        return (data || []).map((book: Book) => ({
            ...book,
            duration: book.duration || generateMockDuration()
        }));
    } catch (error) {
        console.error("Error fetching suggested books:", error);
        return [];
    }
};

export const searchBooks = async (query: string): Promise<Book[]> => {
    try {
        const [recRes, sugRes, selRes] = await Promise.all([
            axios.get(`${API_URL}/getBooks?status=recommended`),
            axios.get(`${API_URL}/getBooks?status=suggested`),
            axios.get(`${API_URL}/getBooks?status=selected`)
        ]);

        const selectedData = Array.isArray(selRes.data) ? selRes.data : [selRes.data];
        const combinedPool: Book[] = [...recRes.data, ...sugRes.data, ...selectedData];

        const uniquePool = combinedPool.filter((book, index, self) => 
            book && index === self.findIndex((b) => b?.id === book?.id)
        );

        const searchTerm = query.toLowerCase();
        return uniquePool
            .filter((book) => 
                book.title.toLowerCase().includes(searchTerm) ||
                book.author.toLowerCase().includes(searchTerm)
            )
            .map((book) => ({
                ...book,
                duration: book.duration || generateMockDuration()
            }));
    } catch (error) {
        console.error("Comprehensive search failed:", error);
        return [];
    }
};

export const fetchBookById = async (id: string): Promise<Book> => {
    try {
        const response = await axios.get(`${API_URL}/getBook`, { params: { id: id } });
        const book = response.data;
        return { ...book, duration: book.duration || generateMockDuration() };
    } catch (error) {
        console.error(`Error fetching book with ID ${id}:`, error);
        throw error;
    }
};
