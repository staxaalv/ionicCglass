import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MessageService } from 'primeng/api';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';


@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.css'],
  providers: [MessageService],
})
export class IndexComponent implements OnInit {

  show: boolean;
  data: any;
  data1: any;
  data3: any;
  optionsCalendar: any;
  options: any;
  options1: any;
  options3: any;
  now: Date;
  events: any[];

  canvasWidth: any = 325
  needleValue: any = 20
  centralLabel: any = ''
  name: any = 'Crecimiento Ventas'
  bottomLabel: any = '20%'
  options2 = {
    hasNeedle: true,
    needleColor: 'gray',
    needleUpdateSpeed: 1000,
    arcColors: ['#2c6aa0', 'lightgray'],
    arcDelimiters: [20],
    rangeLabel: ['0', '100'],
    needleStartValue: 50,
  }

  getMostrar(){
    return true;
  }

  constructor(private messageService: MessageService,
    private changeDetector: ChangeDetectorRef) {
    //this.now = new Date();
  }

  ngAfterContentChecked(): void {
    this.changeDetector.detectChanges();
  }

  selectData(event) {
    this.messageService.add({ severity: 'info', summary: 'Data Selected', 'detail': this.data.datasets[event.element._datasetIndex].data[event.element._index] });
  }

  getNow(){
    return new Date();
  }

  ngAfterViewInit() {
    //this.now = new Date();
    //this.show = true;
  }
  ngAfterViewChecked() {
    //this.show = true;
  }
  ngOnInit() { 
  }

  ngAfterContentInit(){
    this.data = {
      labels: ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio'],
      datasets: [
        {
          label: 'Vendedor 1',
          data: [65, 59, 80, 81, 56, 55, 40],
          fill: false,
          borderColor: '#4bc0c0'
        },
        {
          label: 'Vendedor 2',
          data: [28, 48, 40, 19, 86, 27, 90],
          fill: false,
          borderColor: '#565656'
        }
      ]
    }
    this.data1 = {
      labels: ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio'],
      datasets: [
        {
          label: 'Sucursal 1',
          backgroundColor: '#0c5094',
          borderColor: '#0c5094',
          data: [65, 59, 80, 81, 56, 55, 40]
        },
        {
          label: 'Sucursal 2',
          backgroundColor: '#3b7505',
          borderColor: '#3b7505',
          data: [28, 48, 40, 19, 86, 27, 90]
        },
        {
          label: 'Sucursal 3',
          backgroundColor: '#ff0015',
          borderColor: '#ff0015',
          data: [28, 48, 40, 19, 86, 27, 90]
        }
      ]
    }
    this.data3 = {
      labels: ['Producto 1','Producto 2','Producto 3'],
      datasets: [
          {
              data: [300, 50, 100],
              backgroundColor: [
                  "#0c5094",
                  "#3b7505",
                  "#ff0015"
              ],
              hoverBackgroundColor: [
                "#0c5094",
                "#3b7505",
                "#ff0015"
              ]
          }]    
      };
    this.options = {
      title: {
        display: true,
        text: 'Ventas Mensuales',
        fontSize: 16
      },
      legend: {
        position: 'bottom'
      }
    }
    this.options1 = {
      title: {
        display: true,
        text: 'Ventas por Sucursal',
        fontSize: 16
      },
      legend: {
        position: 'bottom'
      }
    }
    this.options3 = {
      title: {
        display: true,
        text: 'Ventas por Producto',
        fontSize: 16
      },
      legend: {
        position: 'bottom'
      }
    }

    setTimeout(() => {
      this.show = true;  
    }, 2000);
  }

}
