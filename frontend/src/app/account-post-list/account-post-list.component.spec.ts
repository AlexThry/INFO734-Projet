import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AccountPostListComponent } from './account-post-list.component';

describe('AccountPostListComponent', () => {
  let component: AccountPostListComponent;
  let fixture: ComponentFixture<AccountPostListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AccountPostListComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AccountPostListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
