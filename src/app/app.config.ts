import { ApplicationConfig } from '@angular/core';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { providePrimeNG } from 'primeng/config';
import { PrimeNGConfig } from 'primeng/api';

export const appConfig: ApplicationConfig = {
    providers: [
        provideAnimationsAsync(),
        providePrimeNG({
            ripple: true,
            theme: 'aura-light-blue', 
            options: {
                darkModeSelector: '.my-app-dark'
            }
        }),
    ]
};
