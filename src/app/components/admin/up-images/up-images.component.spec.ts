import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpImagesComponent } from './up-images.component';

describe('UpImagesComponent', () => {
  let component: UpImagesComponent;
  let fixture: ComponentFixture<UpImagesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UpImagesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UpImagesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
