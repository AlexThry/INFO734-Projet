import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AccountPostComponent } from './account-post.component';

describe('AccountPostComponent', () => {
  let component: AccountPostComponent;
  let fixture: ComponentFixture<AccountPostComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AccountPostComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AccountPostComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
