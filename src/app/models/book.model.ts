export interface Book {
    title: string;
    author_name?: string[];
    cover_i?: number;
    first_publish_year?: number;
    key: string;
    subject?: string[];
  }
  
  export interface BookSearchResponse {
    docs: Book[];
    numFound: number;
    start: number;
  }