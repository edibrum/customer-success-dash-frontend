import { Component, signal, computed } from '@angular/core';
import { CommonModule, formatDate } from '@angular/common';
import { SidebarComponent } from '../../components/sidebar/sidebar.component';
import { InfoCardComponent } from '../../shared/components/info-card/infoCard.component';
import { PaginatedTableComponent } from '../../shared/components/paginated-table/paginated-table.component';
import { GraphCardComponent } from '../../shared/components/graph-card/graph-card.component';
// import { ClientesService } from '../../services/clientes.service';
import { ContasService } from '../../services/contas.service';
import { ClienteDtoResponse } from '../../models/cliente';
import { ContaDtoResponse } from '../../models/contas';
import { PageResponse } from '../../shared/utils/pagination';
import { ContratosService } from '../../services/contratos.service';
import { ContratoDtoResponse } from '../../models/contratos';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, SidebarComponent, InfoCardComponent, PaginatedTableComponent, GraphCardComponent],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})

export class DashboardComponent {
  sidebarOpen = signal<boolean>(true);
  
  //CARD - CONTAS (CLIENTES) ASSOCIADAS AO GERENTE LOGADO
  totalContasDoGerente = signal<number>(0);
  contas = signal<ContaDtoResponse[]>([]);
  showContasTable = signal<boolean>(false);
  showContratosPIXTable = signal<boolean>(false);
  showContratosCREDITOTable = signal<boolean>(false);
  pageListaContasTotal = signal<number>(0);
  pageSizeListaContasTotal = 10;
  displayedContas = computed<ContaDtoResponse[]>(() => {
    const all = this.contas();
    const start = this.pageListaContasTotal() * this.pageSizeListaContasTotal;
    return all.slice(start, start + this.pageSizeListaContasTotal);
  });
  totalPages = computed<number>(() => Math.max(1, Math.ceil(this.contas().length / this.pageSizeListaContasTotal)));
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
  
  //CARD - CONTRATOS (PRODUTOS) ASSOCIADOS AO GERENTE LOGADO
  totalContratosPIXDoGerente = signal<number>(0);
  contratosPIX = signal<ContratoDtoResponse[]>([]);
  percentualClientesPIX = signal<number>(0);
  totalContratosCREDITODoGerente = signal<number>(0);
  contratosCREDITO = signal<ContratoDtoResponse[]>([]);
  percentualClientesCREDITO = signal<number>(0);
  contratoColumns = [
    { header: 'Titular', field: 'conta.titular.pessoa.nome' },
    { header: 'PF/PJ', field: 'conta.titular.pessoa.tipoPessoa', cellClass: (row: any) => {
      const tipo = row?.conta?.titular?.pessoa?.tipoPessoa;
      return tipo === 'PJ' ? 'cell-pj' : 'cell-pf';
    }},
    { header: 'Conta', field: 'conta.tipo' },
    { header: 'Número', field: 'conta.numero' },
    { header: 'Dígito', field: 'conta.digito' },
    { header: 'Data Abertura', field: 'conta.dataCriacao', format: 'date', locale: 'pt-BR', digitsInfo: 'dd/MM/yyyy' },
    // OUTROS DADOS: considerados "irrelevantes" inicialmente:
    // { header: 'Saldo', field: 'saldo', format: 'currency', currencyCode: 'BRL', locale: 'pt-BR', digitsInfo: '1.2-2' },
    // { header: 'Banco', field: 'banco' },
    // { header: 'Agência', field: 'agencia' },
    // { header: 'Gerente', field: 'gerente.pessoa.nome' }
  ];

  //  ----------- CARREGAR LISTAGENS UTILIZADAS PARA O DASHBOARD DE MANEIRA GERAL ----------- 
  constructor(private contasService: ContasService, private contratosService: ContratosService) {
    //CONTAS - AQUI SABEMOS O TOTAL DE CLIENTS ASSOCIADOS AO GERENTE
    this.contasService.getContasPorGerenteId(1).subscribe({
      next: (page: PageResponse<ContaDtoResponse>) => {
        this.totalContasDoGerente.set(page?.totalElements ?? 0);
        this.contas.set(page?.content ?? []);
        console.log('totalElements', page?.totalElements);
        console.log('contas-length', this.contas().length);
        console.log('contas', this.contas());
        this.updatePercentuais();
      },
      error: () => this.totalContasDoGerente.set(0)
    });

    //CONTRATOS - AQUI SABEMOS OS CONTRATOS PIX DO GERENTE
    this.contratosService.getContratosPIXPorGerenteId(1).subscribe({
      next: (page: PageResponse<ContratoDtoResponse>) => {
        this.totalContratosPIXDoGerente.set(page?.totalElements ?? 0);
        this.contratosPIX.set(page?.content ?? []);
        console.log('totalElements', page?.totalElements);
        console.log('contratosPIX-length', this.contratosPIX().length);
        console.log('contratosPIX', this.contratosPIX());
        this.updatePercentuais();
      },
      error: () => this.totalContratosPIXDoGerente.set(0)
    });

    //CONTRATOS - AQUI SABEMOS CONTRATAOS CREDITO DO GERENTE
    this.contratosService.getContratosCREDITOPorGerenteId(1).subscribe({
      next: (page: PageResponse<ContratoDtoResponse>) => {
        this.totalContratosCREDITODoGerente.set(page?.totalElements ?? 0);
        this.contratosCREDITO.set(page?.content ?? []);
        console.log('totalElements', page?.totalElements);
        console.log('contratosCREDITO-length', this.contratosCREDITO().length);
        console.log('contratosCREDITO', this.contratosCREDITO());
        this.updatePercentuais();
      },
      error: () => this.totalContratosCREDITODoGerente.set(0)
    });

  }

  //  ----------- ATUALIZAR OS VALORES UTILIZADOS PARA OS TOTAIS PERCENTUAIS DE CADA PRODUTO (% DE CLIENTES COM CADA PRODUTO CONTRATADO) ----------- 
  private updatePercentuais() {
    const total = Number(this.totalContasDoGerente());
    const pix = Number(this.totalContratosPIXDoGerente());
    const credito = Number(this.totalContratosCREDITODoGerente());
    if (total > 0) {
      this.percentualClientesPIX.set(Math.round((pix / total) * 100));
      this.percentualClientesCREDITO.set(Math.round((credito / total) * 100));
    } else {
      this.percentualClientesPIX.set(0);
      this.percentualClientesCREDITO.set(0);
    }
  }

  //  ----------- GRÁFICO DE SETORES ----------- 
  actionPIXArea = () => this.openContatosCREDITOTableOpen();
  actionCREDITOArea = () => this.openContatosCREDITOTableOpen();
  actionOUTROSArea = () => console.log('PIE segment: OUTROS');

  //  ----------- CARD TOTAL DE CLIENTES DO GERENTE  -----------
  onTotalContasTableOpen() {
    this.showContasTable.set(!this.showContasTable());
  }

  closeContasTable() {
    this.showContasTable.set(false);
    this.pageListaContasTotal.set(0);
  }

  nextPageListaContasTotal() {
    const p = this.pageListaContasTotal();
    const tp = this.totalPages();
    if (p < tp - 1) this.pageListaContasTotal.set(p + 1);
  }

  prevPage() {
    const p = this.pageListaContasTotal();
    if (p > 0) this.pageListaContasTotal.set(p - 1);
  }

  //  ----------- CARD TOTAL DE CONTRATOS - PIX  -----------
  openContatosPIXTableOpen() {
    console.log('Gap card action');
    this.showContratosPIXTable.set(!this.showContratosPIXTable());
  }

  closeContratosPIXTable() {
    this.showContratosPIXTable.set(false);
  }

  //  ----------- CARD TOTAL DE CONTRATOS - CRÉDITO  -----------
  openContatosCREDITOTableOpen() {
    console.log('Conversion card action');
    this.showContratosCREDITOTable.set(!this.showContratosCREDITOTable());
  }

  closeContratosCREDITOTable() {
    this.showContratosCREDITOTable.set(false);
  }

  //  ----------- CARD TOTAL DE CONTRATOS - DÉBITO  -----------
  notifyClick() {
    console.log('Notifications click');
  }

  //  ----------- CARD TOTAL DE CONTRATOS - SEGURO DE VIDA  -----------
  onTasksCardAction() {
    console.log('Tasks card action');
  }

  // ----------- HEADER - BOTÕES DE AÇÕES NO HEADER DA PÁGINA ----------- 
  toggleSidebar() {
    this.sidebarOpen.set(!this.sidebarOpen());
  }
 
}
