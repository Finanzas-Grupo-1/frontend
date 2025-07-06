import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {ConfigurationService} from './configuration.service';

@Component({
  standalone: true,
  selector: 'app-configuration',
  imports: [CommonModule, FormsModule],
  templateUrl: './configuration.component.html',
  styleUrls: ['./configuration.component.css']
})
export class ConfigurationComponent {
  moneda: string = 'PEN';
  tipoTasa: 'efectiva' | 'nominal' = 'efectiva';
  capitalizacion: string = 'anual';

  constructor(private configService: ConfigurationService) {
    const saved = this.configService.getConfiguracion();
    if (saved) {
      this.moneda = saved.moneda;
      this.tipoTasa = saved.tipoTasa;
      this.capitalizacion = saved.capitalizacion;
    }
  }

  guardar() {
    this.configService.guardarConfiguracion({
      moneda: this.moneda,
      tipoTasa: this.tipoTasa,
      capitalizacion: this.tipoTasa === 'nominal' ? this.capitalizacion : ''
    });
    alert('✅ Configuración guardada.');
  }
}
