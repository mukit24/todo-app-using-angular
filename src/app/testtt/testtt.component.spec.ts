import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TestttComponent } from '../todos/components/testtt.component';

describe('TestttComponent', () => {
  let component: TestttComponent;
  let fixture: ComponentFixture<TestttComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TestttComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TestttComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
