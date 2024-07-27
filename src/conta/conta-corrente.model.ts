import { TipoConta } from 'src/enums/tipo-conta.enum';
import { Conta } from './conta.model';

export class ContaCorrente extends Conta {
  private limiteChequeEspecial: number = 100;

  constructor(saldo: number, clienteID: string) {
    super(saldo, clienteID, TipoConta.CORRENTE);
  }

  verificarSaldoInsuficiente(valor: number): void {
    if (valor > this.saldo + this.limiteChequeEspecial) {
      throw new Error('Saldo insuficiente');
    }
  }

  transferir(destino: Conta, valor: number): void {
    let saldoTotal = this.saldo + this.limiteChequeEspecial;

    this.verificarSaldoInsuficiente(valor);

    saldoTotal -= valor;
    destino.saldo += valor;
  }
}
