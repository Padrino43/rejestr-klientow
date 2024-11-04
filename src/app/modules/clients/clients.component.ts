import { Component } from '@angular/core';
import { ClientsTableComponent } from './components/clients-table/clients-table.component';

@Component({
    selector: 'app-clients',
    templateUrl: './clients.component.html',
    styleUrl: './clients.component.scss',
    standalone: true,
    imports: [ClientsTableComponent]
})
export class ClientsComponent {

}
