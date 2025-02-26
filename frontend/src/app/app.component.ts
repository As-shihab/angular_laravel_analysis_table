import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HomeLayoutComponent } from "./Layout/home-layout/home-layout.component";
import { HeaderComponent } from "./Components/header/header.component";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, HomeLayoutComponent, HeaderComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'client-app';
}
