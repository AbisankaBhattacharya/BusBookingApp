import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html'
})
export class DashboardComponent implements OnInit {
  buses: any[] = [];
  apiUrl = 'http://localhost:8080/api/bus';

  constructor(private http: HttpClient, private router: Router) {}

  ngOnInit() {
    this.fetchBuses();
  }

 fetchBuses() {
  const token = localStorage.getItem('token'); // or sessionStorage if stored there

  this.http.get(this.apiUrl, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  }).subscribe({
    next: (data: any) => {
      this.buses = data.buses || [];
    },
    error: (err) => {
      console.error('❌ Error fetching buses:', err);
      alert('Could not fetch buses.');
    }
  });
}

  goToSeats(busId: string) {
    this.router.navigate(['/seat-selection', busId]);
  }
}
