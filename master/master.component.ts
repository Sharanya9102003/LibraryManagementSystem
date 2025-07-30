import { ContentComponent } from './../content/content.component';
import { HeaderComponent } from './../header/header.component';
import { RouterOutlet } from '@angular/router';
import { FooterComponent } from './../footer/footer.component';
import { Component } from '@angular/core';

@Component({
  selector: 'app-master',
  imports: [RouterOutlet,FooterComponent,HeaderComponent],
  templateUrl: './master.component.html',
  styleUrl: './master.component.css'
})
export class MasterComponent {

}
