import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Trackartist } from './trackartist';

describe('Trackartist', () => {
  let component: Trackartist;
  let fixture: ComponentFixture<Trackartist>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Trackartist]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Trackartist);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
