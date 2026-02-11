import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Libraryintro } from './libraryintro';

describe('Libraryintro', () => {
  let component: Libraryintro;
  let fixture: ComponentFixture<Libraryintro>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Libraryintro]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Libraryintro);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
