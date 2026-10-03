import { Component, input, output, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Paciente } from '../../models/paciente.model';

@Component({
  selector: 'app-paciente-card',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './paciente-card.component.html',
  styleUrls: ['./paciente-card.component.scss']
})
export class PacienteCardComponent implements OnInit {
  // Contrato base exigido por la guia de laboratorio UPN SIST1402A
  nombre = 'Ana Pérez';
  activo = true;

  // Propiedades complementarias de soporte clinico
  edad = 29;
  dni = '72481092';
  diagnostico = 'Control de rutina y medicina preventiva';
  triaje: 'Bajo' | 'Medio' | 'Critico' = 'Bajo';
  fechaIngreso = '2026-03-28';
  telefono = '+51 987 654 321';
  alergias: string[] = ['Penicilina'];

  // Input reactivo opcional para enlace con listas dinamicas
  readonly paciente = input<Paciente>();

  // Evento emitido al alternar estado activo
  readonly estadoCambiado = output<{ id?: number; activo: boolean }>();

  ngOnInit(): void {
    const p = this.paciente();
    if (p) {
      this.nombre = p.nombre;
      this.activo = p.activo;
      this.edad = p.edad;
      this.dni = p.dni;
      this.diagnostico = p.diagnostico;
      this.triaje = p.triaje;
      this.fechaIngreso = p.fechaIngreso;
      this.telefono = p.telefono;
      this.alergias = p.alergias ?? [];
    }
  }

  toggleActivo(): void {
    this.activo = !this.activo;
    const p = this.paciente();
    this.estadoCambiado.emit({
      id: p?.id,
      activo: this.activo
    });
  }
}
