import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Student } from '../models/student.model';
import { Observable, map } from 'rxjs';
import { environment } from '../../../environments/environment';

@Injectable({ providedIn: 'root' })
export class StudentService {
  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) {}

  getAll(): Observable<Student[]> {
    return this.http.get<Student[]>(this.apiUrl);
  }

  getById(id: number): Observable<Student | undefined> {
    return this.http.get<Student[]>(this.apiUrl).pipe(
      map(students => students.find(student => student.id === id))
    );
  }

  create(student: Student): Observable<Student> {
    throw new Error('Create not supported with static JSON');
  }

  update(id: number, student: Student): Observable<Student> {
    throw new Error('Update not supported with static JSON');
  }

  delete(id: number): Observable<void> {
    throw new Error('Delete not supported with static JSON');
  }
}
