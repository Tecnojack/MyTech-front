import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpVideosComponent } from './up-videos.component';

describe('UpVideosComponent', () => {
  let component: UpVideosComponent;
  let fixture: ComponentFixture<UpVideosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UpVideosComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UpVideosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
