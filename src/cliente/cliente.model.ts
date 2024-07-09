import { v4 as uuidv4 } from 'uuid';

export class Cliente {
  public id: string;

  constructor(
    public nomeCompleto: string,
    public endereco: string,
    public telefone: string,
    public rendaSalarial: number,
    public gerenteID: string,
  ) {
    this.id = uuidv4();
  }
}
