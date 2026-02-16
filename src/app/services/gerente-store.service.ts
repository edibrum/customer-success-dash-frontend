import { Injectable, signal } from '@angular/core';
import { GerenteDtoResponse } from '../models/gerentes';

@Injectable({ providedIn: 'root' })
export class GerenteStore {
  nome = signal<string>('Nome');
  avatar = signal<string>('AB');

  setProfile(nome: string) {
    this.nome.set(nome ?? '');
    const parts = (nome || '').trim().split(/\s+/);
    const first = parts[0]?.[0] ?? '';
    const last = parts[parts.length - 1]?.[0] ?? '';
    this.avatar.set((first + last).toUpperCase());
  }

  setFromGerente(gerente: GerenteDtoResponse | null) {
    if (!gerente) return;
    this.setProfile((gerente as any)?.pessoa?.nome ?? '');
  }
}

