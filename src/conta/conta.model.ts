import { Cliente } from 'src/cliente/cliente.model';

export abstract class Conta {
  public idCliente: string;

  constructor(
    public saldo: number,
    public cliente: Cliente,
    public tipo: 'corrente' | 'poupanca',
  ) {
    this.saldo = saldo;
    this.idCliente = cliente.id;
    this.tipo = tipo;
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
  constructor(
    saldo: number,
    cliente: Cliente,
    tipo: 'corrente',
    private limiteChequeEspecial: number,
  ) {
    super(saldo, cliente, tipo);
  }

  verificarSaldoInsuficiente(valor: number): void {
    if (valor <= this.saldo + this.limiteChequeEspecial) {
      return console.log('Saldo insuficiente');
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
  constructor(
    saldo: number,
    cliente: Cliente,
    tipo: 'poupanca',
    private taxaJuros: number,
  ) {
    super(saldo, cliente, tipo);
  }

  transferir(destino: Conta, valor: number): void {
    if (valor <= this.saldo) {
      this.sacar(valor);
      destino.depositar(valor);
    } else {
      throw new Error('Saldo insuficiente');
    }

    this.verificarSaldoInsuficiente(valor);
    this.saldo -= valor;
    destino.saldo += valor;
  }

  calcularTaxa(): number {
    return this.saldo * this.taxaJuros;
  }

  verificarSaldoInsuficiente(valor: number): void {
    if (valor <= this.saldo) {
      return console.log('Saldo insuficiente');
    }
  }
}
