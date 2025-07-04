import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MultiSelectModule } from 'primeng/multiselect';
import { ButtonModule } from 'primeng/button';
import { StudentService } from '../../core/services/student.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Student } from '../../core/models/student.model';

@Component({
  selector: 'app-student-form',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MultiSelectModule,
    ButtonModule
  ],
  templateUrl: './student-form.component.html',
  styleUrls: ['./student-form.component.scss']
})
export class StudentFormComponent implements OnInit {
  form!: FormGroup;
  studentId?: number;
  isEditMode = false;

  allCourses: string[] = [
    "Philosophy", "Geography", "Biology", "Physics", "Chemistry", "Art",
    "Economics", "English", "History", "Music", "Math", "Computer Science"
  ];

  allCoursesOptions = this.allCourses.map(c => ({ label: c, value: c }));

  constructor(
    private fb: FormBuilder,
    private studentService: StudentService,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.studentId = Number(this.route.snapshot.paramMap.get('id'));
    console.log('studentId from route:', this.studentId);

    this.isEditMode = !!this.studentId;

    this.form = this.fb.group({
      firstName: [{ value: '', disabled: this.isEditMode }, Validators.required],
      lastName: [{ value: '', disabled: this.isEditMode }, Validators.required],
      email: [{ value: '', disabled: this.isEditMode }, [Validators.required, Validators.email]],
      courses: [[], Validators.required]
    });

    if (this.isEditMode && this.studentId) {
      this.loadStudent(this.studentId);
    }
  }

loadStudent(id: number) {
  this.studentService.getById(id).subscribe({
    next: (student) => {
      console.log('Loaded student:', student);
      if (!student) {
        console.error('No student found with ID', id);
      }
      this.form.patchValue({
        firstName: student.firstName,
        lastName: student.lastName,
        email: student.email,
        courses: student.courses || []
      });
    },
    error: (err) => {
      console.error('Failed to load student', err);
    }
  });
}

  onSubmit() {
    if (this.form.invalid) return;

    const formValue = this.form.getRawValue();

    if (this.isEditMode && this.studentId) {
      const updatedStudent: Student = {
        id: this.studentId,
        firstName: formValue.firstName,
        lastName: formValue.lastName,
        email: formValue.email,
        courses: formValue.courses
      };
      console.log('Updating student:', updatedStudent);
      this.studentService.update(this.studentId, updatedStudent).subscribe({
        next: () => this.router.navigate(['/overview']),
        error: (err) => console.error('Update failed', err)
      });
    } else {
      this.studentService.create(formValue).subscribe({
        next: () => this.router.navigate(['/overview']),
        error: (err) => console.error('Creation failed', err)
      });
    }
  }

  onCourseToggle(course: string, checked: boolean) {
    const courses: string[] = [...this.form.value.courses];
    if (checked) {
      if (!courses.includes(course)) {
        courses.push(course);
      }
    } else {
      const index = courses.indexOf(course);
      if (index > -1) {
        courses.splice(index, 1);
      }
    }
    this.form.get('courses')?.setValue(courses);
    console.log('Current courses:', courses);
  }

  onCancel() {
    this.router.navigate(['/overview']);
  }
}
