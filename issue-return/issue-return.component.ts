import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { LibraryService, Book, IssuedBook } from '../libraryservice.service';
 
@Component({
  selector: 'app-issue-return',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './issue-return.component.html',
  styleUrls: ['./issue-return.component.css']
})
export class IssueReturnComponent implements OnInit {
  issue: Book[] = [];
  issuedBooks: IssuedBook[] = [];
  students: any[] = [];
 
  selectedBookId: number | null = null;
  selectedStudentName: string = '';
  selectedReturnDate: string = '';
 
  editingBookId: number | null = null;
  editedBook: Partial<IssuedBook> = {};
 
  constructor(private issueReturnService: LibraryService) {}
 
  ngOnInit(): void {
    this.loadBooks();
    this.loadIssuedBooks();
    this.loadStudents();
  }
 
  loadBooks(): void {
    this.issueReturnService.getBooks().subscribe((data: Book[]) => {
      this.issue = data;
    });
  }
 
  loadIssuedBooks(): void {
    this.issueReturnService.getIssuedBooks().subscribe((data: IssuedBook[]) => {
      this.issuedBooks = data;
    });
  }
 
  loadStudents(): void {
    this.issueReturnService.getStudents().subscribe((data: any[]) => {
      this.students = data;
    });
  }
 
  issueBook(): void {
    const book = this.issue.find(b => b.id === this.selectedBookId);
    if (book && this.selectedStudentName.trim() && this.selectedReturnDate) {
      const newIssue: Partial<IssuedBook> = {
        bookId: book.id,
        title: book.title,
        user: this.selectedStudentName,
        issueDate: new Date().toLocaleDateString(),
        returnDate: new Date(this.selectedReturnDate).toLocaleDateString(),
        returned: false
      };
      this.issueReturnService.issueBook(newIssue).subscribe(() => {
        this.loadIssuedBooks();
        this.selectedBookId = null;
        this.selectedStudentName = '';
        this.selectedReturnDate = '';
      });
    } else {
      alert('Please complete all fields to issue a book.');
    }
  }
 
  // ✅ Fixed returnBook method to update both returnDate and returned status
  returnBook(issueId: number): void {
    const returnDate = new Date().toLocaleDateString();
    const updatePayload = {
      returnDate: returnDate,
      returned: true
    };
 
    this.issueReturnService.updateIssuedBook(issueId, updatePayload).subscribe(() => {
      this.loadIssuedBooks();
    });
  }
 
  deleteIssuedBook(issueId: number): void {
    this.issueReturnService.deleteIssuedBook(issueId).subscribe(() => {
      this.loadIssuedBooks();
    });
  }
 
  isAvailable(bookId: number): boolean {
    return !this.issuedBooks.some(b => b.bookId === bookId && !b.returned);
  }
 
  startEditing(book: IssuedBook): void {
    this.editingBookId = book.id;
    this.editedBook = { ...book };
  }
 
  cancelEditing(): void {
    this.editingBookId = null;
    this.editedBook = {};
  }
 
  saveEditing(): void {
    if (this.editingBookId !== null) {
      this.issueReturnService.updateIssuedBook(this.editingBookId, this.editedBook).subscribe(() => {
        this.loadIssuedBooks();
        this.cancelEditing();
      });
    }
  }
}
 
 