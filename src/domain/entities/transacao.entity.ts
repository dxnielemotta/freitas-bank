import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { TipoTransacao } from '../enums/tipo-transacao.enum';
import { Conta } from './conta.entity';

@Entity('Transações')
export class Transacao {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  tipoTransacao: TipoTransacao;

  @Column()
  valor: number;

  @ManyToOne(() => Conta, (conta) => conta.transacoes, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'conta_id' })
  conta: Conta;

  @Column()
  data: Date;

  constructor(tipoTransacao: TipoTransacao, valor: number, conta: Conta) {
    this.tipoTransacao = tipoTransacao;
    this.valor = valor;
    this.data = new Date();
    this.conta = conta;
  }
}
