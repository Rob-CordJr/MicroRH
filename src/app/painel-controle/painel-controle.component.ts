import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-painel-controle',
  templateUrl: './painel-controle.component.html',
  styleUrls: ['./painel-controle.component.css']
})
export class PainelControleComponent implements OnInit {

  contact: boolean = false;
  calendar: boolean = false;
  notes: boolean = false;

  constructor() { }

  ngOnInit(): void {
  }

}
