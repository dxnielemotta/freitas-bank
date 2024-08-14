import { Inject, Injectable } from '@nestjs/common';

import { Conta } from '../entities/conta.entity';
import { TipoConta } from '../enums/tipo-conta.enum';
import { TipoPagamento } from '../enums/tipo-pagamento.enum';
import { PagamentoFactory } from '../factories/pagamento.factory';
import { IContaRepository } from '../interfaces/conta.repository.interface';
import { Cliente } from '../entities/cliente.entity';

@Injectable()
export class ContaService {
  private contas: Conta[] = [];

  //usar uma interface para ContaRepository
  constructor(
    @Inject('IContaRepository')
    private readonly contaRepository: IContaRepository,
  ) {}

  async abrirConta(tipo: TipoConta, cliente: Cliente) {
    const conta = await this.contaRepository.cadastrarConta(tipo, cliente);
    this.contas.push(conta);
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
    return this.contaRepository.listarContas();
  }

  async mudarTipoConta(contaId: string, novoTipo: TipoConta) {
    const conta = await this.obterConta(contaId);
    conta.tipo = novoTipo;
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
    const conta = await this.obterConta(contaId);

    const pagamento = PagamentoFactory.criarPagamento(tipoPagamento);
    pagamento.pagar(valor, conta);
  }
}
