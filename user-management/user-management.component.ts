import { Component, OnInit } from '@angular/core';
import { LibraryService } from '../libraryservice.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

interface Student {
  id?: number;
  name: string;
  email: string;
}

@Component({
  selector: 'app-user-management',
  imports:[CommonModule,FormsModule],
  templateUrl: './user-management.component.html',
  styleUrls: ['./user-management.component.css']
})
export class UserManagementComponent implements OnInit {
  students: Student[] = [];
  newStudent: Student = { name: '', email: '' };
  editingIndex: number | null = null;

  constructor(private libraryService: LibraryService) {}

  ngOnInit(): void {
    this.loadStudents();
  }

  loadStudents(): void {
    this.libraryService.getStudents().subscribe(data => {
      this.students = data;
    });
  }

  addStudent(): void {
    if (this.newStudent.name && this.newStudent.email) {
      this.libraryService.addStudent(this.newStudent).subscribe(() => {
        this.loadStudents();
        this.newStudent = { name: '', email: '' };
      });
    } else {
      alert('Please fill in all fields.');
    }
  }

  startEdit(index: number): void {
    this.editingIndex = index;
  }

  saveEdit(student: Student): void {
    if (student.id !== undefined) {
      this.libraryService.updateStudent(student.id, student).subscribe(() => {
        this.editingIndex = null;
        this.loadStudents();
      });
    }
  }

  deleteStudent(id: number): void {
    this.libraryService.deleteStudent(id).subscribe(() => {
      this.loadStudents();
    });
  }
}
