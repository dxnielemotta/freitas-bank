import { Conta, ContaCorrente, ContaPoupanca } from 'src/conta/conta.model';
import { Cliente } from '../cliente/cliente.model';
import { v4 as uuidv4 } from 'uuid';
import { TipoConta } from 'src/enums/tipo-conta.enum';

export class Gerente {
  id: string;
  clientes: Cliente[] = [];

  constructor(public nomeCompleto: string) {
    this.id = uuidv4();
  }

  adicionarCliente(cliente: Cliente): void {
    this.clientes.push(cliente);
  }

  removerCliente(cliente: Cliente): void {
    this.clientes = this.clientes.filter((item) => item.id !== cliente.id);
  }

  obterCliente(clienteID: string): Cliente {
    const cliente = this.clientes.find((cliente) => cliente.id === clienteID);
    if (!cliente) {
      throw new Error('Cliente não encontrado');
    }
    return cliente;
  }

  abrirConta(cliente: Cliente, tipoConta: TipoConta): void {
    if (tipoConta === TipoConta.CORRENTE && cliente.rendaSalarial < 500) {
      throw new Error(
        'Cliente não possui os requisitos para abrir conta corrente.',
      );
    }
    const conta =
      tipoConta === TipoConta.CORRENTE
        ? new ContaCorrente(0, cliente.id)
        : new ContaPoupanca(0, cliente.id);
    cliente.abrirConta(conta);
  }

  fecharConta(cliente: Cliente, conta: Conta): void {
    cliente.fecharConta(conta);
  }

  mudarTipoConta(cliente: Cliente, conta: Conta, novoTipo: TipoConta): void {
    cliente.mudarTipoConta(conta, novoTipo);
  }
}
