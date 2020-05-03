import { Component, OnInit } from '@angular/core';
import { GeneralService } from 'src/app/servicios/generales/general.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(private gs: GeneralService) { }

  ngOnInit() {
    
  }

}
