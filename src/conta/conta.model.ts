import { Cliente } from 'src/cliente/cliente.model';
import { TipoConta } from 'src/enums/tipo-conta.enum';
import { v4 as uuidv4 } from 'uuid';

export abstract class Conta {
  constructor(
    public id: string,
    public saldo: number,
    public cliente: Cliente,
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
  constructor(
    id: string,
    saldo: number,
    cliente: Cliente,
    tipo: TipoConta = TipoConta.CORRENTE,
    private limiteChequeEspecial: number = 100,
  ) {
    super(id, saldo, cliente, tipo);
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
    id: string,
    saldo: number,
    cliente: Cliente,
    tipo: TipoConta = TipoConta.POUPANCA,
    private taxaJuros: number = 0.01,
  ) {
    super(id, saldo, cliente, tipo);
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
    if (valor <= this.saldo) {
      return console.log('Saldo insuficiente');
    }
  }
}
