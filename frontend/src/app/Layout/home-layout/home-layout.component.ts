import { Component } from '@angular/core';
import { HeaderComponent } from "../../Components/header/header.component";
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-home-layout',
  standalone: true,
  imports: [HeaderComponent , RouterOutlet],
  templateUrl: './home-layout.component.html',
  styleUrl: './home-layout.component.css'
})
export class HomeLayoutComponent {

}
