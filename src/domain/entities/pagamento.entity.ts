import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { TipoPagamento } from '../enums/tipo-pagamento.enum';

@Entity()
export class Pagamento {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  tipoPagamento: TipoPagamento;

  // @Column()
  // valor: number;

  // @Column()
  // data: Date;

  // @ManyToOne(() => Conta, (conta) => conta.transacoes)
  // conta: Conta;

  constructor(id: string, tipoPagamento: TipoPagamento) {
    this.tipoPagamento = tipoPagamento;
    if (!id) {
      this.id = id;
    }
  }
}
