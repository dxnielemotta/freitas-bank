import { Inject, Injectable, forwardRef } from '@nestjs/common';
import { Cliente } from './cliente.entity';
import { GerenteService } from 'src/gerente/gerente.service';
import { Conta } from 'src/conta/conta.entity';
import { TipoConta } from 'src/enums/tipo-conta.enum';
import { ContaService } from 'src/conta/conta.service';
import { TipoPagamento } from 'src/enums/tipo-pagamento.enum';
import { PagamentoFactory } from 'src/pagamento/pagamento.factory';

@Injectable()
export class ClienteService {
  private clientes: Cliente[] = [];
  private contas: Conta[] = [];

  constructor(
    @Inject(forwardRef(() => GerenteService))
    @Inject(forwardRef(() => ContaService))
    private gerenteService: GerenteService,
    private contaService: ContaService,
  ) {}

  cadastrarCliente(
    nomeCompleto: string,
    endereco: string,
    telefone: string,
    rendaSalarial: number,
    gerenteID: string,
  ): Cliente {
    const gerente = this.gerenteService.obterGerente(gerenteID);
    const cliente = new Cliente(
      nomeCompleto,
      endereco,
      telefone,
      rendaSalarial,
      gerenteID,
    );
    this.clientes.push(cliente);
    gerente.adicionarCliente(cliente);
    return cliente;
  }

  obterCliente(id: string): Cliente {
    const cliente = this.clientes.find((cliente) => cliente.id === id);
    if (!cliente) {
      throw new Error('Cliente não encontrado');
    }
    return cliente;
  }

  listarClientes(): Cliente[] {
    return this.clientes;
  }

  adicionarContaAoCliente(tipo: TipoConta, clienteID: string) {
    const cliente = this.obterCliente(clienteID);

    if (!cliente.contas) {
      cliente.contas = [];
    }

    if (tipo === TipoConta.CORRENTE && cliente.rendaSalarial < 500) {
      throw new Error(
        'Cliente não possui os requisitos para abrir uma conta-corrente',
      );
    }

    const conta = this.contaService.abrirConta(tipo, clienteID);

    cliente.contas.push(conta);
    this.contas.push(conta);
    return;
  }

  mudarTipoConta(contaID: string, novoTipo: TipoConta) {
    this.contaService.mudarTipoConta(contaID, novoTipo);
  }

  fecharConta(contaID: string) {
    this.contaService.fecharConta(contaID);
  }

  listarContasDoCliente(clienteID: string): Conta[] {
    const contas = this.contas.filter((conta) => conta.clienteID === clienteID);
    return contas;
  }

  removerContaDoCliente(clienteID: string, contaID: string) {
    const cliente = this.obterCliente(clienteID);

    cliente.contas = cliente.contas.filter((conta) => conta.id !== contaID);
    this.contas = this.contas.filter((conta) => conta.id !== contaID);
  }

  fazerPagamento(contaID: string, valor: number, tipoPagamento: TipoPagamento) {
    this.contaService.fazerPagamento(contaID, valor, tipoPagamento);
  }
}
