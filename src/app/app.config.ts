import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import { provideRouter } from '@angular/router';

import { StoreModule } from '@ngrx/store';
import { provideStore, provideState } from '@ngrx/store';

import { routes } from './app.routes';
import { todoReducer } from './todos/todo.reducer';
import { provideStoreDevtools } from '@ngrx/store-devtools';
import { environment } from '../environments/environment.development';
import { filtroReducer } from './filtro/filtro.reducer';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideStore(),
    provideStoreDevtools({
      maxAge: 25, // Retains last 25 states
      logOnly: environment.production, // Restrict extension to log-only mode
      autoPause: true, // Pauses recording actions and state changes when the extension window is not open
      trace: false, //  If set to true, will include stack trace for every dispatched action, so you can see it in trace tab jumping directly to that part of code
      traceLimit: 75, // maximum stack trace frames to be stored (in case trace option was provided as true)
      connectInZone: true // If set to true, the connection is established within the Angular zone
    }),
    provideState({ name: 'todos', reducer: todoReducer }),
    provideState({ name: 'filtro', reducer: filtroReducer }),
    // importProvidersFrom(StoreModule.forRoot({ count: todoReducer })),
  ]
};
