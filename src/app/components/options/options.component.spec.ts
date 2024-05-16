import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OptionsComponent } from './options.component';
import { OptionsService } from './options.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { Options } from './options';

describe('OptionsComponent', () => {
  let component: OptionsComponent;
  let fixture: ComponentFixture<OptionsComponent>;

  const mockOptionsService = {
    getSearchInput: jest.fn(),
    getActiveTab: jest.fn(),
    setSearchInput: jest.fn(),
    setActiveTab: jest.fn(),
  }

  const mockActiveTab = Options.MOVIES;
  const mockSearchInput = 'mockSearchInput'

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [OptionsComponent],
      providers: [
        {
          provide: OptionsService,
          useValue: mockOptionsService
        }
      ],
      imports: [HttpClientTestingModule]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(OptionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('ngOnInit calls getState', () => {
    jest.spyOn(component, 'getState');
    component.ngOnInit();
    expect(component.getState).toHaveBeenCalled();
  });

  describe('getState', () => {
    it('should correctly get activeTab and searchInput', () => {
      mockOptionsService.getActiveTab.mockReturnValueOnce(Options.MOVIES);
      mockOptionsService.getSearchInput.mockReturnValueOnce(mockSearchInput);
      component.getState();
      expect(component.activeTab).toEqual(mockActiveTab);
      expect(component.searchInput).toEqual(mockSearchInput);
    });

    it('should call getMovies if movie tab is selected', () => {
      mockOptionsService.getActiveTab.mockReturnValueOnce(Options.MOVIES);
      jest.spyOn(component, 'getMovies');
      component.getState();
      expect(component.getMovies).toHaveBeenCalled();
    });

    it('should call getShows if tv show tab is selected', () => {
      mockOptionsService.getActiveTab.mockReturnValueOnce(Options.TV_SHOWS);
      jest.spyOn(component, 'getShows');
      component.getState();
      expect(component.getShows).toHaveBeenCalled();
    });
  });

  describe('getMovies', () => {
    it('should correctly set activeTab', () => {
      component.getMovies();
      expect(mockOptionsService.setActiveTab).toHaveBeenCalledWith(component.activeTab);
    });

    it('should filter if valid searchInput is provided', () => {
      component.searchInput = mockSearchInput;
      fixture.detectChanges();
      jest.spyOn(component, 'searchMovies');
      component.getMovies();
      expect(component.searchMovies).toHaveBeenCalled();
    });

    it('should get top movies if no valid searchInput is provided', () => {
      component.searchInput = '';
      fixture.detectChanges();
      jest.spyOn(component, 'getTopMovies');
      component.getMovies();
      expect(component.getTopMovies).toHaveBeenCalled();
    });
  });

  describe('getShows', () => {
    it('should correctly set activeTab', () => {
      component.getShows();
      expect(mockOptionsService.setActiveTab).toHaveBeenCalledWith(component.activeTab);
    });

    it('should filter if valid searchInput is provided', () => {
      component.searchInput = mockSearchInput;
      fixture.detectChanges();
      jest.spyOn(component, 'searchShows');
      component.getShows();
      expect(component.searchShows).toHaveBeenCalled();
    });

    it('should get top movies if no valid searchInput is provided', () => {
      component.searchInput = '';
      fixture.detectChanges();
      jest.spyOn(component, 'getTopShows');
      component.getShows();
      expect(component.getTopShows).toHaveBeenCalled();
    });
  });
});
