import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PacienteCardComponent } from './paciente-card.component';
import { Paciente } from '../../models/paciente.model';

describe('PacienteCardComponent', () => {
  let component: PacienteCardComponent;
  let fixture: ComponentFixture<PacienteCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PacienteCardComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(PacienteCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('debe crearse correctamente', () => {
    expect(component).toBeTruthy();
  });

  it('debe cumplir con el contrato base exigido por la guia: Ana Perez y activo true', () => {
    expect(component.nombre).toBe('Ana Pérez');
    expect(component.activo).toBe(true);
  });

  it('debe renderizar el nombre e interpolacion en la plantilla HTML', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('h3')?.textContent).toContain('Ana Pérez');
    expect(compiled.textContent).toContain('DNI: 72481092');
  });

  it('debe alternar el estado activo mediante event binding al pulsar el boton', () => {
    let eventoEmitido: { id?: number; activo: boolean } | undefined;
    component.estadoCambiado.subscribe(ev => eventoEmitido = ev);

    expect(component.activo).toBe(true);

    const boton = fixture.nativeElement.querySelector('button') as HTMLButtonElement;
    boton.click();
    fixture.detectChanges();

    expect(component.activo).toBe(false);
    expect(eventoEmitido?.activo).toBe(false);

    boton.click();
    fixture.detectChanges();

    expect(component.activo).toBe(true);
    expect(eventoEmitido?.activo).toBe(true);
  });

  it('debe cargar los datos del input reactivo cuando se proporciona un paciente', () => {
    const testPaciente: Paciente = {
      id: 99,
      nombre: 'Mario Vargas',
      edad: 50,
      dni: '12345678',
      diagnostico: 'Hipertension leve',
      activo: false,
      triaje: 'Medio',
      fechaIngreso: '2026-03-29',
      telefono: '+51 900 111 222',
      alergias: ['Ibuprofeno']
    };

    fixture.componentRef.setInput('paciente', testPaciente);
    fixture.detectChanges();

    expect(component.nombre).toBe('Mario Vargas');
    expect(component.activo).toBe(false);
    expect(component.triaje).toBe('Medio');
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('h3')?.textContent).toContain('Mario Vargas');
    expect(compiled.textContent).toContain('Ibuprofeno');
  });
});
