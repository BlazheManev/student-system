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

@Component({
  selector: 'app-overview',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    TableModule,
    TagModule,
    MenuModule,
    ButtonModule
  ],
  templateUrl: './overview.component.html',
  styleUrls: ['./overview.component.scss']
})
export class OverviewComponent implements OnInit {
  students: Student[] = [];
  first = 0;
  rows = 20;

  constructor(private studentService: StudentService) {}

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
    console.log('Add student clicked');
  }

  onEdit(id: number): void {
    console.log('Edit student with ID:', id);
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

  get showingRange(): string {
    const from = this.first + 1;
    const to = Math.min(this.first + this.rows, this.students.length);
    const total = this.students.length;
    return `Showing ${from} to ${to} of ${total} entries`;
  }
}
