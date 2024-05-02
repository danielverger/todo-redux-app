import { Component, OnInit } from '@angular/core';
import { TodoAddComponent } from '../todo-add/todo-add.component';
import { TodoListComponent } from '../todo-list/todo-list.component';
import { TodoFooterComponent } from '../todo-footer/todo-footer.component';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { AppState } from '../app.reducer';
import { Store } from '@ngrx/store';
import { toggleAll } from '../todo.actions';

@Component({
  selector: 'app-todo-page',
  standalone: true,
  imports: [TodoAddComponent, TodoListComponent, TodoFooterComponent, ReactiveFormsModule],
  templateUrl: './todo-page.component.html',
  styleUrl: './todo-page.component.scss'
})
export class TodoPageComponent implements OnInit {

  chkAllCompletado!: FormControl;

  constructor(private store: Store<AppState>) {}
  
  
  ngOnInit(): void {
    this.chkAllCompletado = new FormControl(false);
    this.chkAllCompletado.valueChanges.subscribe((value) => {
      this.store.dispatch(toggleAll({seleccionar: value}));
    })
  }


}
