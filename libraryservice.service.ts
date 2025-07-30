import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
 
export interface Book {
  id: number;
  title: string;
  author: string;
  availability: number;
}
 
export interface User {
  id?: number;
  userName: string;
  email: string;
  password: string;
}
 
export interface IssuedBook {
  id: number;
  bookId: number;
  title: string;
  user: string;
  issueDate: string;
  returnDate?: string;
  returned: boolean;
}
 
export interface NewBook {
  id: number;
  title: string;
  user: string;
  issueDate: string;
  returnDate?: string;
  returned: boolean;
  fine?: number;
}
 
export interface Fine {
  studentName: string;
  bookTitle: string;
  issueDate: string;
  returnDate: string;
  daysLate: number;
  amount: number;
}
 
@Injectable({
  providedIn: 'root'
})
export class LibraryService {
  private apiUrl = 'http://localhost:3000/books';
  private issueUrl = 'http://localhost:3000/issue';
  private issuedBooksUrl = 'http://localhost:3000/issuedBooks';
 
  constructor(private http: HttpClient) {}
 
  getBooks(): Observable<Book[]> {
    return this.http.get<Book[]>(this.apiUrl);
  }
 
  addBook(book: Book): Observable<Book> {
    return this.http.post<Book>(this.apiUrl, book);
  }
 
  updateBook(id: number, book: Book): Observable<Book> {
    return this.http.put<Book>(`${this.apiUrl}/${id}`, book);
  }
 
  deleteBook(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
 
  registerUser(user: User): Observable<User> {
    return this.http.post<User>('http://localhost:3000/users', user);
  }
 
  getUsers(): Observable<User[]> {
    return this.http.get<User[]>('http://localhost:3000/users');
  }
 
  getStudents(): Observable<any[]> {
    return this.http.get<any[]>('http://localhost:3000/students');
  }
 
  addStudent(student: any): Observable<any> {
    return this.http.post('http://localhost:3000/students', student);
  }
 
  updateStudent(id: number, student: any): Observable<any> {
    return this.http.put(`http://localhost:3000/students/${id}`, student);
  }
 
  deleteStudent(id: number): Observable<any> {
    return this.http.delete(`http://localhost:3000/students/${id}`);
  }
 
  getIssuedBooks(): Observable<IssuedBook[]> {
    return this.http.get<IssuedBook[]>(this.issuedBooksUrl);
  }
 
  issueBook(book: Partial<IssuedBook>): Observable<IssuedBook> {
    return this.http.post<IssuedBook>(this.issuedBooksUrl, book);
  }
 
  returnBook(id: number, returnDate: string): Observable<IssuedBook> {
    return this.http.patch<IssuedBook>(`${this.issuedBooksUrl}/${id}`, {
      Date: returnDate
    });
  }
 
  deleteIssuedBook(id: number): Observable<void> {
    return this.http.delete<void>(`${this.issuedBooksUrl}/${id}`);
  }
 
  updateIssuedBook(id: number, updatedBook: Partial<IssuedBook>): Observable<IssuedBook> {
    return this.http.patch<IssuedBook>(`${this.issuedBooksUrl}/${id}`, updatedBook);
  }
 
  getFines(): Observable<Fine[]> {
    return this.http.get<Fine[]>('http://localhost:3000/fine');
  }
 
  addFineRecord(fine: Fine): Observable<any> {
    return this.http.post('http://localhost:3000/fine', fine);
  }
}
