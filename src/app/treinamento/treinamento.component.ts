import { Component, OnInit } from '@angular/core';

export interface PeriodicElement {
  data: string;
  name: string;
  position: number;
  weight: number;
  symbol: string;
}

const ELEMENT_DATA: PeriodicElement[] = [
  {data:'20/04/2020',position: 1, name: 'Hydrogen', weight: 1.0079, symbol: 'H'},
  {data:'20/04/2020',position: 2, name: 'Helium', weight: 4.0026, symbol: 'He'},
  {data:'20/04/2020',position: 3, name: 'Lithium', weight: 6.941, symbol: 'Li'},
  {data:'20/04/2020',position: 4, name: 'Beryllium', weight: 9.0122, symbol: 'Be'},
  {data:'20/04/2020',position: 5, name: 'Boron', weight: 10.811, symbol: 'B'},
  {data:'20/04/2020',position: 6, name: 'Carbon', weight: 12.0107, symbol: 'C'},
  {data:'20/04/2020',position: 7, name: 'Nitrogen', weight: 14.0067, symbol: 'N'},
  {data:'20/04/2020',position: 8, name: 'Oxygen', weight: 15.9994, symbol: 'O'},
  {data:'20/04/2020',position: 9, name: 'Fluorine', weight: 18.9984, symbol: 'F'},
  {data:'20/04/2020',position: 10, name: 'Neon', weight: 20.1797, symbol: 'Ne'},
];

@Component({
  selector: 'app-treinamento',
  templateUrl: './treinamento.component.html',
  styleUrls: ['./treinamento.component.css']
})
export class TreinamentoComponent implements OnInit {

  displayedColumns: string[] = ['data','position', 'name', 'weight', 'symbol'];
  dataSource = ELEMENT_DATA;

  constructor() { }

  ngOnInit(): void {
  }

}
