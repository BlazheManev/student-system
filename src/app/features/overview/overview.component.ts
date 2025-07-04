import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TableModule } from 'primeng/table';
import { TagModule } from 'primeng/tag';
import { MenuModule } from 'primeng/menu';
import { ButtonModule } from 'primeng/button';
import { MenuItem } from 'primeng/api';
import { Student } from '../../core/models/student.model';
import { StudentService } from '../../core/services/student.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-overview',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    TableModule,
    TagModule,
    MenuModule,
    ButtonModule,
  ],
  templateUrl: './overview.component.html',
  styleUrls: ['./overview.component.scss']
})
export class OverviewComponent implements OnInit {
  students: Student[] = [];
  first = 0;
  rows = 10;

  editingStudent: Student | null = null;

  allCourses: string[] = ['Math', 'Physics', 'Chemistry', 'Biology', 'History'];

  constructor(
    private studentService: StudentService,
    private router: Router 
  ) {}

  ngOnInit(): void {
    this.loadStudents();
  }

  loadStudents(): void {
    this.studentService.getAll().subscribe({
      next: (data) => (this.students = data),
      error: (err) => console.error('Failed to load students:', err)
    });
  }

  onAdd(): void {
    this.router.navigate(['/student/add']);  // Navigate to add form page
  }

   onEdit(id: number): void {
    console.log("Sfsfsf")
    console.log(id)
    this.router.navigate(['/student/edit', id]);  // Navigate to edit form page with student ID
  }

  onDelete(id: number): void {
    if (confirm('Are you sure you want to delete this student?')) {
      this.studentService.delete(id).subscribe(() => this.loadStudents());
    }
  }

  getRowMenu(student: Student): MenuItem[] {
    return [
      {
        label: '✏️ Uredi',
        command: () => this.onEdit(student.id)
      },
      {
        label: '🗑️ Izbriši',
        command: () => this.onDelete(student.id)
      }
    ];
  }

  onPageChange(event: any): void {
    this.first = event.first;
    this.rows = event.rows;
  }

  onSave(updatedStudent: Student) {
    // Call update API (make sure you have this in your service)
    this.studentService.update(updatedStudent.id, updatedStudent).subscribe(() => {
      this.loadStudents();
      this.editingStudent = null;
    });
  }

  onCancelEdit() {
    this.editingStudent = null;
  }
}
