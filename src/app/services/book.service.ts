import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, catchError, throwError } from 'rxjs';
import { BookSearchResponse } from '../models/book.model';

@Injectable({
  providedIn: 'root'
})
export class BookService {
  private http = inject(HttpClient);
  private apiUrl = 'https://openlibrary.org';

  searchBooks(query: string): Observable<BookSearchResponse> {
    return this.http.get<BookSearchResponse>(
      `${this.apiUrl}/search.json?q=${encodeURIComponent(query)}&limit=12`
    ).pipe(
      catchError(error => {
        console.error('API error:', error);
        return throwError(() => new Error('Failed to fetch books. Please try again.'));
      })
    );
  }
}