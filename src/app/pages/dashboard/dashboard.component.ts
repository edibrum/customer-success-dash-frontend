import { Component, signal, computed } from '@angular/core';
import { CommonModule, formatDate } from '@angular/common';
import { SidebarComponent } from '../../components/sidebar/sidebar.component';
import { InfoCardComponent } from '../../shared/components/info-card/infoCard.component';
import { PaginatedTableComponent } from '../../shared/components/paginated-table/paginated-table.component';
// import { ClientesService } from '../../services/clientes.service';
import { ContasService } from '../../services/contas.service';
import { ClienteDtoResponse } from '../../models/cliente';
import { ContaDtoResponse } from '../../models/contas';
import { PageResponse } from '../../shared/utils/pagination';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, SidebarComponent, InfoCardComponent, PaginatedTableComponent],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})

export class DashboardComponent {
  totalContasDoGerente = signal<number>(0);
  sidebarOpen = signal<boolean>(true);
  contas = signal<ContaDtoResponse[]>([]);
  showContasTable = signal<boolean>(false);
  page = signal<number>(0);
  pageSize = 10;
  displayedContas = computed<ContaDtoResponse[]>(() => {
    const all = this.contas();
    const start = this.page() * this.pageSize;
    return all.slice(start, start + this.pageSize);
  });
  
  totalPages = computed<number>(() => Math.max(1, Math.ceil(this.contas().length / this.pageSize)));
  
  contasColumns = [
    { header: 'Titular', field: 'titular.pessoa.nome' },
    { header: 'PF/PJ', field: 'titular.pessoa.tipoPessoa', cellClass: (row: any) => {
      const tipo = row?.titular?.pessoa?.tipoPessoa;
      return tipo === 'PJ' ? 'cell-pj' : 'cell-pf';
    }},
    { header: 'Conta', field: 'tipo' },
    { header: 'Número', field: 'numero' },
    { header: 'Dígito', field: 'digito' },
    { header: 'Data Abertura', field: 'dataCriacao', format: 'date', locale: 'pt-BR', digitsInfo: 'dd/MM/yyyy' },
    // OUTROS DADOS: considerados "irrelevantes" inicialmente:
    // { header: 'Saldo', field: 'saldo', format: 'currency', currencyCode: 'BRL', locale: 'pt-BR', digitsInfo: '1.2-2' },
    // { header: 'Banco', field: 'banco' },
    // { header: 'Agência', field: 'agencia' },
    // { header: 'Gerente', field: 'gerente.pessoa.nome' }
  ];

  constructor(private contasService: ContasService) {
    this.contasService.getContasPorGerenteId(1).subscribe({
      next: (page: PageResponse<ContaDtoResponse>) => {
        this.totalContasDoGerente.set(page?.totalElements ?? 0);
        this.contas.set(page?.content ?? []);
        console.log('totalElements', page?.totalElements);
        console.log('contas-length', this.contas().length);
        console.log('contas', this.contas());
      },
      error: () => this.totalContasDoGerente.set(0)
    });
  }

  toggleSidebar() {
    this.sidebarOpen.set(!this.sidebarOpen());
  }

  notifyClick() {
    console.log('Notifications click');
  }

  onWalletCardAction() {
    console.log('Wallet card action');
    this.showContasTable.set(!this.showContasTable());
  }
  onConversionCardAction() {
    console.log('Conversion card action');
  }
  onGapCardAction() {
    console.log('Gap card action');
  }
  onTasksCardAction() {
    console.log('Tasks card action');
  }
  closeContasTable() {
    this.showContasTable.set(false);
    this.page.set(0);
  }
  nextPage() {
    const p = this.page();
    const tp = this.totalPages();
    if (p < tp - 1) this.page.set(p + 1);
  }
  prevPage() {
    const p = this.page();
    if (p > 0) this.page.set(p - 1);
  }
}
