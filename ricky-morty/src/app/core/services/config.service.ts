import { Injectable } from '@angular/core';
import { Configuration } from '../models/config.model';

@Injectable({ providedIn: 'root' })
export class ConfigService {
  private config: Configuration = new Configuration();

  setConfig<T extends Configuration[keyof Configuration]>(
    key: keyof Configuration,
    value: T,
  ): void {
    this.config[key] = value;
  }

  getConfig<T = any>(key: keyof Configuration): T {
    return this.config[key] as T;
  }

  getAllConfig(): Configuration {
    return this.config;
  }
}
