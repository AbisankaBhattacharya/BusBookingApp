import { Component } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-create-bus',
  templateUrl: './create-bus.component.html',
  styleUrls: ['./create-bus.component.css']
})
export class CreateBusComponent {
  name = '';
  totalSeats = 40;

  constructor(private http: HttpClient) {}

  createBus() {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);

    this.http.post('http://localhost:8080/api/bus/create', {
      name: this.name,
      totalSeats: this.totalSeats
    }, { headers }).subscribe({
      next: () => {
        alert('✅ Bus created successfully!');
        this.name = '';
        this.totalSeats = 40;
      },
      error: (err) => {
        console.error('❌ Error creating bus:', err);
        alert(err.error?.message || 'Failed to create bus');
      }
    });
  }
}
