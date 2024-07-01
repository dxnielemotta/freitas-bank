import { v4 as uuidv4 } from 'uuid';

export class Cliente {
  nomeCompleto: string;
  id: string;
  endereco: string;
  telefone: string;
  rendaSalarial: number;
  contas: Conta[];
  gerente: Gerente;

  constructor(
    nomeCompleto: string,
    endereco: string,
    telefone: string,
    rendaSalarial: number,
  ) {
    this.nomeCompleto = nomeCompleto;
    this.id = uuidv4();
    this.endereco = endereco;
    this.telefone = telefone;
    this.rendaSalarial = rendaSalarial;
    this.contas = [];
  }
}
