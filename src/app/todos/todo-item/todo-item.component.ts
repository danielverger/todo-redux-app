import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { Todo } from '../models/todo.model';
import { FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { AppState } from '../app.reducer';
import { Store } from '@ngrx/store';
import { borrar, editar, toggle } from '../todo.actions';

@Component({
  selector: 'app-todo-item',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './todo-item.component.html',
  styleUrl: './todo-item.component.scss'
})
export class TodoItemComponent implements OnInit {
  @Input() todo!: Todo;
  @ViewChild('inputEditing')
  inputEditing!: ElementRef;

  chkCompletado!: FormControl;
  txtInput!: FormControl;

  editando: boolean = false;

  constructor(private store: Store<AppState>) {

  }

  ngOnInit(): void {
    this.chkCompletado = new FormControl(this.todo.completado);
    this.txtInput = new FormControl(this.todo.texto, Validators.required);
    this.chkCompletado.valueChanges.subscribe(_ => {
      this.store.dispatch(toggle({ id: this.todo.id }));
    })
  }

  editar() {
    this.editando = true;
    this.txtInput.setValue(this.todo.texto);
    setTimeout(() => {
      this.inputEditing.nativeElement.select()
    }, 100
    )
  }

  terminarEdicion() {
    this.editando = false;
    if (this.txtInput.invalid) { return; };
    if (this.txtInput.value === this.todo.texto) { return; };

    this.store.dispatch(editar({ id: this.todo.id, texto: this.txtInput.value }));
  }

  eliminar() {
    this.store.dispatch(borrar({ id: this.todo.id}));
  }
}
