import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CarouselModule } from 'primeng/carousel';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CarouselModule, RouterLink],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  isLoggedIn: boolean = false;

  images: string[] = [
    'assets/img/coche1.webp',
    'assets/img/coche2.webp',
    'assets/img/coche3.jpg'
  ];

  responsiveOptions = [
    {
      breakpoint: '1024px',
      numVisible: 1,
      numScroll: 1
    }
  ];

  constructor() {
    this.isLoggedIn = !!localStorage.getItem('token');
  }
}
