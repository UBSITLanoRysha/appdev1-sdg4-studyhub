import { Component, inject, signal, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-detail',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './detail.html',
  styleUrl: './detail.css'
})
export class DetailComponent implements OnInit {
  private route = inject(ActivatedRoute);
  private http = inject(HttpClient);

  book = signal<any>(null);
  isLoading = signal(true);
  errorMessage = signal('');

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.http.get(`https://openlibrary.org/works/${id}.json`).subscribe({
        next: (data: any) => {
          this.book.set(data);
          this.isLoading.set(false);
        },
        error: () => {
          this.errorMessage.set('Could not load book details. Please try again.');
          this.isLoading.set(false);
        }
      });
    }
  }

  getDescription(): string {
    const desc = this.book()?.description;
    if (!desc) return 'No description available.';
    if (typeof desc === 'string') return desc;
    if (typeof desc === 'object') return desc.value;
    return 'No description available.';
  }
}