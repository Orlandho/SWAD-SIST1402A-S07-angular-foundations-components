import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from './components/navbar/navbar.component';
import { PacienteListComponent } from './components/paciente-list/paciente-list.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, NavbarComponent, PacienteListComponent],
  templateUrl: './app.html',
  styleUrls: ['./app.scss']
})
export class App {
  readonly title = signal('SWAD-SIST1402A-S07-angular-foundations-components');
}
