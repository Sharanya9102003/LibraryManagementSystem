import { Component, OnInit } from '@angular/core';
import { LibraryService, Book, IssuedBook } from '../libraryservice.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

interface Student {
  id: string;
  name: string;
  email: string;
}

interface Fine {
  studentName: string;
  bookTitle: string;
  issueDate: string;
  returnDate: string;
  daysLate: number;
  amount: number;
}

@Component({
  selector: 'app-fine-management',
  imports:[CommonModule,FormsModule],
  templateUrl: './fine-management.component.html',
  styleUrls: ['./fine-management.component.css']
})
export class FineManagementComponent implements OnInit {
  books: Book[] = [];
  students: Student[] = [];
  issuedBooks: IssuedBook[] = [];
  fines: Fine[] = [];

  selectedBookId: string = '';
  selectedStudentId: string = '';

  constructor(private libraryService: LibraryService) {}

  ngOnInit(): void {
    this.libraryService.getBooks().subscribe((data: Book[]) => {
      this.books = data;
    });

    this.libraryService.getStudents().subscribe((data: Student[]) => {
      this.students = data;
    });

    this.libraryService.getIssuedBooks().subscribe((data: IssuedBook[]) => {
      this.issuedBooks = data;
    });

    // Load fines from JSON server
    this.libraryService.getFines().subscribe((data: Fine[]) => {
      this.fines = data;
    });
  }

  addFine(): void {
    const student = this.students.find(s => s.id === this.selectedStudentId);
    const issued = this.issuedBooks.find(
      b => b.bookId.toString() === this.selectedBookId && b.user === student?.name
    );

    if (issued && issued.returned && issued.returnDate) {
      const issueDate = new Date(this.formatDate(issued.issueDate));
      const returnDate = new Date(this.formatDate(issued.returnDate));
      const diffDays = Math.ceil((returnDate.getTime() - issueDate.getTime()) / (1000 * 3600 * 24));

      if (diffDays > 3) {
        const fineAmount = (diffDays - 3) * 10;
        const fineRecord: Fine = {
          studentName: issued.user,
          bookTitle: issued.title,
          issueDate: issued.issueDate,
          returnDate: issued.returnDate,
          daysLate: diffDays - 3,
          amount: fineAmount
        };

        // Save to backend
        this.libraryService.addFineRecord(fineRecord).subscribe(() => {
          this.fines.push(fineRecord); // Update local list after saving
          alert('Fine added successfully.');
        });
      } else {
        alert('No fine. Book returned within 3 days.');
      }
    } else {
      alert('Book not returned or not found.');
    }
  }

  formatDate(dateStr: string): string {
    const [day, month, year] = dateStr.split('/');
    return `${year}-${month}-${day}`;
  }
}
