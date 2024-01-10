import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MessagePannelComponent } from './message-pannel.component';

describe('MessagePannelComponent', () => {
  let component: MessagePannelComponent;
  let fixture: ComponentFixture<MessagePannelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MessagePannelComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(MessagePannelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
