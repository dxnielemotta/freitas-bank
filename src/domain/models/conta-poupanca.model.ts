import { TipoConta } from '../enums/tipo-conta.enum';
import { Conta } from '../entities/conta.entity';
import { Cliente } from '../entities/cliente.entity';

export class ContaPoupanca extends Conta {
  private taxaJuros: number = 0.01;

  constructor(saldo: number, cliente: Cliente) {
    super(saldo, cliente, TipoConta.POUPANCA);
  }

  sacar(valor: number): void {
    this.verificarSaldoInsuficiente(valor);
    this.saldo -= valor;
  }

  transferir(destino: Conta, valor: number): void {
    this.verificarSaldoInsuficiente(valor);
    this.saldo -= valor;
    destino.saldo += valor;
  }

  calcularTaxa(): number {
    return this.saldo * this.taxaJuros;
  }

  verificarSaldoInsuficiente(valor: number): void {
    if (valor > this.saldo) {
      throw new Error('Saldo insuficiente');
    }
  }
}
