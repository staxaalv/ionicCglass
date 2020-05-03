import { Component, OnInit } from '@angular/core';
import { GeneralService } from 'src/app/servicios/generales/general.service';
import { MenuItem } from 'primeng/components/common/menuitem';
import { Router } from '@angular/router';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {

  display: boolean = false;
  loading = false;

  constructor(public general: GeneralService, private router: Router, ) {
  }

  showDialog() {
    this.display = true;
  }

  cerrarSesion(){
    this.loading = true;
    this.display = false;
    this.general.cerrarSesion();
    setTimeout(() => {
      this.general.cargarHome();
      this.router.navigate(['/login']);  
    }, 1500);
    
  }
}
