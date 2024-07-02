import { Inject, Injectable, forwardRef } from '@nestjs/common';
import { Gerente } from './gerente.model';
import { ClienteService } from '../cliente/cliente.service';

@Injectable()
export class GerenteService {
  private gerentes: Gerente[] = [];

  constructor(
    @Inject(forwardRef(() => ClienteService))
    private clienteService: ClienteService,
  ) {}

  criarGerente(nomeCompleto: string): Gerente {
    const gerente = new Gerente(nomeCompleto);
    this.gerentes.push(gerente);
    return gerente;
  }

  obterGerente(id: string): Gerente {
    const gerente = this.gerentes.find((gerente) => gerente.id === id);
    if (!gerente) {
      throw new Error('Gerente não encontrado');
    }
    return gerente;
  }

  adicionarCliente(
    gerenteID: string,
    nomeCompleto: string,
    endereco: string,
    telefone: string,
    rendaSalarial: number,
  ): void {
    const gerente = this.obterGerente(gerenteID);
    const cliente = this.clienteService.cadastrarCliente(
      nomeCompleto,
      endereco,
      telefone,
      rendaSalarial,
      gerenteID,
    );
    gerente.adicionarCliente(cliente);
  }
}
