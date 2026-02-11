import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SidebarComponent } from '../../components/sidebar/sidebar.component';
import { InfoCardComponent } from '../../shared/components/info-card/infoCard.component';
import { ClientesService } from '../../services/clientes.service';
import { ClienteDtoResponse } from '../../models/cliente';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, SidebarComponent, InfoCardComponent],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent {
  totalClientes = signal<number>(0);
  sidebarOpen = signal<boolean>(true);

  constructor(private clientesService: ClientesService) {
    this.clientesService.getClientes().subscribe({
      next: (list: ClienteDtoResponse[]) => this.totalClientes.set(list?.length ?? 0),
      error: () => this.totalClientes.set(0)
    });
  }

  toggleSidebar() {
    this.sidebarOpen.set(!this.sidebarOpen());
  }
}
