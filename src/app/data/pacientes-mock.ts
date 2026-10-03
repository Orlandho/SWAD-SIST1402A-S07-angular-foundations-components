import { Paciente } from '../models/paciente.model';

export const PACIENTES_MOCK: Paciente[] = [
  {
    id: 1,
    nombre: 'Ana Pérez',
    edad: 29,
    dni: '72481092',
    diagnostico: 'Control de rutina y medicina preventiva',
    activo: true,
    triaje: 'Bajo',
    fechaIngreso: '2026-03-28',
    telefono: '+51 987 654 321',
    alergias: ['Penicilina']
  },
  {
    id: 2,
    nombre: 'Carlos Mendoza',
    edad: 45,
    dni: '41982341',
    diagnostico: 'Hipertensión arterial estadio 1',
    activo: true,
    triaje: 'Medio',
    fechaIngreso: '2026-03-29',
    telefono: '+51 912 345 678',
    alergias: ['Sulfas']
  },
  {
    id: 3,
    nombre: 'Lucía Fernández',
    edad: 34,
    dni: '48219034',
    diagnostico: 'Traumatismo agudo de rodilla derecha',
    activo: false,
    triaje: 'Critico',
    fechaIngreso: '2026-03-25',
    telefono: '+51 945 678 123',
    alergias: []
  },
  {
    id: 4,
    nombre: 'Roberto Gómez',
    edad: 61,
    dni: '10984723',
    diagnostico: 'Diabetes mellitus tipo 2 descompensada',
    activo: true,
    triaje: 'Critico',
    fechaIngreso: '2026-03-30',
    telefono: '+51 978 123 456',
    alergias: ['Aspirina', 'Ibuprofeno']
  },
  {
    id: 5,
    nombre: 'Mariana Quispe',
    edad: 22,
    dni: '75412980',
    diagnostico: 'Faringoamigdalitis aguda bacteriana',
    activo: true,
    triaje: 'Bajo',
    fechaIngreso: '2026-03-31',
    telefono: '+51 923 876 541',
    alergias: []
  },
  {
    id: 6,
    nombre: 'Jorge Ramirez',
    edad: 52,
    dni: '09812457',
    diagnostico: 'Evaluación cardiológica post-operatoria',
    activo: false,
    triaje: 'Medio',
    fechaIngreso: '2026-03-20',
    telefono: '+51 934 567 890',
    alergias: ['Látex']
  }
];
