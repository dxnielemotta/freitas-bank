import { Inject, Injectable } from '@nestjs/common';

import { Conta } from '../entities/conta.entity';
import { TipoConta } from '../enums/tipo-conta.enum';
import { TipoPagamento } from '../enums/tipo-pagamento.enum';
import { PagamentoFactory } from '../factories/pagamento.factory';
import { IContaRepository } from '../interfaces/conta.repository.interface';
import { Cliente } from '../entities/cliente.entity';
import { IPagamentoRepository } from '../interfaces/pagamento.repository.interface';

@Injectable()
export class ContaService {
  private contas: Conta[] = [];

  constructor(
    @Inject('IContaRepository')
    private readonly contaRepository: IContaRepository,
    // @Inject('IClienteRepository')
    // private readonly clienteRepository: IClienteRepository,
    @Inject('IPagamentoRepository')
    private readonly pagamentoRepository: IPagamentoRepository,
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

    console.log(conta);
    conta.tipo = novoTipo;
    console.log(conta);
    await this.contaRepository.mudarTipoConta(conta);
  }

  async fecharConta(contaId: string) {
    await this.contaRepository.excluirConta(contaId);

    //rever logica
    // this.clienteService.removerContaDoCliente(conta.clienteId, contaId);
  }

  async fazerPagamento(
    contaId: string,
    valor: number,
    tipoPagamento: TipoPagamento,
  ) {
    const conta = await this.contaRepository.buscarPorId(contaId);

    console.log(conta);

    if (!conta) {
      throw new Error('Conta não encontrada');
    }

    const pagamento = PagamentoFactory.criarPagamento(
      tipoPagamento,
      valor,
      conta,
    );

    // console.log(pagamento)
    pagamento.pagar(valor, conta);
    await this.pagamentoRepository.cadastrarPagamento(pagamento);
  }
}
