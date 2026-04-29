import { Component, signal, computed, inject, effect } from '@angular/core';
import { CommonModule, AsyncPipe } from '@angular/common';
import { BookService } from '../../services/book.service';
import { Book } from '../../models/book.model';
import { BookCardComponent } from '../../components/book-card/book-card';
import { Observable, of, catchError, startWith, map } from 'rxjs';

interface SearchState {
  books: Book[];
  loading: boolean;
  error: string;
}

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, AsyncPipe, BookCardComponent],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.css'
})
export class DashboardComponent {
  private bookService = inject(BookService);

  searchQuery = signal('');
  hasSearched = signal(false);
  totalResults = signal(0);

  books$: Observable<SearchState> | null = null;

  constructor() {
    effect(() => {
      console.log(`Total results updated: ${this.totalResults()}`);
    });
  }

  canDeactivate(): boolean {
    return !this.hasSearched();
  }

  searchBooks() {
    if (!this.searchQuery()) return;
    this.hasSearched.set(true);

    this.books$ = this.bookService.searchBooks(this.searchQuery()).pipe(
      map(response => {
        this.totalResults.set(response.docs.length);
        return {
          books: response.docs,
          loading: false,
          error: ''
        };
      }),
      startWith({ books: [], loading: true, error: '' }),
      catchError(err => of({
        books: [],
        loading: false,
        error: err.message
      }))
    );
  }

  onBookSelected(book: Book) {
    console.log('Selected book:', book.title);
  }
}