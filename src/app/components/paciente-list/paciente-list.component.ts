import { Component, computed, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Paciente, NivelTriaje } from '../../models/paciente.model';
import { PACIENTES_MOCK } from '../../data/pacientes-mock';
import { PacienteCardComponent } from '../paciente-card/paciente-card.component';

@Component({
  selector: 'app-paciente-list',
  standalone: true,
  imports: [CommonModule, FormsModule, PacienteCardComponent],
  templateUrl: './paciente-list.component.html',
  styleUrls: ['./paciente-list.component.scss']
})
export class PacienteListComponent {
  readonly pacientes = signal<Paciente[]>(PACIENTES_MOCK);
  readonly busqueda = signal<string>('');
  readonly filtroEstado = signal<'TODOS' | 'ACTIVOS' | 'INACTIVOS'>('TODOS');
  readonly filtroTriaje = signal<string>('TODOS');

  // Metricas derivadas computadas
  readonly totalPacientes = computed(() => this.pacientes().length);
  readonly totalActivos = computed(() => this.pacientes().filter(p => p.activo).length);
  readonly totalInactivos = computed(() => this.pacientes().filter(p => !p.activo).length);
  readonly totalCriticos = computed(() => this.pacientes().filter(p => p.triaje === 'Critico').length);

  // Lista filtrada en tiempo real
  readonly pacientesFiltrados = computed(() => {
    const texto = this.busqueda().trim().toLowerCase();
    const estado = this.filtroEstado();
    const triaje = this.filtroTriaje();

    return this.pacientes().filter(p => {
      const coincideTexto = !texto ||
        p.nombre.toLowerCase().includes(texto) ||
        p.dni.includes(texto) ||
        p.diagnostico.toLowerCase().includes(texto);

      const coincideEstado =
        estado === 'TODOS' ||
        (estado === 'ACTIVOS' && p.activo) ||
        (estado === 'INACTIVOS' && !p.activo);

      const coincideTriaje =
        triaje === 'TODOS' || p.triaje === triaje;

      return coincideTexto && coincideEstado && coincideTriaje;
    });
  });

  // Campos para nuevo registro rapido
  nuevoNombre = '';
  nuevoDni = '';
  nuevoEdad: number | null = null;
  nuevoDiagnostico = '';
  nuevoTriaje: NivelTriaje = 'Bajo';
  mensajeError = '';
  formularioVisible = false;

  actualizarEstado(evento: { id?: number; activo: boolean }): void {
    if (!evento.id) return;
    this.pacientes.update(lista =>
      lista.map(p => p.id === evento.id ? { ...p, activo: evento.activo } : p)
    );
  }

  toggleFormulario(): void {
    this.formularioVisible = !this.formularioVisible;
    this.mensajeError = '';
  }

  registrarPaciente(): void {
    const nom = this.nuevoNombre.trim();
    const dni = this.nuevoDni.trim();
    const diag = this.nuevoDiagnostico.trim();

    if (!nom || !dni || !diag || this.nuevoEdad === null) {
      this.mensajeError = 'Por favor complete todos los campos obligatorios.';
      return;
    }

    if (dni.length !== 8 || isNaN(Number(dni))) {
      this.mensajeError = 'El DNI debe contener exactamente 8 digitos numericos.';
      return;
    }

    if (this.nuevoEdad <= 0 || this.nuevoEdad > 120) {
      this.mensajeError = 'Ingrese una edad valida (entre 1 y 120 anos).';
      return;
    }

    const nuevo: Paciente = {
      id: Math.max(0, ...this.pacientes().map(p => p.id)) + 1,
      nombre: nom,
      dni: dni,
      edad: this.nuevoEdad,
      diagnostico: diag,
      triaje: this.nuevoTriaje,
      activo: true,
      fechaIngreso: new Date().toISOString().split('T')[0],
      telefono: '+51 900 000 000',
      alergias: []
    };

    this.pacientes.update(lista => [nuevo, ...lista]);

    // Limpiar formulario
    this.nuevoNombre = '';
    this.nuevoDni = '';
    this.nuevoEdad = null;
    this.nuevoDiagnostico = '';
    this.nuevoTriaje = 'Bajo';
    this.mensajeError = '';
    this.formularioVisible = false;
  }
}
