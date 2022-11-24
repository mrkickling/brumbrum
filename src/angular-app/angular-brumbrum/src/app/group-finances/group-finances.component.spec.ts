import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GroupFinancesComponent } from './group-finances.component';

describe('GroupComponent', () => {
  let component: GroupFinancesComponent;
  let fixture: ComponentFixture<GroupFinancesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [GroupFinancesComponent]
    })
      .compileComponents();

    fixture = TestBed.createComponent(GroupFinancesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
