
// import { Component } from '@angular/core';
// import { RouterOutlet } from '@angular/router';
// import { MasterComponent } from "./master/master.component";
// import { CommonModule } from '@angular/common';
 
// @Component({
//   selector: 'app-root',
//   imports: [CommonModule, RouterOutlet],
//   templateUrl: './app.component.html',
//   styleUrl: './app.component.css'
// })
// export class AppComponent {
//   title ='librarymanagement';
 
// }
import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'librarymanagement';
}
