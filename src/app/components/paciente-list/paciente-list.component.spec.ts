import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PacienteListComponent } from './paciente-list.component';
import { PACIENTES_MOCK } from '../../data/pacientes-mock';

describe('PacienteListComponent (Lab 01)', () => {
  let fixture: ComponentFixture<PacienteListComponent>;
  let component: PacienteListComponent;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PacienteListComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(PacienteListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('debe crearse correctamente e inicializar con pacientes mock', () => {
    expect(component).toBeTruthy();
    expect(component.pacientes().length).toBe(PACIENTES_MOCK.length);
  });

  it('debe calcular correctamente las metricas computadas derivadas', () => {
    const total = PACIENTES_MOCK.length;
    const activos = PACIENTES_MOCK.filter(p => p.activo).length;
    const inactivos = PACIENTES_MOCK.filter(p => !p.activo).length;
    const criticos = PACIENTES_MOCK.filter(p => p.triaje === 'Critico').length;

    expect(component.totalPacientes()).toBe(total);
    expect(component.totalActivos()).toBe(activos);
    expect(component.totalInactivos()).toBe(inactivos);
    expect(component.totalCriticos()).toBe(criticos);
  });

  it('debe filtrar la lista de pacientes segun el termino de busqueda', () => {
    component.busqueda.set('Carlos');
    fixture.detectChanges();

    const filtrados = component.pacientesFiltrados();
    expect(filtrados.every(p => p.nombre.includes('Carlos'))).toBe(true);
  });

  it('debe filtrar pacientes por estado activo e inactivo', () => {
    component.filtroEstado.set('ACTIVOS');
    fixture.detectChanges();
    expect(component.pacientesFiltrados().every(p => p.activo)).toBe(true);

    component.filtroEstado.set('INACTIVOS');
    fixture.detectChanges();
    expect(component.pacientesFiltrados().every(p => !p.activo)).toBe(true);
  });

  it('debe filtrar pacientes segun el nivel de triaje', () => {
    component.filtroTriaje.set('Critico');
    fixture.detectChanges();

    const filtrados = component.pacientesFiltrados();
    expect(filtrados.length).toBeGreaterThan(0);
    expect(filtrados.every(p => p.triaje === 'Critico')).toBe(true);
  });

  it('debe validar errores en el formulario de registro de paciente', () => {
    component.nuevoNombre = '';
    component.registrarPaciente();
    expect(component.mensajeError).toContain('campos obligatorios');

    component.nuevoNombre = 'Juan Perez';
    component.nuevoDni = '123'; // DNI invalido
    component.nuevoEdad = 30;
    component.nuevoDiagnostico = 'Gripe';
    component.registrarPaciente();
    expect(component.mensajeError).toContain('8 digitos numericos');

    component.nuevoDni = '12345678';
    component.nuevoEdad = 150; // Edad fuera de rango
    component.registrarPaciente();
    expect(component.mensajeError).toContain('edad valida');
  });

  it('debe registrar un paciente valido y actualizar las metricas reactivas', () => {
    const totalInicial = component.totalPacientes();

    component.nuevoNombre = 'Estudiante Evaluado';
    component.nuevoDni = '99887766';
    component.nuevoEdad = 25;
    component.nuevoDiagnostico = 'Examen general';
    component.nuevoTriaje = 'Bajo';

    component.registrarPaciente();
    fixture.detectChanges();

    expect(component.totalPacientes()).toBe(totalInicial + 1);
    expect(component.mensajeError).toBe('');
    expect(component.formularioVisible).toBe(false);
  });

  it('debe alternar el estado del paciente al recibir evento de estadoCambiado', () => {
    const primerPaciente = component.pacientes()[0];
    const estadoOriginal = primerPaciente.activo;

    component.actualizarEstado({ id: primerPaciente.id, activo: !estadoOriginal });
    fixture.detectChanges();

    const pacienteActualizado = component.pacientes().find(p => p.id === primerPaciente.id);
    expect(pacienteActualizado?.activo).toBe(!estadoOriginal);
  });
});
