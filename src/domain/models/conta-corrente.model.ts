import { TipoConta } from '../enums/tipo-conta.enum';
import { Conta } from '../entities/conta.entity';
import { Cliente } from '../entities/cliente.entity';

export class ContaCorrente extends Conta {
  private limiteChequeEspecial: number = 100;

  constructor(saldo: number, cliente: Cliente) {
    super(saldo, cliente, TipoConta.CORRENTE);
  }

  private saldoTotal = this.saldo + this.limiteChequeEspecial;

  verificarValorASerSacado(valor: number): void {
    if (valor > this.saldoTotal) {
      throw new Error('Saldo insuficiente');
    }
  }

  transferir(destino: Conta, valor: number): void {
    this.verificarValorASerSacado(valor);

    if (valor < this.saldo) {
      this.saldo -= valor;
      destino.saldo += valor;
    } else {
      this.limiteChequeEspecial -= valor;
      destino.saldo += valor;
    }
  }
}
