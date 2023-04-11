import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-painel-controle',
  templateUrl: './painel-controle.component.html',
  styleUrls: ['./painel-controle.component.scss']
})
export class PainelControleComponent implements OnInit {

  contatos: boolean = false;
  central: boolean = false;
  calendar: boolean = false;
  notes: boolean = false;
  senha: boolean = false;
  timesheet: boolean = false;
  treinamento: boolean = false;

  

  constructor(private modalService : NgbModal) { }

  ngOnInit(): void {
  }

  openVerticallyCentered(content : any) {
    this.modalService.open(content, { centered: true });
  }



}
