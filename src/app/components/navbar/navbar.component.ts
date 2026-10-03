import { Component } from '@angular/core';

@Component({
  selector: 'app-navbar',
  standalone: true,
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent {
  titulo = 'Portal Clínico Asistencial';
  subtitulo = 'UPN SIST1402A - Semana 07';
}
