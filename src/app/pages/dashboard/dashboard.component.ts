import { Component, signal, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SidebarComponent } from '../../components/sidebar/sidebar.component';
import { InfoCardComponent } from '../../shared/components/info-card/infoCard.component';
import { PaginatedTableComponent } from '../../shared/components/paginated-table/paginated-table.component';
import { GraphCardComponent } from '../../shared/components/graph-card/graph-card.component';
import { ContasService } from '../../services/contas.service';
import { ContaDtoResponse } from '../../models/contas';
import { PageResponse } from '../../shared/utils/pagination';
import { ContratosService } from '../../services/contratos.service';
import { ResumoPorProdutosDtoResponse } from '../../models/contratos';
import { TableColumn } from '../../shared/components/paginated-table/paginated-table.component';
import { GerenteDtoResponse } from '../../models/gerentes';
import { GerenteStore } from '../../services/gerente-store.service';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, SidebarComponent, InfoCardComponent, PaginatedTableComponent, GraphCardComponent],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})

export class DashboardComponent {
  //GERENTE LOGADO
  gerente: GerenteDtoResponse | null = null;
  gerenteNome: string = "Nome";
  gerenteAvatar: string = "AB";

  //GERAIS
  sidebarOpen = signal<boolean>(true);
  isShowingOneTable = signal<boolean>(false);
  /* TODO: verificar depois quanto à funcionalidade de PAGINAÇÃO DAS TABELAS
  tentar manter variáveis gerais para todas as tabelas uma vez que só poderá ter uma tabela aberta por vez em tela ... */
  pageListaContasTotal = signal<number>(0);
  pageSizeListaContasTotal = 10;
  totalPages = computed<number>(() => Math.max(1, Math.ceil(this.contas().length / this.pageSizeListaContasTotal)));
  
  // CONTAS ASSOCIADAS AO GERENTE (sem pensar em contratos/produtos contratados)
  totalContasDoGerente = signal<number>(0);
  showContasTable = signal<boolean>(false);
  contas = signal<ContaDtoResponse[]>([]);
  displayedContas = computed<ContaDtoResponse[]>(() => {
    const all = this.contas();
    const start = this.pageListaContasTotal() * this.pageSizeListaContasTotal;
    return all.slice(start, start + this.pageSizeListaContasTotal);
  });
  
  // CONTRATOS (RELAÇÃO CONTAS COM PRODUTOS) ASSOCIADOS AO GERENTE
  resumoContratosDoGerente: ResumoPorProdutosDtoResponse[] = [];
  //PRODUTO PIX:
  resumoPIX: ResumoPorProdutosDtoResponse | null = null;
  percentualClientesPIX = signal<number>(0);
  showContratosPIXTable = signal<boolean>(false);
  showGapsPIXTable = signal<boolean>(false);
  //PRODUTO CARTÃO DE CRÉDITO:
  resumoCARTAOCREDITO: ResumoPorProdutosDtoResponse | null = null;
  percentualClientesCARTAOCREDITO = signal<number>(0);
  showContratosCREDITOTable = signal<boolean>(false);
  showGapsCREDITOTable = signal<boolean>(false);
  //TODO: para futuros produtos bastaria seguir a mesma lógica aqui (ver HTML para compreender melhor)

  // ----------------------- COLUNAS DE TABELAS - para o componente <app-paginated-table> -------------------------------------------
  contasColumns: TableColumn[] = [
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
  contratoColumns: TableColumn[] = [
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
  // ----------------------- COLUNAS DE TABELAS UTILIZADAS -------------------------------------------


  //  ----------- LISTAGENS UTILIZADAS PARA O DASHBOARD DE MANEIRA GERAL ----------- 
  constructor(private contasService: ContasService, private contratosService: ContratosService, private gerenteStore: GerenteStore) {

    this.contasService.getContasPorGerenteId(1).subscribe({
      next: (page: PageResponse<ContaDtoResponse>) => {
        this.totalContasDoGerente.set(page?.totalElements ?? 0);
        this.contas.set(page?.content ?? []);
        console.log('totalElements', page?.totalElements);
        console.log('contas-length', this.contas().length);
        console.log('contas', this.contas());
        //CONTAS - AQUI SABEMOS O TOTAL DE CLIENTS ASSOCIADOS AO GERENTE
        // IMPORTANTE: AQUI USANDO A ROTA DE BUSCA PAGINADA COM FILTROS GENÉRICA DO contasController 
      },
      error: () => this.totalContasDoGerente.set(0)
    });

    this.contratosService.getResumoContratosPorGerenteId(1).subscribe({
      next: (response: ResumoPorProdutosDtoResponse[]) => {
        this.resumoContratosDoGerente = response ? response :[];
        this.setResumoValores(this.resumoContratosDoGerente);
        console.log('totalElements', response.length);
        // IMPORTANTE: HÁ UMA OUTRA ROTA TAMBÉM FUNCIONAL DE BUSCA PAGINADA COM FILTROS no contratosController, MAS ESTA 
        // AQUI COM O RETORNO DO TIPO ResumoPorProdutosDtoResponse[] FOI PREPARADA PARA O DASHBOARD ESPECIFICAMENTE
        // ResumoPorProdutosDtoResponse {
        //   produtoCodigo: string;
        //   produtoDescricao: string;
        //   contratosVigentes: PageResponse<ContratoDtoResponse>;
        //   contasGapDoProduto: PageResponse<ContaDtoResponse>;
        // }
      },
      error: () => this.resumoContratosDoGerente = []
    });

  }

  private setDadosGerenteLogado(gerenteLogado: GerenteDtoResponse) {
    if (gerenteLogado) {
          this.gerente = gerenteLogado;
          this.gerenteNome = gerenteLogado?.pessoa?.nome ?? '';
          const parts = (this.gerenteNome || '').trim().split(/\s+/);
          const first = parts[0]?.[0] ?? '';
          const last = parts[parts.length - 1]?.[0] ?? '';
          this.gerenteAvatar = (first + last).toUpperCase();
          this.gerenteStore.setFromGerente(gerenteLogado);
    }
  }

  private setResumoValores(resumo: ResumoPorProdutosDtoResponse[]) {
    if (resumo?.length > 0) {
      resumo.forEach((item) => {
        //Produto PIX:
        if (item?.produtoDescricao === 'PIX') {
          this.resumoPIX = item;
          //TODO - reposicionar o carregamento dos dados do gerente onde faça mais sentido
          this.setDadosGerenteLogado(item?.contasGapDoProduto?.content?.[0]?.gerente ?? null);
        }
        //Produto Cartão de Crédito:
        if (item?.produtoDescricao === 'CARTAO DE CRÉDITO') {
          this.resumoCARTAOCREDITO = item;
        }
        //TODO: Produtos Futuros:
        // . . .
        this.updatePercentuais();
      });
    }
    
  }

  //  ----------- ATUALIZAR OS VALORES UTILIZADOS PARA OS 
  // PERCENTUAIS DE CADA PRODUTO (% DE CLIENTES COM CADA 
  // PRODUTO CONTRATADO) ----------- 
  private updatePercentuais() {
    const total = Number(this.totalContasDoGerente());
    const pix = Number(this?.resumoPIX?.contratosVigentes?.totalElements ?? 0);
    const credito = Number(this?.resumoCARTAOCREDITO?.contratosVigentes?.totalElements ?? 0);

    if (total > 0 && pix != null && credito != null) {
      this.percentualClientesPIX.set(Math.round((pix / total) * 100));
      this.percentualClientesCARTAOCREDITO.set(Math.round((credito / total) * 100));
    } else {
      this.percentualClientesPIX.set(0);
      this.percentualClientesCARTAOCREDITO.set(0);
    }
  }

  //  [TOTAL DE CLIENTES DO GERENTE]  -----------------------------------------------------
  onTotalContasTableOpen() {
    this.showContasTable.set(!this.showContasTable());
    this.isShowingOneTable.set(true);
  }

  closeContasTable() {
    this.showContasTable.set(false);
    this.pageListaContasTotal.set(0);
    this.isShowingOneTable.set(false);
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
  //  ------------------------------------------------ [TOTAL DE CLIENTES DO GERENTE]
  //  [PIX]  ------------------------------------------------------------------------
  showListaContratosPIX = () => this.openContratosPIXTable();

  openContratosPIXTable = () => {
    console.log('Conversion card action');
    this.showContratosPIXTable.set(!this.showContratosPIXTable());
    this.isShowingOneTable.set(true);
  }

  closeContratosPIXTable = () => {
    this.isShowingOneTable.set(false);
    this.showContratosPIXTable.set(false);
  }

  showListaGAPsPIX = () => this.openGapsPIXTable();

  openGapsPIXTable = () => {
    this.isShowingOneTable.set(true);
    console.log('Conversion card action');
    this.showGapsPIXTable.set(!this.showGapsPIXTable());
  }

  closeGapsPIXTable = () => {
    this.isShowingOneTable.set(false);
    this.showGapsPIXTable.set(false);
  }
  //  ---------------------------------------------------- [PIX]
  //  [CARTÃO DE CRÉDITO]  -------------------------------------
  showListaContratosCREDITO = () => this.openContratosCREDITOTable();
  openContratosCREDITOTable = () => {
    this.isShowingOneTable.set(true);
    console.log('Conversion card action');
    this.showContratosCREDITOTable.set(!this.showContratosCREDITOTable());
  }

  closeContratosCREDITOTable = () => {
    this.isShowingOneTable.set(false);
    this.showContratosCREDITOTable.set(false);
  }

  showListaGAPsCREDITO = () => this.openGapsCREDITOTable();
  openGapsCREDITOTable = () => {
    this.isShowingOneTable.set(true);
    console.log('Conversion card action');
    this.showGapsCREDITOTable.set(!this.showGapsCREDITOTable());
  }

  closeGapsCREDITOTable = () => {
    this.isShowingOneTable.set(false);
    this.showGapsCREDITOTable.set(false);
  }
  //  --------------------------------------- [CARTÃO DE CRÉDITO]

  //TODO: proximos cards e ações a serem implementadas...
  //  ----------- CARD TOTAL DE CONTRATOS - DÉBITO  -----------
  notifyClick() {
    console.log('Notifications click');
  }

  //  ----------- CARD TOTAL DE CONTRATOS - SEGURO DE VIDA  -----------
  // onTasksCardAction() {
  //   console.log('Tasks card action');
  // }

  // ----------- HEADER - BOTÕES DE AÇÕES NO HEADER DA PÁGINA ----------- 
  toggleSidebar() {
    this.sidebarOpen.set(!this.sidebarOpen());
  }
 
}
