import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { OverviewComponent } from './overview.component';
import { of, throwError } from 'rxjs';
import { StudentService } from '../../../core/services/student.service';
import { Router } from '@angular/router';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { Student } from '../../../core/models/student.model';

describe('OverviewComponent', () => {
  let component: OverviewComponent;
  let fixture: ComponentFixture<OverviewComponent>;
  let studentServiceMock: any;
  let routerMock: any;

  const mockStudents: Student[] = [
    {
      id: 1,
      firstName: 'John',
      lastName: 'Doe',
      email: 'john@example.com',
      courses: ['Math', 'Physics']
    },
    {
      id: 2,
      firstName: 'Jane',
      lastName: 'Smith',
      email: 'jane@example.com',
      courses: ['Biology']
    },
  ];

  beforeEach(async () => {
    studentServiceMock = {
      getAll: jasmine.createSpy('getAll').and.returnValue(of(mockStudents)),
      delete: jasmine.createSpy('delete').and.returnValue(of({}))
    };

    routerMock = {
      navigate: jasmine.createSpy('navigate')
    };

    await TestBed.configureTestingModule({
      imports: [OverviewComponent],
      providers: [
        { provide: StudentService, useValue: studentServiceMock },
        { provide: Router, useValue: routerMock }
      ],
      schemas: [NO_ERRORS_SCHEMA]  // Ignore unknown elements like p-table, p-menu
    }).compileComponents();

    fixture = TestBed.createComponent(OverviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create component', () => {
    expect(component).toBeTruthy();
  });

  it('should load students on init', () => {
    expect(studentServiceMock.getAll).toHaveBeenCalled();
    expect(component.students.length).toBe(2);
  });

  it('should navigate to add page when onAdd is called', () => {
    component.onAdd();
    expect(routerMock.navigate).toHaveBeenCalledWith(['/student/add']);
  });

  it('should navigate to edit page when onEdit is called', () => {
    component.onEdit(1);
    expect(routerMock.navigate).toHaveBeenCalledWith(['/student/edit', 1]);
  });

  it('should call delete service and reload students when onDelete confirmed', fakeAsync(() => {
    spyOn(window, 'confirm').and.returnValue(true);

    component.onDelete(1);

    expect(studentServiceMock.delete).toHaveBeenCalledWith(1);

    // Simulate observable delay
    tick();

    expect(studentServiceMock.getAll).toHaveBeenCalledTimes(2); // initial load + reload
  }));

  it('should not call delete service when onDelete canceled', () => {
    spyOn(window, 'confirm').and.returnValue(false);
    component.onDelete(1);
    expect(studentServiceMock.delete).not.toHaveBeenCalled();
  });

  it('should update pagination state on page change', () => {
    const pageEvent = { first: 10, rows: 10 };
    component.onPageChange(pageEvent);
    expect(component.first).toBe(10);
    expect(component.rows).toBe(10);
  });

  it('should calculate isFirstPage and isLastPage correctly', () => {
    component.students = Array(30).fill(null).map((_, i) => ({
      id: i,
      firstName: `First${i}`,
      lastName: `Last${i}`,
      email: `user${i}@example.com`,
      courses: ['Math', 'Physics']
    }));
    component.first = 0;
    component.rows = 10;
    expect(component.isFirstPage()).toBeTrue();
    expect(component.isLastPage()).toBeFalse();

    component.first = 20;
    expect(component.isLastPage()).toBeTrue();
  });

});
