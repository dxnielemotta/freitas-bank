import { Inject, Injectable, forwardRef } from '@nestjs/common';
import { Gerente } from './gerente.model';
import { ClienteService } from '../cliente/cliente.service';
import { Cliente } from 'src/cliente/cliente.model';
import { TipoConta } from '../enums/tipo-conta.enum';
import { ContaService } from 'src/conta/conta.service';
import { Conta } from 'src/conta/conta.model';

@Injectable()
export class GerenteService {
  private gerentes: Gerente[] = [];
  private clientes: Cliente[] = [];
  private contas: Conta[] = [];

  constructor(
    @Inject(forwardRef(() => ClienteService))
    @Inject(forwardRef(() => ContaService))
    private clienteService: ClienteService,
    private contaService: ContaService,
  ) {}

  criarGerente(nomeCompleto: string): Gerente {
    const gerente = new Gerente(nomeCompleto);
    this.gerentes.push(gerente);
    return gerente;
  }

  obterGerente(gerenteID: string): Gerente {
    const gerente = this.gerentes.find((gerente) => gerente.id === gerenteID);
    if (!gerente) {
      throw new Error('Gerente não encontrado');
    }
    return gerente;
  }

  listarGerentes(): Gerente[] {
    return this.gerentes;
  }

  adicionarClienteAoGerente(
    gerenteID: string,
    nomeCompleto: string,
    endereco: string,
    telefone: string,
    rendaSalarial: number,
  ): Cliente {
    //cadastrando cliente
    const cliente = this.clienteService.cadastrarCliente(
      nomeCompleto,
      endereco,
      telefone,
      rendaSalarial,
      gerenteID,
    );
    //pegando o gerente e adicionando o cliente a ele
    const gerente = this.obterGerente(gerenteID);
    gerente.adicionarCliente(cliente);
    return cliente;
  }

  abrirConta(tipo: TipoConta, clienteID: string) {
    // verificando a renda do cliente
    const cliente = this.clientes.find((cli) => cli.id === clienteID);

    if (tipo === TipoConta.CORRENTE && cliente.rendaSalarial < 500) {
      throw new Error(
        'Cliente não possui os requisitos para abrir uma conta-corrente',
      );
    }

    //abrindo a conta
    const conta = this.contaService.abrirConta(tipo, clienteID);
    //adicionando a conta ao array de contas do cliente
    return this.contas.push(conta);
  }

  //mudarConta do conta.service
  mudarTipoConta(contaID: string, novoTipo: TipoConta) {
    this.contaService.mudarTipoConta(contaID, novoTipo);
  }

  //fecharConta do conta.service
  fecharConta(contaID: string) {
    this.contaService.fecharConta(contaID);
  }
}
