import { Inject, Injectable, forwardRef } from '@nestjs/common';
import { Gerente } from './gerente.model';
import { ClienteService } from '../cliente/cliente.service';
import { TipoConta } from 'src/enums/tipo-conta.enum';
import { Cliente } from 'src/cliente/cliente.model';

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
  ): Cliente {
    const gerente = this.obterGerente(gerenteID);
    const cliente = this.clienteService.cadastrarCliente(
      nomeCompleto,
      endereco,
      telefone,
      rendaSalarial,
      gerenteID,
    );
    gerente.adicionarCliente(cliente);
    return cliente;
  }

  mudarTipoConta(
    gerenteID: string,
    clienteID: string,
    contaID: string,
    novoTipo: TipoConta,
  ) {
    const gerente = this.obterGerente(gerenteID);
    if (!gerente) {
      throw new Error('Gerente não encontrado');
    }

    const cliente = gerente.obterCliente(clienteID);
    if (!cliente) {
      throw new Error('Cliente não encontrado');
    }

    const conta = cliente.contas.find((c) => c.id === contaID);
    if (!conta) {
      throw new Error('Conta não encontrada para o cliente');
    }

    cliente.mudarTipoConta(conta, novoTipo);
  }

  fecharConta(gerenteID: string, clienteID: string, contaID: string) {
    const gerente = this.obterGerente(gerenteID);
    const cliente = gerente.obterCliente(clienteID);
    const conta = cliente.contas.find((c) => c.id === contaID);
    if (!conta) {
      throw new Error('Conta não encontrada para o cliente');
    }
    cliente.fecharConta(conta);
  }

  listarGerentes(): Gerente[] {
    return this.gerentes;
  }
}
