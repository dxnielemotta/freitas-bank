import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('Gerentes')
export class Gerente {
  @PrimaryGeneratedColumn('uuid')
  public id?: string;

  @Column()
  public nomeCompleto: string;

  constructor(nomeCompleto: string, id?: string) {
    this.nomeCompleto = nomeCompleto;
  }
}
