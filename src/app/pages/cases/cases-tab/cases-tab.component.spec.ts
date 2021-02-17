import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CasesTabComponent } from './cases-tab.component';

describe('CasesTabComponent', () => {
  let component: CasesTabComponent;
  let fixture: ComponentFixture<CasesTabComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CasesTabComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CasesTabComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
