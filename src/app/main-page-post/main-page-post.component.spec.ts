import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MainPagePostComponent } from './main-page-post.component';

describe('MainPageCardComponent', () => {
  let component: MainPagePostComponent;
  let fixture: ComponentFixture<MainPagePostComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MainPagePostComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MainPagePostComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
