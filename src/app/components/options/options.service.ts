import { Injectable } from '@angular/core';
import { Options } from './options';

@Injectable({
    providedIn: 'root'
})
export class OptionsService {
    constructor() { }
    
    // getters and setters for state retention of list filtering
    // changed to sessionStorage from properties to retain filters on refresh
    getSearchInput(): string | null {
      return sessionStorage.getItem('searchInput');
    }

    getActiveTab(): string | null {
      return sessionStorage.getItem('activeTab');
    }

    setSearchInput(searchInput: string): void {
      sessionStorage.setItem('searchInput', searchInput);
    }

    setActiveTab(activeTab: Options): void {
      sessionStorage.setItem('activeTab', activeTab);
    }
}