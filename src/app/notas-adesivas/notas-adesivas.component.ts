import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { LocalStorageService } from '../services/local-storage.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

interface NotaAdesiva {
  cor?: string;
  x: number;
  y: number;
  title: FormControl;
  priority?: string;
  note: string;
}


@Component({
  selector: 'app-notas-adesivas',
  templateUrl: './notas-adesivas.component.html',
  styleUrls: ['./notas-adesivas.component.css', './notas-adesivas.component.scss']
})
export class NotasAdesivasComponent implements OnInit {
  @Input()
  form!: FormGroup;
  // notas = [
  //   { cor: '#ffcc00', x: 0, y: 0, textoControl: new FormControl('Nota 1') },
  //   { cor: '#00ccff', x: 0, y: 0, textoControl: new FormControl('Nota 2') },
  //   { cor: '#cc00ff', x: 0, y: 0, textoControl: new FormControl('Nota 3') }
  // ];
  notasAdesivas: NotaAdesiva[] = [];
  selectedPriority: any;
  priorities = [{ priority: 'Alta', color: '#FF0000', cor: 'red' }, { priority: 'Média', color: '#FFA500', cor: 'orange' }, { priority: 'Baixa', color: '#FFFF00', cor: 'yellow' }];



  constructor(
    private modalService: NgbModal,
    private formBuilder: FormBuilder
  ) {

    this.form = this.formBuilder.group({
      title: new FormControl('', [Validators.required]),
      note: new FormControl('', [Validators.required]),
      priority: new FormControl('', [Validators.required]),
      x: 0,
      y: 0

    });

  }

  ngOnInit(): void {


  }

  openVerticallyCentered(content: any) {
    this.modalService.open(content, { centered: true });
  }


  adicionarNotaAdesiva() {
    console.log(this.form.value)
    const novaNota: NotaAdesiva = {
      // cor: this.form.get('priority')?.value,
      cor: this.priorities.find(p => p['priority'] === this.form.controls['priority'].value)?.['cor'],
      x: 0, // inicialize a propriedade x
      y: 0, // inicialize a propriedade y
      // textoControl: new FormControl(''),
      title: new FormControl(this.form.get('title')?.value),
      priority: this.form.get('priority')?.value,
      note: this.form.get('note')?.value

    };
    this.notasAdesivas.push(novaNota);
    this.form.reset();
    console.log(this.notasAdesivas)

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



