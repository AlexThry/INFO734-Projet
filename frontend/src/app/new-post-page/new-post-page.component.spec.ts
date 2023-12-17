import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewPostPageComponent } from './new-post-page.component';

describe('NewPostPageComponent', () => {
  let component: NewPostPageComponent;
  let fixture: ComponentFixture<NewPostPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NewPostPageComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(NewPostPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
