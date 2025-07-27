import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BusService } from '../../services/bus.service';
import { Seat } from '../../models/seat.model';
import { getUserEmailFromToken } from '../../utils/jwt.util';

@Component({
  selector: 'app-seat-selection',
  templateUrl: './seat-selection.component.html',
  styleUrls: ['./seat-selection.component.css']
})
export class SeatSelectionComponent implements OnInit {
  busId!: string;
  loading = true;
  seatRows: any[][] = [];
  selectedSeats: any[] = [];
  seatPrice = 200; // ₹ per seat, optional

  constructor(
    private busService: BusService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.busId = this.route.snapshot.params['busId']
    console.log("testing",this.route.snapshot.params['busId'])
    this.fetchSeats();
  }

  fetchSeats() {
    this.loading = true;
    this.busService.getSeats(this.busId).subscribe((seats) => {
      const rows = [];
      for (let i = 0; i < seats.length; i += 4) {
        const rowSeats = seats.slice(i, i + 4).map(seat => ({
          ...seat,
          seatLabel: this.getSeatLabel(seat.seatNo)
        }));
        rows.push(rowSeats);
      }
      this.seatRows = rows;
      this.loading = false;
    });
  }

  getSeatLabel(seatNo: number): string {
    const rowChar = String.fromCharCode(65 + Math.floor((seatNo - 1) / 4)); // A, B, C...
    const colNum = ((seatNo - 1) % 4) + 1;
    return `${rowChar}${colNum}`;
  }

  isSelected(seat: any): boolean {
    return this.selectedSeats.some(s => s.seatNo === seat.seatNo);
  }

  toggleSeatSelection(seat: any) {
    if (seat.booked) return;
    if (this.isSelected(seat)) {
      this.selectedSeats = this.selectedSeats.filter(s => s.seatNo !== seat.seatNo);
    } else {
      this.selectedSeats.push(seat);
    }
  }

  getTotalPrice(): number {
    return this.selectedSeats.length * this.seatPrice;
  }

  bookSelectedSeats() {
    const token = localStorage.getItem('token')!;
    const payload: any = JSON.parse(atob(token.split('.')[1]));
    const userEmail = payload.email;

    const seatNos = this.selectedSeats.map(s => s.seatNo);
    console.log("SeatNo", seatNos);
    
    this.busService.bookSeats(this.busId, seatNos, userEmail).subscribe(() => {
      alert('Booking Successful!');
      this.selectedSeats = [];
      this.fetchSeats();
    });
  }

  logout() {
    localStorage.removeItem('token');
    this.router.navigate(['/login']);
  }
}
