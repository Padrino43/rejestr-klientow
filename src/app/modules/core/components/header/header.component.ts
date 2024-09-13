import { Component, OnDestroy, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { User } from '../../models/user.model';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})
export class HeaderComponent implements OnInit, OnDestroy {
  user: User | null = null;
  sub!: Subscription;
  constructor(private authService: AuthService) {}
  logout() {
    this.authService.logout();
  }

  ngOnInit(): void {
    this.sub = this.authService.user.subscribe({
      next: (value) => {
        this.user = value;
      },
    });
  }

  ngOnDestroy(): void {
    if (this.sub) {
      this.sub.unsubscribe();
    }
  }
}
