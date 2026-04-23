import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { Book } from '../../models/book.model';

@Component({
  selector: 'app-book-card',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './book-card.html',
  styleUrl: './book-card.css'
})
export class BookCardComponent {
  @Input() book!: Book;
  @Output() bookSelected = new EventEmitter<Book>();

  getCoverUrl(): string {
    if (this.book.cover_i) {
      return `https://covers.openlibrary.org/b/id/${this.book.cover_i}-M.jpg`;
    }
    return 'https://via.placeholder.com/150x200?text=No+Cover';
  }

  getBookId(): string {
    return this.book.key.replace('/works/', '');
  }

  onSelect() {
    this.bookSelected.emit(this.book);
  }
}