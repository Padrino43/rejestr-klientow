import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Client, PostClientForm } from '../../../core/models/client.model';
import { FormsService } from '../../../core/services/forms.service';
import { ClientsService } from '../../../core/services/clients.service';
import { Router } from '@angular/router';
import { Observer } from 'rxjs';
import { postcodeValidator } from '../../../shared/validators/postcode.validator';
import { ClientValidators } from '../../../shared/validators/client.validators';
import { AlertComponent } from '../../../shared/components/alert/alert.component';
import { MatButton } from '@angular/material/button';
import { PhoneControlComponent } from '../../../shared/controls/phone-control/phone-control.component';
import { NgIf } from '@angular/common';
import { MatInput } from '@angular/material/input';
import { MatFormField, MatLabel, MatError } from '@angular/material/form-field';

@Component({
    selector: 'app-client-form',
    templateUrl: './client-form.component.html',
    styleUrl: './client-form.component.scss',
    standalone: true,
    imports: [
        ReactiveFormsModule,
        MatFormField,
        MatLabel,
        MatInput,
        NgIf,
        MatError,
        PhoneControlComponent,
        MatButton,
        AlertComponent,
    ],
})
export class ClientFormComponent implements OnInit {
  clientForm!: FormGroup<PostClientForm>;
  errorMessage = '';
  @Input() editMode = false;
  @Input() client!: Client;
  @Output() closeDialog = new EventEmitter<void>();
  observer: Observer<unknown> = {
    next: () => {
      if (this.editMode) {
        this.emitCloseDialog();
      }
      this.errorMessage = '';
      this.router.navigate(['/klienci']);
    },
    error: () => {
      this.errorMessage = 'Wystąpił błąd.';
    },
    complete: () => {},
  };

  constructor(
    private formsService: FormsService,
    private clientsService: ClientsService,
    private router: Router,
  ) {}

  get controls() {
    return this.clientForm.controls;
  }
  ngOnInit(): void {
    this.initForm();
  }

  private initForm() {
    this.clientForm = new FormGroup({
      firstname: new FormControl(this.editMode ? this.client.firstname : '', {
        nonNullable: true,
        validators: [Validators.required],
      }),
      surname: new FormControl(this.editMode ? this.client.surname : '', {
        nonNullable: true,
        validators: [Validators.required],
      }),
      email: new FormControl(this.editMode ? this.client.email : '', {
        nonNullable: true,
        validators: [Validators.required, Validators.email],
      }),
      phone: new FormControl(this.editMode ? this.client.phone : '', {
        nonNullable: true,
        validators: [Validators.required],
      }),
      address: new FormControl(this.editMode ? this.client.address : '', {
        nonNullable: true,
        validators: [Validators.required],
      }),
      postcode: new FormControl(this.editMode ? this.client.postcode : '', {
        nonNullable: true,
        validators: [Validators.required, ClientValidators.postcode()],
      }),
    });
  }

  onAddClient() {
    if (this.editMode) {
      this.clientsService
        .putClient(this.clientForm.getRawValue(), this.client.id)
        .subscribe(this.observer);
      return;
    }

    this.clientsService
      .postClient(this.clientForm.getRawValue())
      .subscribe(this.observer);
  }

  getErrorMessage(control: FormControl) {
    return this.formsService.getErrorMessage(control);
  }

  emitCloseDialog() {
    this.closeDialog.emit();
  }
}
