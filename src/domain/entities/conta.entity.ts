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
import { Transacao } from './transacao.entity';

@Entity('Contas')
export abstract class Conta implements ContaInterface {
  @PrimaryGeneratedColumn('uuid')
  public id: string;

  @Column()
  public saldo: number;

  @Column()
  public tipo: TipoConta;

  @ManyToOne(() => Cliente, (cliente) => cliente.contas)
  @JoinColumn({ name: 'cliente_id' })
  public cliente: Cliente;

  @OneToMany(() => Pagamento, (pagamento) => pagamento.conta, { cascade: true })
  pagamentos: Pagamento[];

  @OneToMany(() => Transacao, (transacao) => transacao.conta, { cascade: true })
  transacoes: Transacao[];

  constructor(
    saldo: number,
    cliente: Cliente,
    tipo: TipoConta,
    // pagamentos: Pagamento[],
  ) {
    this.saldo = saldo;
    this.cliente = cliente;
    this.tipo = tipo;
    // this.pagamentos = pagamentos;
  }

  depositar(valor: number): void {
    this.saldo += valor;
  }

  sacar(valor: number): void {
    // this.verificarSaldoInsuficiente(valor);
    if (valor > this.saldo) {
      throw new Error('Saldo insuficiente');
    }
    this.saldo -= valor;
  }
}
