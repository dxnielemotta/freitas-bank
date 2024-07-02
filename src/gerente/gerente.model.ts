import { Conta, ContaCorrente, ContaPoupanca } from 'src/conta/conta.model';
import { Cliente } from '../cliente/cliente.model';
import { v4 as uuidv4 } from 'uuid';
import { TipoConta } from 'src/enums/tipo-conta.enum';

export class Gerente {
  id: string;
  clientes: Cliente[] = [];

  constructor(nome: string) {
    this.id = uuidv4();
  }

  adicionarCliente(cliente: Cliente): void {
    // const novoCliente = new Cliente(
    //   cliente.nomeCompleto,
    //   cliente.endereco,
    //   cliente.telefone,
    //   cliente.rendaSalarial,
    // );
    this.clientes.push(cliente);
  }

  removerCliente(cliente: Cliente): void {
    this.clientes = this.clientes.filter((item) => item.id !== cliente.id);
  }

  abrirConta(cliente: Cliente, tipoConta: TipoConta): void {
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
