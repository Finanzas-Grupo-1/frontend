import { Injectable } from '@angular/core';

export interface Configuracion {
  moneda: string;
  tipoTasa: 'efectiva' | 'nominal';
  capitalizacion: string;
}

@Injectable({ providedIn: 'root' })
export class ConfigurationService {
  private STORAGE_KEY = 'bono_configuracion';

  guardarConfiguracion(config: Configuracion) {
    localStorage.setItem(this.STORAGE_KEY, JSON.stringify(config));
  }

  getConfiguracion(): Configuracion | null {
    const raw = localStorage.getItem(this.STORAGE_KEY);
    return raw ? JSON.parse(raw) : null;
  }
}
