import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ContactService {
  constructor(
    private readonly http: HttpClient,
  ) { }

  getAll() {
    return this.http.get('/api/contacts');
  }

  getById(id: number) {
    return this.http.get(`/api/contacts/${id}`)
  }
}
