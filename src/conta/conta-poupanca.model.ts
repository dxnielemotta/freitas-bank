import { TipoConta } from 'src/enums/tipo-conta.enum';
import { Conta } from './conta.entity';

export class ContaPoupanca extends Conta {
  private taxaJuros: number = 0.01;

  constructor(saldo: number, clienteID: string) {
    super(saldo, clienteID, TipoConta.POUPANCA);
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
