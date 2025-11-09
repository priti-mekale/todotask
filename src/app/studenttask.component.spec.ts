import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StudenttaskComponent } from './studenttask.component';

describe('StudenttaskComponent', () => {
  let component: StudenttaskComponent;
  let fixture: ComponentFixture<StudenttaskComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StudenttaskComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StudenttaskComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
