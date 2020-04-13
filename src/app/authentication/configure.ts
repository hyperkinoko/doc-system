import {InjectionToken} from '@angular/core';

export interface AuthConfig {
  endpointName: string;
  clientId: string;
  redirectUri: string;
}

export const AUTH_CONFIG = new InjectionToken<AuthConfig>('AuthConfig');

