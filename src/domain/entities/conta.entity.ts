import { TipoConta } from '../enums/tipo-conta.enum';

import { ContaInterface } from '../interfaces/conta.interface';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Cliente } from './cliente.entity';
import { Pagamento } from './pagamento.entity';

@Entity('Contas')
export abstract class Conta implements ContaInterface {
  @PrimaryGeneratedColumn('uuid')
  @ManyToOne(() => Cliente, (cliente) => cliente.contas)
  @JoinColumn()
  public id: string;

  @Column()
  public saldo: number;

  @Column()
  public tipo: TipoConta;

  // @OneToMany(() => Pagamento, (pagamento) => pagamento)
  // transacoes: Pagamento[];
  @ManyToOne(() => Cliente, (cliente) => cliente.contas)
  public cliente: Cliente;

  constructor(saldo: number, cliente: Cliente, tipo: TipoConta, id?: string) {
    this.saldo = saldo;
    this.cliente = cliente;
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
