import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Note } from '../models/Note';
import { LocalStorageService } from '../services/local-storage.service';

const todoListStorageKey = 'Todo_List';


@Component({
  selector: 'app-notas-adesivas',
  templateUrl: './notas-adesivas.component.html',
  styleUrls: ['./notas-adesivas.component.css']
})
export class NotasAdesivasComponent implements OnInit {
  
  note = new Note();
  notesList: Note[] = [];
  selectedNote = null;
  isNewNote: boolean = true;
  lastId: number = 0;
  showSidebar: boolean = true;
  selectedPrioridade = null;
  public noteColorList: string[] = ['#DC3545', '#FFC107', '#198754 ', '#212529']
  prioridade: any = ['Alta', 'Baixa', 'Media', 'Critica']
  defaultTodoList = [
    { title_note: 'install NodeJS', description_note: 'teste 1', id_usuario: 1, id_note: 1, sector: 'COPLAN', prioridade: 'Baixa' },
    { title_note: 'install Angular CLI', description_note: 'teste 2', id_usuario: 1, id_note: 2, sector: 'COPLAN', prioridade: 'Baixa' },
    { title_note: 'create new app', description_note: 'teste 3', id_usuario: 1, id_note: 3, sector: 'COPLAN', prioridade: 'Baixa' },

  ];
  notesForm: FormGroup | any;
  editData: any;


  constructor(
    private el: ElementRef,
    private fb: FormBuilder
  ) {

  }

  ngOnInit(): void {
    this.notesForm = this.createForm();
  }

  private createForm(): FormGroup {
    return this.fb.group({
      id_note: [''],
      title_note: ['', [Validators.required]],
      description_note: ['', [Validators.required]],
      noteColor: [null, [Validators.required]]
    });
  }



  showSearch() {
    let myTag = this.el.nativeElement.querySelectorAll(".container");
    this.showSidebar = !this.showSidebar;
    this.showSidebar ? myTag[0].classList.add('active') : myTag[0].classList.remove('active');
  }

  addNote(){}

  saveNote(){
    if(!this.notesForm.controls.id_note.value){
      this.notesForm.controls.id_note.setValue(this.notesList.length + 1);
      this.notesList.push(this.notesForm.value);
    } else {
      const noteIndex: number = this.notesList.indexOf(this.editData);
      this.notesList[noteIndex] = this.notesForm.value;
      this.editData = null;
    }
    this.notesForm.reset();
  }

  editNote(editNoteData: Note): void {
    this.editData = editNoteData;
    this.notesForm.setValue({
      id_note: editNoteData.id_note,
      title_note: editNoteData.title_note,
      description_note: editNoteData.description_note,
      noteColor: editNoteData.noteColor
    });
  }

  deleteNote(deleteNoteId: any): void {
    this.notesList.filter((item, index) => {
      if(item.id_note === deleteNoteId) {
        this.notesList.splice(index, 1);
      }
    });
  }


}



