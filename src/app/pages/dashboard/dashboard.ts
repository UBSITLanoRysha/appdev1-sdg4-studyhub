import { Component, signal, computed, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { BookService } from '../../services/book.service';
import { Book } from '../../models/book.model';
import { BookCardComponent } from '../../components/book-card/book-card';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, RouterLink, BookCardComponent],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.css'
})
export class DashboardComponent {
  private bookService = inject(BookService);

  searchQuery = signal('');
  books = signal<Book[]>([]);
  isLoading = signal(false);
  errorMessage = signal('');
  totalResults = computed(() => this.books().length);

  searchBooks() {
    if (!this.searchQuery()) return;
    this.isLoading.set(true);
    this.errorMessage.set('');
    this.books.set([]);

    this.bookService.searchBooks(this.searchQuery()).subscribe({
      next: (response) => {
        this.books.set(response.docs);
        this.isLoading.set(false);
      },
      error: (err) => {
        this.errorMessage.set(err.message);
        this.isLoading.set(false);
      }
    });
  }

  onBookSelected(book: Book) {
    console.log('Selected book:', book.title);
  }
}