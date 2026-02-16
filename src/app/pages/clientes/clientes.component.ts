import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PaginatedTableComponent, TableColumn } from '../../shared/components/paginated-table/paginated-table.component';
import { SidebarComponent } from '../../components/sidebar/sidebar.component';
import { ContasService } from '../../services/contas.service';
import { ContaDtoResponse } from '../../models/contas';
import { PageResponse } from '../../shared/utils/pagination';
import { GerenteStore } from '../../services/gerente-store.service';

@Component({
  selector: 'app-clientes',
  standalone: true,
  imports: [CommonModule, PaginatedTableComponent, SidebarComponent],
  templateUrl: './clientes.component.html',
  styleUrl: './clientes.component.css'
})
export class ClientesComponent {
  sidebarOpen = signal<boolean>(true);
  constructor(private contasService: ContasService, public gerenteStore: GerenteStore) {
    this.contasService.getContasPorGerenteId(1).subscribe({
      next: (page: PageResponse<ContaDtoResponse>) => {
        this.contas.set(page?.content ?? []);
      },
      error: () => this.contas.set([])
    });
  }

  contas = signal<ContaDtoResponse[]>([]);
  pageSize = 10;

  contasColumns: TableColumn[] = [
    { header: 'Titular', field: 'titular.pessoa.nome' },
    { header: 'PF/PJ', field: 'titular.pessoa.tipoPessoa', cellClass: (row: any) => {
      const tipo = row?.titular?.pessoa?.tipoPessoa;
      return tipo === 'PJ' ? 'cell-pj' : 'cell-pf';
    }},
    { header: 'Conta', field: 'tipo' },
    { header: 'Número', field: 'numero' },
    { header: 'Dígito', field: 'digito' },
    { header: 'Data Abertura', field: 'dataCriacao', format: 'date', locale: 'pt-BR', digitsInfo: 'dd/MM/yyyy' }
  ];

}
