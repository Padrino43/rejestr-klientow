import { NgModule } from '@angular/core';
import { HeaderComponent } from './components/header/header.component';
import { RouterModule } from '@angular/router';
import { SharedModule } from '../shared/shared.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {
  HttpClientModule,
  provideHttpClient,
  withInterceptors,
} from '@angular/common/http';
import { SpinnerComponent } from './components/spinner/spinner.component';
import { spinnerInterceptor } from './interceptors/spinner.interceptor';

@NgModule({
  declarations: [HeaderComponent, SpinnerComponent],
  imports: [
    SharedModule,
    RouterModule,
    BrowserAnimationsModule,
    HttpClientModule,
  ],
  providers: [provideHttpClient(withInterceptors([spinnerInterceptor]))],
  exports: [HeaderComponent, SpinnerComponent],
})
export class CoreModule {}
