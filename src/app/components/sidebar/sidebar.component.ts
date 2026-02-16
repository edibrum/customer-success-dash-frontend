import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.css'
})
export class SidebarComponent {
  @Input() gerenteNome: string = '';
  @Input() gerenteAvatar: string = '';
  @Input() activePage: string = '';


  isActive(page: string): boolean {
    return this.activePage === page;
  }
}
