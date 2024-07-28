import { TipoConta } from 'src/enums/tipo-conta.enum';

import { ContaInterface } from './conta.interface';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Cliente } from 'src/cliente/cliente.entity';

@Entity('Contas')
export abstract class Conta implements ContaInterface {
  @PrimaryGeneratedColumn('uuid')
  public id: string;

  @Column()
  public saldo: number;

  @Column()
  public tipo: TipoConta;

  @ManyToOne(() => Cliente)
  @JoinColumn()
  public clienteID: string;

  constructor(saldo: number, clienteID: string, tipo: TipoConta, id?: string) {
    this.saldo = saldo;
    this.clienteID = clienteID;
    this.tipo = tipo;

    if (!id) {
      this.id = id;
    }
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
