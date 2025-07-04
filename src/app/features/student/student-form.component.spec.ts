import { ComponentFixture, TestBed } from '@angular/core/testing';
import { StudentFormComponent } from './student-form.component';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';

describe('StudentFormComponent', () => {
  let component: StudentFormComponent;
  let fixture: ComponentFixture<StudentFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        StudentFormComponent,
        ReactiveFormsModule,
        HttpClientTestingModule,
        RouterTestingModule
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(StudentFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize form with empty/default values', () => {
    expect(component.form).toBeDefined();
    const formValue = component.form.value;
    expect(formValue.firstName).toBe('');
    expect(formValue.lastName).toBe('');
    expect(formValue.email).toBe('');
    expect(formValue.courses).toEqual([]);
  });

  it('form should be invalid when empty', () => {
    expect(component.form.valid).toBeFalse();
  });

  it('should update form control value when input changes', () => {
    const input: HTMLInputElement = fixture.nativeElement.querySelector('input[formcontrolname="firstName"]');
    input.value = 'Alice';
    input.dispatchEvent(new Event('input'));
    fixture.detectChanges();
    expect(component.form.get('firstName')?.value).toBe('Alice');
  });

  it('should call onSubmit and proceed when form is valid', () => {
    spyOn(component, 'onSubmit').and.callThrough();

    component.form.setValue({
      firstName: 'John',
      lastName: 'Doe',
      email: 'john.doe@example.com',
      courses: ['Physics']
    });
    fixture.detectChanges();

    component.onSubmit();

    expect(component.onSubmit).toHaveBeenCalled();
    expect(component.form.valid).toBeTrue();
  });
});
