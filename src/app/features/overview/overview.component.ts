import { Component, OnInit } from '@angular/core';

import { CommonModule } from '@angular/common';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { TagModule } from 'primeng/tag';
import { Student } from '../../core/models/student.model';
import { StudentService } from '../../core/services/student.service';

@Component({
  selector: 'app-overview',
  standalone: true,
  imports: [CommonModule, TableModule, ButtonModule, TagModule],
  templateUrl: './overview.component.html',
  styleUrls: ['./overview.component.scss']
})
export class OverviewComponent implements OnInit {
  students: Student[] = [];

  constructor(private studentService: StudentService) {}

  ngOnInit(): void {
    this.loadStudents();
  }

  loadStudents(): void {
    this.studentService.getAll().subscribe({
      next: (res) => (this.students = res),
      error: (err) => console.error('Failed to load students:', err)
    });
  }

  onAdd(): void {
    console.log('Add student clicked');
    // Optionally trigger a form/modal here
  }

  onEdit(id: number): void {
    console.log('Edit student with ID:', id);
    // Navigate to form or open modal
  }

  onDelete(id: number): void {
    if (confirm('Are you sure you want to delete this student?')) {
      this.studentService.delete(id).subscribe({
        next: () => {
          console.log('Deleted student:', id);
          this.loadStudents(); // Refresh list
        },
        error: (err) => console.error('Delete failed:', err)
      });
    }
  }
}
