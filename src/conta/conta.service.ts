import { forwardRef, Inject, Injectable } from '@nestjs/common';

import { Conta } from './conta.entity';
import { ContaFactory } from './conta.factory';
import { TipoConta } from 'src/enums/tipo-conta.enum';
import { ClienteService } from 'src/cliente/cliente.service';
import { TipoPagamento } from 'src/enums/tipo-pagamento.enum';
import { PagamentoFactory } from 'src/pagamento/pagamento.factory';

@Injectable()
export class ContaService {
  private contas: Conta[] = [];

  constructor(
    @Inject(forwardRef(() => ClienteService))
    private clienteService: ClienteService,
  ) {}

  abrirConta(tipo: TipoConta, clienteID: string) {
    const conta = ContaFactory.criarConta(tipo, clienteID);
    this.contas.push(conta);
    return conta;
  }

  fecharConta(contaID: string) {
    const conta = this.obterContaPorId(contaID);
    if (!conta) {
      throw new Error('Conta não encontrada');
    }

    const index = this.contas.findIndex((c) => c.id === contaID);
    if (index > -1) {
      this.contas.splice(index, 1);
    }

    this.clienteService.removerContaDoCliente(conta.clienteID, contaID);
    return;
  }

  mudarTipoConta(contaID: string, novoTipo: TipoConta) {
    const contaEncontrada = this.obterContaPorId(contaID);

    if (!contaEncontrada) {
      throw new Error('Conta não encontrada');
    }
    contaEncontrada.tipo = novoTipo;
  }

  listarContas() {
    return this.contas;
  }

  obterContaPorId(contaID: string) {
    return this.contas.find((conta) => conta.id == contaID);
  }

  fazerPagamento(contaID: string, valor: number, tipoPagamento: TipoPagamento) {
    const conta = this.obterContaPorId(contaID);
    if (!conta) {
      throw new Error('Conta não encontrada');
    }

    const pagamento = PagamentoFactory.criarPagamento(tipoPagamento);
    pagamento.pagar(valor, conta);
  }
}
