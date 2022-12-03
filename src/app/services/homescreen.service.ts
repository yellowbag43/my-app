import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class HomescreenService {
  isValid: boolean=true;

  constructor() { }

  setScreenFlag(val : boolean) {
    this.isValid=val;
  }

  getScreenFlag() {
    return this.isValid;
  }
}
