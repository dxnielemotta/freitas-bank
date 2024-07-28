import { Conta } from './conta.entity';

export interface ContaInterface {
  depositar(valor: number): void;
  sacar(valor: number): void;
  transferir(destino: Conta, valor: number): void;
}
