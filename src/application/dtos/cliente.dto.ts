import { Conta } from 'src/domain/entities/conta.entity';

export class CriarClienteDto {
  nomeCompleto: string;
  endereco: string;
  telefone: string;
  rendaSalarial: number;
  contas: Conta[];
  gerenteId: string;

  constructor(
    nomeCompleto: string,
    endereco: string,
    telefone: string,
    contas: Conta[],
    gerenteId: string,
  ) {
    this.nomeCompleto = nomeCompleto;
    this.endereco = endereco;
    this.telefone = telefone;
    this.contas = contas;
    this.gerenteId = gerenteId;
  }
}
