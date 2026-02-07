
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

export const fetchSelectedBook = async (): Promise<Book | null> => {
    try {
        const { data } = await axios.get(`${API_URL}/getBooks?status=selected`);
        const book = Array.isArray(data) ? data[0] : data;

        console.log("Extracted Book Object:", book)
            return book || null;
    } catch (error) {
     console.error("Error fetching selected book:", error);
      return null;
      }
};

export const fetchRecommendedBooks = async (): Promise<Book[]> => {
    try {
 const { data } = await axios.get(`${API_URL}/getBooks?status=recommended`);
 console.log("Recommended Books data:", data);
 return data || [];
    } catch (error) {
        console.error("Error fetching recommended books:", error);
        return [];
    }
};

export const fetchSuggestedBooks = async (): Promise<Book[]> => {
    try {
        const { data } = await axios.get(`${API_URL}/getBooks?status=suggested`)
        return data || [];

    }catch (error) {
        console.error("Error fetching suggested books:", error);
        return [];
    }
};

// export const searchBooks = async (query: string): Promise<Book[]> => {
//     try {
//         const { data } = await axios.get(`${API_URL}/getBooks?search=${query}`);
//         return data || [];

//     } catch (error) {
//         console.error("Error searching books:", error);
//         return [];
//     }
// };

export const searchBooks = async (query: string): Promise<Book[]> => {
  try {
    // This points to your new Next.js rewrite path
    const { data } = await axios.get('/api/books', {
      params: { search: query }
    });
    
    // Axios puts the JSON response in the .data property
    return data || []; 
  } catch (error) {
    console.error("Error searching books:", error);
    // Return an empty array so the UI doesn't crash on failure
    return []; 
  }
};

export const fetchBookById = async (id: string): Promise<Book> => {
    try {
        const response = await axios.get(`${API_URL}/getBook`, {params: {id: id}
        });
        return response.data;
    } catch (error) {
        console.error(`Error fetching book with ID ${id}:`, error);
        throw error;
    }
};

