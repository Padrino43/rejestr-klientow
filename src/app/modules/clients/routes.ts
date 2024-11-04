import { Routes } from '@angular/router';
import { ClientsComponent } from './clients.component';
import { ClientComponent } from './components/client/client.component';
import { ClientFormComponent } from './components/client-form/client-form.component';
import { clientFormDeactivateGuard } from '../core/guards/client-form-deactivate.guard';

export const ROUTES_CLIENTS: Routes = [
  {
    path: '',
    component: ClientsComponent,
  },
  {
    path: 'dodaj',
    component: ClientFormComponent,
    canDeactivate: [clientFormDeactivateGuard],
  },
  { path: ':id', component: ClientComponent },
];
