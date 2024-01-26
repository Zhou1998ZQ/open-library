import { useEffect, useState } from "react";
import apiClient from "../services/apiClient";

export type ShowBook = {
  works: Work[];
};
export interface Author {
  name: string;
}
export interface Availability {
  isbn: string;
}
export interface Work {
  authors: Author[];
  first_publish_year: number;
  title: string;
  availability: Availability;
}

const useBooks = (subject: string) => {
  const [books, setBooks] = useState<Work[]>([]);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(true);
    apiClient
      .get<ShowBook>("/" + subject + ".json?limit=30")
      .then((res) => {
        const works = res.data.works;
        const newWorks = works.filter((book) => {
          return (
            book.availability !== undefined &&
            book.availability.isbn !== null &&
            book.availability.isbn !== undefined
          );
        });
        if (newWorks.length == 0) {
          alert("there is no subject with " + subject);
        }
        setIsLoading(false);
        setBooks(newWorks);
      })
      .catch((error) => {
        setError(error.message);
        setIsLoading(false);
      });
  }, [subject]);

  return { books, error, isLoading };
};

export default useBooks;
