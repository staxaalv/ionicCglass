import { Component, OnInit } from '@angular/core';
import { GeneralService } from 'src/app/servicios/generales/general.service';
import { MenuItem } from 'primeng/components/common/menuitem';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  constructor(public general: GeneralService) { }

  ngOnInit() {
  }

  display: boolean = false;

    showDialog() {
        this.display = true;
    }

}
