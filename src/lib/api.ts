
import axios from "axios";

export interface Book {
    id: string;
    author: string;
    title: string;
    subtitle: string;
    imageLink: string;
    audioLink: string;
    totalRating: string;
    averageRating: string;
    keyIdeas: string;
    type: string;
    status: string;
    subscriptionRequired: string;
    summary: string;
    tags: string[];
    bookDescription: string;
    authorDescription: string;
    audioDuration?: string;
}

const API_URL = "https://us-central1-summaristt.cloudfunctions.net";

export const fetchSelectedBook = async (): Promise<Book | null> => {
    try {
        const { data } = await axios.get(`${API_URL}/getBooks?status=selected`);
            return data[0] || null;
    } catch (error) {
     console.error("Error fetching selected book:", error);
      return null;
      }
};