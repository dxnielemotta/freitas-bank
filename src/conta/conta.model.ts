import { TipoConta } from 'src/enums/tipo-conta.enum';
import { v4 as uuidv4 } from 'uuid';

export abstract class Conta {
  public id: string;
  constructor(
    public saldo: number,
    public clienteID: string,
    public tipo: TipoConta,
  ) {
    this.id = uuidv4();
  }

  depositar(valor: number): void {
    this.saldo += valor;
  }

  sacar(valor: number): void {
    this.verificarSaldoInsuficiente(valor);
    this.saldo -= valor;
  }

  abstract verificarSaldoInsuficiente(valor: number): void;

  abstract transferir(destino: Conta, valor: number): void;
}

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
