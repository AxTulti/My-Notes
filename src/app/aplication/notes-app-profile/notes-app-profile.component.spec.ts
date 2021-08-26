import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NotesAppProfileComponent } from './notes-app-profile.component';

describe('NotesAppProfileComponent', () => {
  let component: NotesAppProfileComponent;
  let fixture: ComponentFixture<NotesAppProfileComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NotesAppProfileComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NotesAppProfileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
