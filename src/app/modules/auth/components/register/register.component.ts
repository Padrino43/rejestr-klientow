import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { AuthService } from '../../../core/services/auth.service';
import { PostUser } from '../../../core/models/user.model';
import { Router } from '@angular/router';
import { FormsService } from '../../../core/services/forms.service';
import { AlertComponent } from '../../../shared/components/alert/alert.component';
import { MatIcon } from '@angular/material/icon';
import { MatIconButton, MatButton } from '@angular/material/button';
import { NgIf } from '@angular/common';
import { MatInput } from '@angular/material/input';
import { MatFormField, MatLabel, MatError, MatSuffix } from '@angular/material/form-field';

@Component({
    selector: 'app-register',
    templateUrl: './register.component.html',
    styleUrl: './register.component.scss',
    standalone: true,
    imports: [
        ReactiveFormsModule,
        MatFormField,
        MatLabel,
        MatInput,
        NgIf,
        MatError,
        MatIconButton,
        MatSuffix,
        MatIcon,
        MatButton,
        AlertComponent,
    ],
})
export class RegisterComponent {
  hide = true;
  registerForm = new FormGroup({
    email: new FormControl('', {
      validators: [
        Validators.email,
        Validators.minLength(5),
        Validators.maxLength(50),
      ],
      nonNullable: true,
    }),
    username: new FormControl('', {
      validators: [Validators.required],
      nonNullable: true,
    }),
    password: new FormControl('', {
      validators: [Validators.required],
      nonNullable: true,
    }),
  });
  errorMessage = '';

  constructor(
    private authService: AuthService,
    private router: Router,
    private formService: FormsService,
  ) {}

  get controls() {
    return this.registerForm.controls;
  }
  getErrorMessage(control: FormControl) {
    return this.formService.getErrorMessage(control);
  }
  onRegister() {
    const userData: PostUser = this.registerForm.getRawValue();
    this.authService.register(userData).subscribe({
      next: () => {
        this.router.navigate(['/logowanie']);
      },
      error: () => {
        this.errorMessage = 'Wystąpił błąd.';
      },
    });
  }
}
