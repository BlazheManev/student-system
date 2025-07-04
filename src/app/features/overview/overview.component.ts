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
  styleUrls: ['./overview.component.css']
})
export class OverviewComponent implements OnInit {
  students: Student[] = [];
  first = 0;
  rows = 10;

  editingStudent: Student | null = null;

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
    this.router.navigate(['/student/add']);
  }

  onEdit(id: number): void {
    this.router.navigate(['/student/edit', id]);
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
next(): void {
    this.first = this.first + this.rows;
  }

  prev(): void {
    this.first = this.first - this.rows;
  }

  reset(): void {
    this.first = 0;
  }

  isLastPage(): boolean {
    return this.students ? this.first + this.rows >= this.students.length : true;
  }

  isFirstPage(): boolean {
    return this.students ? this.first === 0 : true;
  }

  onPageChange(event: any): void {
    this.first = event.first;
    this.rows = event.rows;
  }

}
