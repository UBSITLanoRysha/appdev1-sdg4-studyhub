import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DashboardComponent } from './dashboard';
import { BookService } from '../../services/book.service';
import { provideHttpClient } from '@angular/common/http';
import { provideRouter } from '@angular/router';
import { routes } from '../../app.routes';
import { of } from 'rxjs';
import { BookSearchResponse } from '../../models/book.model';
import { vi, describe, it, expect, beforeEach } from 'vitest';

describe('DashboardComponent', () => {
  let component: DashboardComponent;
  let fixture: ComponentFixture<DashboardComponent>;
  let mockBookService: any;

  const mockBooks: BookSearchResponse = {
    docs: [
      {
        key: '/works/OL1234W',
        title: 'Mathematics for Everyone',
        author_name: ['John Doe'],
        first_publish_year: 2020,
        cover_i: 12345
      },
      {
        key: '/works/OL5678W',
        title: 'Science Basics',
        author_name: ['Jane Smith'],
        first_publish_year: 2019,
        cover_i: 67890
      }
    ],
    numFound: 2,
    start: 0
  };

  beforeEach(async () => {
    mockBookService = {
      searchBooks: vi.fn().mockReturnValue(of(mockBooks))
    };

    await TestBed.configureTestingModule({
      imports: [DashboardComponent],
      providers: [
        provideHttpClient(),
        provideRouter(routes),
        { provide: BookService, useValue: mockBookService }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(DashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the dashboard component', () => {
    expect(component).toBeTruthy();
  });

  it('should start with null books$ and hasSearched false', () => {
    expect(component.books$).toBeNull();
    expect(component.hasSearched()).toBeFalsy();
  });

  it('should set books$ observable when searchBooks is called', () => {
    component.searchQuery.set('mathematics');
    component.searchBooks();

    expect(component.books$).not.toBeNull();
    expect(mockBookService.searchBooks).toHaveBeenCalledWith('mathematics');
  });

  it('should set hasSearched to true after searching', () => {
    expect(component.hasSearched()).toBeFalsy();
    component.searchQuery.set('history');
    component.searchBooks();
    expect(component.hasSearched()).toBeTruthy();
  });

  it('should update totalResults signal after search', () => {
    component.searchQuery.set('science');
    component.searchBooks();
    fixture.detectChanges();
    expect(component.totalResults()).toBe(2);
  });
});