import { Inject, Injectable } from '@nestjs/common';

import { Conta } from '../entities/conta.entity';
import { TipoConta } from '../enums/tipo-conta.enum';
import { TipoPagamento } from '../enums/tipo-pagamento.enum';
import { PagamentoFactory } from '../factories/pagamento.factory';
import { IContaRepository } from '../interfaces/conta.repository.interface';
import { Cliente } from '../entities/cliente.entity';
import { IPagamentoRepository } from '../interfaces/pagamento.repository.interface';
import { TipoTransacao } from '../enums/tipo-transacao.enum';
import { TransacaoFactory } from '../factories/transacao.factory';
import { ITransacaoRepository } from '../interfaces/transacao.repository.interface';
import { Transacao } from '../entities/transacao.entity';

@Injectable()
export class ContaService {
  private contas: Conta[] = [];
  private transacoes: Transacao[] = [];

  constructor(
    @Inject('IContaRepository')
    private readonly contaRepository: IContaRepository,
    @Inject('IPagamentoRepository')
    private readonly pagamentoRepository: IPagamentoRepository,
    @Inject('ITransacaoRepository')
    private readonly transacaoRepository: ITransacaoRepository,
  ) {}

  async abrirConta(tipo: TipoConta, cliente: Cliente) {
    const conta = await this.contaRepository.cadastrarConta(tipo, cliente);
    this.contas.push(conta);
    cliente.contas.push(conta);
    return conta;
  }

  async obterConta(contaId: string): Promise<Conta> {
    const conta = await this.contaRepository.buscarPorId(contaId);
    if (!conta) {
      throw new Error('Conta não encontrada');
    }
    return conta;
  }

  async listarContas() {
    return await this.contaRepository.listarContas();
  }

  async mudarTipoConta(contaId: string, novoTipo: TipoConta) {
    const conta = await this.obterConta(contaId);

    if (conta.cliente.rendaSalarial < 600) {
      throw new Error(
        'Cliente não possui os requisitos para mudar o tipo da conta.',
      );
    }

    conta.tipo = novoTipo;

    return await this.contaRepository.atualizarConta(conta);
  }

  async fecharConta(contaId: string) {
    return await this.contaRepository.excluirConta(contaId);
  }

  async fazerPagamento(
    contaId: string,
    valor: number,
    tipoPagamento: TipoPagamento,
  ) {
    const conta = await this.contaRepository.buscarPorId(contaId);

    if (!conta) {
      throw new Error('Conta não encontrada');
    }

    const pagamento = PagamentoFactory.criarPagamento(
      tipoPagamento,
      valor,
      conta,
    );

    pagamento.pagar(valor, conta);
    await this.contaRepository.atualizarConta(conta);
    return await this.pagamentoRepository.cadastrarPagamento(pagamento);
  }

  async depositar(contaId: string, valor: number) {
    const conta = await this.contaRepository.buscarPorId(contaId);
    if (!conta) {
      throw new Error('Conta não encontrada');
    }

    conta.depositar(valor);

    await this.contaRepository.atualizarConta(conta);

    const deposito = TransacaoFactory.criarTransacao(
      TipoTransacao.DEPOSITO,
      valor,
      conta,
    );

    this.transacoes.push(deposito);

    return await this.transacaoRepository.cadastrarTransacao(deposito);
  }

  async sacar(contaId: string, valor: number) {
    const conta = await this.contaRepository.buscarPorId(contaId);
    if (!conta) {
      throw new Error('Conta não encontrada');
    }

    if (valor > conta.saldo) {
      throw new Error('Saldo insuficiente');
    }

    conta.saldo -= valor;

    await this.contaRepository.atualizarConta(conta);

    const saque = TransacaoFactory.criarTransacao(
      TipoTransacao.SAQUE,
      valor,
      conta,
    );

    this.transacoes.push(saque);

    return await this.transacaoRepository.cadastrarTransacao(saque);
  }

  async transferir(contaId: string, valor: number, destinoId: string) {
    const contaOrigem = await this.contaRepository.buscarPorId(contaId);
    if (!contaOrigem) {
      throw new Error('Conta de origem não encontrada');
    }

    const contaDestino = await this.contaRepository.buscarPorId(destinoId);
    if (!contaDestino) {
      throw new Error('Conta de destino não encontrada');
    }

    if (valor > contaOrigem.saldo) {
      throw new Error('Saldo insuficiente');
    }

    contaOrigem.saldo -= valor;
    contaDestino.saldo += valor;

    await this.contaRepository.atualizarConta(contaOrigem);
    await this.contaRepository.atualizarConta(contaDestino);

    const transferencia = TransacaoFactory.criarTransacao(
      TipoTransacao.TRANSFERENCIA,
      valor,
      contaOrigem,
    );

    this.transacoes.push(transferencia);

    return await this.transacaoRepository.cadastrarTransacao(transferencia);
  }

  async obterExtrato(contaId: string) {
    const conta = await this.contaRepository.buscarPorId(contaId);
    if (!conta) {
      throw new Error('Conta não encontrada');
    }
    return await this.transacaoRepository.obterExtrato(contaId);
  }
}
