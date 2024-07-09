import { Inject, Injectable, forwardRef } from '@nestjs/common';
import { Cliente } from './cliente.model';
import { GerenteService } from 'src/gerente/gerente.service';
import { Conta } from 'src/conta/conta.model';
import { TipoConta } from 'src/enums/tipo-conta.enum';
import { ContaService } from 'src/conta/conta.service';

@Injectable()
export class ClienteService {
  private clientes: Cliente[] = [];
  private contas: Conta[] = [];

  constructor(
    @Inject(forwardRef(() => GerenteService))
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

  //usar esse metodo pra criar uma rota pra listar as contas do cliente depois
  adicionarContaAoCliente(tipo: TipoConta, clienteID: string) {
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
}
