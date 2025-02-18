import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HomeLayoutComponent } from "./Layout/home-layout/home-layout.component";
import { HeaderComponent } from "./Components/header/header.component";
// import { ShellBarComponent } from "@ui5/webcomponents-ngx/fiori/shell-bar";
// import { ButtonComponent} from "@ui5/webcomponents-ngx/main/button";
// import { AvatarComponent} from "@ui5/webcomponents-ngx/main/avatar";
// import { BarComponent} from "@ui5/webcomponents-ngx/main/bar";
// import { LabelComponent} from "@ui5/webcomponents-ngx/main/label";
// import { IconComponent} from "@ui5/webcomponents-ngx/main/icon";
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
