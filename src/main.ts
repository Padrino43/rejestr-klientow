import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/app.component';
import { importProvidersFrom, isDevMode } from '@angular/core';
import { ServiceWorkerModule } from '@angular/service-worker';
import { APP_ROUTES } from './app/app-routes';
import { AuthModule } from './app/modules/auth/auth.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {
  HttpClientModule,
  provideHttpClient,
  withInterceptors,
} from '@angular/common/http';
import { spinnerInterceptor } from './app/modules/core/interceptors/spinner.interceptor';
import {
  PreloadAllModules,
  provideRouter,
  withPreloading,
} from '@angular/router';

bootstrapApplication(AppComponent, {
  providers: [
    importProvidersFrom(
      AuthModule,
      BrowserAnimationsModule,
      HttpClientModule,
      ServiceWorkerModule.register('ngsw-worker.js', {
        enabled: !isDevMode(),
        // Register the ServiceWorker as soon as the application is stable
        // or after 30 seconds (whichever comes first).
        registrationStrategy: 'registerWhenStable:30000',
      }),
    ),
    provideRouter(APP_ROUTES, withPreloading(PreloadAllModules)),
    provideHttpClient(withInterceptors([spinnerInterceptor])),
  ],
}).catch((err) => console.error());
