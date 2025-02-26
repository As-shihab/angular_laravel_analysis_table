import { Component } from '@angular/core';

import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from '../../Components/header/header.component';

@Component({
  selector: 'app-home-layout',
  standalone: true,
  imports: [HeaderComponent , RouterOutlet],
  templateUrl: './home-layout.component.html',
  styleUrl: './home-layout.component.css'
})
export class HomeLayoutComponent {

}
