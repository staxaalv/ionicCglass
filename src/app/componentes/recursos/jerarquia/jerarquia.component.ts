import { Component, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { GeneralService } from 'src/app/servicios/generales/general.service';

@Component({
  selector: 'app-jerarquia',
  templateUrl: './jerarquia.component.html',
  styleUrls: ['./jerarquia.component.css']
})
export class JerarquiaComponent implements OnInit {

  items: MenuItem[] = [{ label: 'Home' }];

  home: MenuItem = { icon: 'pi pi-pw pi-home' };

  mostrar: boolean = false;

  constructor(private gService: GeneralService) {

  }
  ngAfterViewInit(){
    
    //this.mostrar = true;
  }
  ngOnInit() {

    if (this.gService){
      this.items = this.gService.rutaActual;
      this.home = { icon: this.gService.iconoActual };
    }
    /*this.items = [
      { label: 'Categories' },
      { label: 'Sports' },
      { label: 'Football' },
      { label: 'Countries' },
      { label: 'Spain' },
      { label: 'F.C. Barcelona' },
      { label: 'Squad' },
      { label: 'Lionel Messi', url: 'https://en.wikipedia.org/wiki/Lionel_Messi', icon: 'pi pi-external-link' }
    ];*/
    
      

    
  }
}
