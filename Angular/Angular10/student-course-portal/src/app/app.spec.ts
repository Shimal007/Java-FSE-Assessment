import { TestBed } from '@angular/core/testing';
import { App } from './app';
import { LoadingService } from './services/loading.service';
import { BehaviorSubject } from 'rxjs';
import { provideRouter } from '@angular/router';

describe('App', () => {
  let loadingServiceSpy: any;
  let isLoadingSubject: BehaviorSubject<boolean>;

  beforeEach(async () => {
    isLoadingSubject = new BehaviorSubject<boolean>(false);
    loadingServiceSpy = {
      isLoading$: isLoadingSubject.asObservable()
    };

    await TestBed.configureTestingModule({
      imports: [App],
      providers: [
        { provide: LoadingService, useValue: loadingServiceSpy },
        provideRouter([])
      ]
    }).compileComponents();
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(App);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it('should render loading state when isLoading$ is true', () => {
    const fixture = TestBed.createComponent(App);
    isLoadingSubject.next(true);
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('.global-loader')?.textContent).toContain('Loading...');
  });
});
