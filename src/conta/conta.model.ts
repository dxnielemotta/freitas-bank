import { TipoConta } from 'src/enums/tipo-conta.enum';
import { v4 as uuidv4 } from 'uuid';
import { ContaInterface } from './conta.interface';

export abstract class Conta implements ContaInterface {
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
