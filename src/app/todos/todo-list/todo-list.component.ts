import { Component, OnInit } from '@angular/core';
import { TodoItemComponent } from '../todo-item/todo-item.component';
import { Todo } from '../models/todo.model';
import { AppState } from '../app.reducer';
import { Store } from '@ngrx/store';
import { BrowserModule } from '@angular/platform-browser';
import { NgFor } from '@angular/common';
import { FiltroPipe } from '../filtro.pipe';
import { filtrosValidos } from '../../filtro/filtro.actions';

@Component({
  selector: 'app-todo-list',
  standalone: true,
  imports: [TodoItemComponent, NgFor, FiltroPipe],
  templateUrl: './todo-list.component.html',
  styleUrl: './todo-list.component.scss'
})
export class TodoListComponent implements OnInit {

  todos: Todo[] = [];
  filtroActual!: filtrosValidos;
  constructor(private store: Store<AppState>) {

  }
  
  ngOnInit(): void {
    this.store.select('todos').subscribe((todos => this.todos = todos));
    this.store.select('filtro').subscribe((filtro => this.filtroActual = filtro));
  }

}
