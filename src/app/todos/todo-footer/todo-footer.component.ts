import { Component, OnInit } from '@angular/core';
import { AppState } from '../app.reducer';
import { Store } from '@ngrx/store';
import { filtrosValidos, setFiltro } from '../../filtro/filtro.actions';
import { NgFor, TitleCasePipe } from '@angular/common';
import { clearCompleted } from '../todo.actions';

@Component({
  selector: 'app-todo-footer',
  standalone: true,
  imports: [NgFor, TitleCasePipe],
  templateUrl: './todo-footer.component.html',
  styleUrl: './todo-footer.component.scss'
})
export class TodoFooterComponent implements OnInit{

  filtroActual: filtrosValidos = 'all';
  filtros: filtrosValidos[] = ['all', 'completados', 'pendientes'];
  pendientes: number = 0;

  constructor(private store: Store<AppState>) {

  }

  ngOnInit(): void {
    this.store.subscribe(state => {
      this.filtroActual = state.filtro;
      this.pendientes = state.todos.filter(todo => !todo.completado).length;
    })
  }

  cambiarFiltro(filtro: filtrosValidos) {
    this.store.dispatch(setFiltro({filtro}));
  }

  borrarCompletados() {
    this.store.dispatch(clearCompleted());
  }

}
