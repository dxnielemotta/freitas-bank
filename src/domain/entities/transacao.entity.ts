import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { TIpoTransacao } from '../enums/tipo-transacao.enum';
import { Conta } from './conta.entity';

@Entity()
export class Transacao {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  tipoTransacao: TIpoTransacao;

  // @ManyToOne(() => Conta, (conta) => conta.transacoes)
  // conta: Conta;

  @Column()
  data: Date;

  constructor(id: string, tipoTransacao: TIpoTransacao) {
    tipoTransacao = this.tipoTransacao;
    if (!id) {
      this.id = id;
    }
  }
}
