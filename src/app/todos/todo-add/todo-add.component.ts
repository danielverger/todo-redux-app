import { Component, OnInit } from '@angular/core';
import { FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { AppState } from '../app.reducer';
import { Store } from '@ngrx/store';
import { crear } from '../todo.actions';

@Component({
  selector: 'app-todo-add',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './todo-add.component.html',
  styleUrl: './todo-add.component.scss'
})
export class TodoAddComponent implements OnInit {

  txtInput: FormControl;

  constructor(private store: Store<AppState>) {
    this.txtInput = new FormControl('', Validators.required);
  }

  ngOnInit(): void {
    throw new Error('Method not implemented.');
  }

agregar() {
  if (this.txtInput.invalid) {
    return;
  }

  this.store.dispatch(crear({texto: this.txtInput.value}));
  this.txtInput.reset();
}

}
