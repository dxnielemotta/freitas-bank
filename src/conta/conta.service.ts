import { Inject, Injectable, forwardRef } from '@nestjs/common';
import { ContaCorrente, ContaPoupanca } from './conta.model';

import { ClienteService } from 'src/cliente/cliente.service';

@Injectable()
export class ContaService {
  constructor(
    @Inject(forwardRef(() => ClienteService))
    private readonly clienteService: ClienteService,
  ) {}

  criarContaCorrente(clienteID: string): void {
    const cliente = this.clienteService.obterCliente(clienteID);
    if (!cliente) {
      throw new Error('Cliente não encontrado');
    }
    const conta = new ContaCorrente(0, clienteID);
    cliente.abrirConta(conta);
  }

  criarContaPoupanca(clienteID: string): void {
    const cliente = this.clienteService.obterCliente(clienteID);
    if (!cliente) {
      throw new Error('Cliente não encontrado');
    }
    const conta = new ContaPoupanca(0, clienteID);
    cliente.abrirConta(conta);
  }
}
