import { Component, computed, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { PaginatedTableComponent, TableColumn } from '../../shared/components/paginated-table/paginated-table.component';
import { EnumStatusTarefa, EnumTipoTarefa, TarefaDtoResponse } from '../../models/tarefas';
import { SidebarComponent } from '../../components/sidebar/sidebar.component';
import { TarefasService } from '../../services/tarefas.service';
import { PageResponse } from '../../shared/utils/pagination';
import { MetaDtoResponse } from '../../models/metas';
import { GerenteStore } from '../../services/gerente-store.service';

@Component({
  selector: 'app-tarefas',
  standalone: true,
  imports: [CommonModule, FormsModule, PaginatedTableComponent, SidebarComponent],
  templateUrl: './tarefas.component.html',
  styleUrl: './tarefas.component.css'
})
export class TarefasComponent {
  sidebarOpen = signal<boolean>(true);
  constructor(
    private tarefasService: TarefasService,
    public gerenteStore: GerenteStore
  ) {
    this.tarefasService.buscarMetasPorGerenteId(1).subscribe({
      next: (page: PageResponse<MetaDtoResponse>) => this.metas.set(page?.content ?? []),
      error: () => this.metas.set([])
    });
    this.tarefasService.buscarTarefasPorGerenteId().subscribe({
      next: (page: PageResponse<TarefaDtoResponse>) => this.tarefas.set(page?.content ?? []),
      error: () => this.tarefas.set([])
    });

    this.tarefasService.buscarTarefasComFiltros(
        1,//gerenteId: number,
        null,//metaId: number | null,
        null,//statusTarefa: string | null,
        null,//tipoTarefa: string | null,
        null,//inicio: string | null,
        null,//fim: string | null,
        //pagination
        null,//sortBy: string | null,
        null,//page: number | null,
        null,//size: number | null,
        null,//direction: string | null,
      ).subscribe({
        next: (page: PageResponse<TarefaDtoResponse>) => {
          this.tarefas.set(page?.content ?? []);
        },
        error: () => this.tarefas.set([])
    });
  }
  // Dados
  tarefas = signal<TarefaDtoResponse[]>([]);
  metas = signal<MetaDtoResponse[]>([]);

  // Filtros
  filtroMetaId = signal<number | null>(null);  //metaId: number | null,
  filtroStatusTarefa = signal<EnumStatusTarefa | null>(null);  //statusTarefa: string | null,
  filtroTipoTarefa = signal<EnumTipoTarefa | null>(null);  //tipoTarefa: string | null,
  filtroInicio = signal<string | null>(null);  //inicio: string | null,
  filtroFim = signal<string | null>(null);  //fim: string | null,
  //pagination
  filtroSortBy = signal<string | null>(null);  //sortBy: string | null,
  filtroPage = signal<number | null>(null);  //page: number | null,
  filtroSize = signal<number | null>(null);  //size: number | null,
  filtroDirection = signal<string | null>(null);  //direction: string | null,

  // Opções dos filtros
  statusOptions: EnumStatusTarefa[] = ['CRIADA', 'EM_ANDAMENTO', 'REALIZADA', 'POSTERGADA', 'CANCELADA'];
  tipoOptions: EnumTipoTarefa[] = ['VISITA_LOCAL', 'CONTATO_TELEFONICO', 'COBRANCA', 'OUTRO'];
  metaOptions = computed<{ id: number; descricao: string }[]>(() => {
    const map = new Map<number, string>();
    (this.metas() || []).forEach(m => {
      if (typeof m.id === 'number') {
        map.set(m.id, m.descricao ?? String(m.id));
      }
    });
    return Array.from(map.entries()).map(([id, descricao]) => ({ id, descricao }));
  });

  // Tabela
  columns: TableColumn[] = [
    { header: 'ID', field: 'id', format: 'number' },
    { header: 'Status', field: 'status', cellClass: (row: any) => {
      const statusTarefa = row?.status;
      return statusTarefa === 'CRIADA' ? 'cell-criada' :
             statusTarefa === 'EM_ANDAMENTO' ? 'cell-em-andamento' :
             statusTarefa === 'REALIZADA' ? 'cell-realizada' :
             statusTarefa === 'POSTERGADA' ? 'cell-postergada' :
             statusTarefa === 'CANCELADA' ? 'cell-cancelada' :
             'cell-vencida';
    } },
    { header: 'Tipo', field: 'tipo' },
    { header: 'Descrição', field: 'descricao' },
    //{ header: 'Produto', field: 'produtoId' },
    //{ header: 'Cliente', field: 'clienteId' },
    //{ header: 'Contrato', field: 'contratoId' },
    //{ header: 'Gerente', field: 'gerente.id' },
    //{ header: 'Criada em', field: 'dataCriacao', format: 'date', digitsInfo: 'short', locale: 'pt-BR' },
    //{ header: 'Atualizada em', field: 'dataAtualizacao', format: 'date', digitsInfo: 'short', locale: 'pt-BR' }
  ];
  pageSize = 10;

  // Resultado filtrado
  filteredTarefas = computed<TarefaDtoResponse[]>(() => {
    const status = this.filtroStatusTarefa();
    const metaId = this.filtroMetaId();
    const tipo = this.filtroTipoTarefa();
    return (this.tarefas() || []).filter(t => {
      const byStatus = status != null ? t.status === status : true;
      const byMetaId = metaId != null ? t.metaId === metaId : true;
      const byTipo = tipo != null ? t.tipo === tipo : true;
      return byStatus && byMetaId && byTipo;
    });
  });

  // Ações
  limparFiltros() {
    this.filtroStatusTarefa.set(null);
    this.filtroMetaId.set(null);
    this.filtroTipoTarefa.set(null);
    this.filtroInicio.set(null);
    this.filtroFim.set(null);
    this.filtroSortBy.set(null);
    this.filtroPage.set(null);
    this.filtroSize.set(null);
    this.filtroDirection.set(null);
  }

}
