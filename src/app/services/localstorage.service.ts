import { Injectable } from '@angular/core';

const  KEY = 'token'
@Injectable({
  providedIn: 'root'
})
export class LocalstorageService {

  constructor() { }

  storeKey(val: string) {
    localStorage.setItem(KEY, val);
  }

  getKey() :string{
    return localStorage.getItem(KEY);
  }

  removeKey() :void {
    localStorage.removeItem(KEY);
  }
}
