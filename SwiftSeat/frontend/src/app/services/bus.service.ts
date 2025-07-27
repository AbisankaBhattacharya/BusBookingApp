import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Seat } from '../models/seat.model';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class BusService {
  private apiUrl = 'http://localhost:8080/api/bus';

  constructor(private http: HttpClient) {}

  // 🔐 Get token and create Authorization header
  private getAuthHeaders(): HttpHeaders {
    const token = localStorage.getItem('token') || '';
    return new HttpHeaders({ Authorization: `Bearer ${token}` });
  }

  // ✅ Get all buses
  getAllBuses(): Observable<any> {
    return this.http.get(this.apiUrl, {
      headers: this.getAuthHeaders(),
    });
  }

  // ✅ Get seats for a specific bus
  getSeats(busId: string): Observable<Seat[]> {
    return this.http.get<Seat[]>(`${this.apiUrl}/${busId}/seats`, {
      headers: this.getAuthHeaders(),
    });
  }

  // ✅ Book multiple seats
  bookSeats(busId: string, seatNos: number[], userEmail: string): Observable<any> {
    return this.http.post(
      `${this.apiUrl}/${busId}/book`,
      { seatNos, userEmail },
      { headers: this.getAuthHeaders() }
    );
  }
}
