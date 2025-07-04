import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { Student } from '../../core/models/student.model';
import { StudentService } from '../../core/services/student.service';

@Component({
  selector: 'app-overview',
  standalone: true,
  imports: [CommonModule, TableModule, ButtonModule],
  templateUrl: './overview.component.html',
  styleUrls: ['./overview.component.scss']
})
export class OverviewComponent implements OnInit {
  students: Student[] = [];

  constructor(private studentService: StudentService, private router: Router) {}

  ngOnInit(): void {
    this.loadStudents();
  }

  loadStudents(): void {
    this.studentService.getAll().subscribe((data) => {
      this.students = data;
    });
  }

  onAdd(): void {
    this.router.navigate(['/student/add']);
  }

  onEdit(id: number): void {
    this.router.navigate(['/student/edit', id]);
  }

  onDelete(id: number): void {
    this.studentService.delete(id).subscribe(() => {
      this.loadStudents(); // reload after delete
    });
  }
}
