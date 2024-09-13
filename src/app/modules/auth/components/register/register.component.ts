import { Component } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../../core/services/auth.service';
import { PostUser } from '../../../core/models/user.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss',
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
  ) {}

  get controls() {
    return this.registerForm.controls;
  }
  getErrorMessage(control: FormControl) {
    if (control.hasError('required')) {
      return 'Ta wartość musi być podana.';
    }

    if (control.hasError('minlength')) {
      return 'Za mało znaków.';
    }
    if (control.hasError('maxlength')) {
      return 'Za dużo znaków.';
    }

    return control.hasError('email') ? 'Błędny adres email.' : '';
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
