import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { LocalStorageService } from '../services/local-storage.service';

interface NotaAdesiva {
  cor: string;
  x: number;
  y: number;
  textoControl: FormControl;
}


@Component({
  selector: 'app-notas-adesivas',
  templateUrl: './notas-adesivas.component.html',
  styleUrls: ['./notas-adesivas.component.css']
})
export class NotasAdesivasComponent implements OnInit {
  @Input()
  notas = [
    { cor: '#ffcc00',x: 0, y: 0, textoControl: new FormControl('Nota 1') },
    { cor: '#00ccff',x: 0, y: 0 ,textoControl: new FormControl('Nota 2') },
    { cor: '#cc00ff',x: 0, y: 0 ,textoControl: new FormControl('Nota 3') }
  ];
  notasAdesivas: NotaAdesiva[] = [];

  constructor(

  ) {

  }

  ngOnInit(): void {


  }

  adicionarNotaAdesiva() {
    const novaNota: NotaAdesiva = {
      cor: 'yellow',
      x: 0, // inicialize a propriedade x
      y: 0, // inicialize a propriedade y
      textoControl: new FormControl(''),
    };
    this.notasAdesivas.push(novaNota);
  }

  excluirNotaAdesiva(index: number) {
    this.notasAdesivas.splice(index, 1);
    this.salvarNotasAdesivas();
  }

  salvarNotasAdesivas() {
    localStorage.setItem('notasAdesivas', JSON.stringify(this.notasAdesivas));
  }
  
  iniciarArrasto(evento: MouseEvent, index: number) {
    const notaAdesiva = this.notasAdesivas[index];
    const posicaoInicial = {
      x: evento.clientX,
      y: evento.clientY
    };
    const posicaoAtual = {
      x: notaAdesiva.x,
      y: notaAdesiva.y
    };
  
    const moverNotaAdesiva = (e: MouseEvent) => {
      notaAdesiva.x = posicaoAtual.x + (e.clientX - posicaoInicial.x);
      notaAdesiva.y = posicaoAtual.y + (e.clientY - posicaoInicial.y);
    };
  
    const pararArrasto = () => {
      document.removeEventListener('mousemove', moverNotaAdesiva);
      this.salvarNotasAdesivas();
    };
  
    document.addEventListener('mousemove', moverNotaAdesiva);
    document.addEventListener('mouseup', pararArrasto);
  }
  


















}



