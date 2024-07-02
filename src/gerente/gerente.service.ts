import { Injectable, NotFoundException } from '@nestjs/common';
import { Gerente } from './gerente.model';
import { ClienteService } from '../cliente/cliente.service';
import { Cliente } from 'src/cliente/cliente.model';

@Injectable()
export class GerenteService {
  private gerentes: Gerente[] = [];

  constructor(private readonly clienteService: ClienteService) {}

  criarGerente(nome: string): Gerente {
    const gerente = new Gerente(nome);
    this.gerentes.push(gerente);
    return gerente;
  }

  obterGerente(id: string): Gerente {
    const gerente = this.gerentes.find((gerente) => gerente.id === id);
    if (!gerente) {
      throw new NotFoundException('Gerente não encontrado');
    }
    return gerente;
  }

  adicionarCliente(
    gerenteId: string,
    nomeCompleto: string,
    endereco: string,
    telefone: string,
    rendaSalarial: number,
  ): void {
    const gerente = this.obterGerente(gerenteId);
    const cliente = this.clienteService.cadastrarCliente(
      nomeCompleto,
      endereco,
      telefone,
      rendaSalarial,
    );
    gerente.adicionarCliente(cliente);
  }
}
