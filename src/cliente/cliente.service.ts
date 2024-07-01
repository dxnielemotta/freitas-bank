import { Injectable } from '@nestjs/common';
import { Cliente } from './cliente.model';

@Injectable()
export class ClientesService {
  private contas: Conta[] = [];
  private clientes: Cliente[] = [];

  cadastrarCliente(
    nomeCompleto: string,
    endereco: string,
    telefone: string,
    rendaSalarial: number,
  ): Cliente {
    const cliente = new Cliente(
      nomeCompleto,
      endereco,
      telefone,
      rendaSalarial,
    );
    this.clientes.push(cliente);
    return cliente;
  }

  abrirConta(conta: Conta): void {
    this.contas.push(conta);
  }
  fecharConta(conta: Conta): void {
    this.contas = this.contas.filter((item) => item.id !== conta.id);
  }

  mudarTipoConta(conta: Conta, novoTipo: string): void {
    let contaEncontrada = this.contas.find((item) => item.id === conta.id);

    if (!contaEncontrada) {
      console.log('Conta não encontrada');
      return;
    }

    if (novoTipo === 'corrente') {
      contaEncontrada = new ContaCorrente(conta.saldo);
    } else {
      contaEncontrada = new ContaPoupanca(conta.saldo);
    }
  }
}
