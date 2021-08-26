import { Component, OnInit } from '@angular/core';
import { PrimeNGConfig } from 'primeng/api';

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.css']
})
export class HomepageComponent implements OnInit {

  constructor(private primengConfig: PrimeNGConfig) {}

    ngOnInit() {
      // Allow the Ripple effect
        this.primengConfig.ripple = true;
    }
}
