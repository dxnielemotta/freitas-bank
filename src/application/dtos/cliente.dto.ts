import { Gerente } from 'src/domain/entities/gerente.entity';

export class CriarClienteDto {
  nomeCompleto: string;
  endereco: string;
  telefone: string;
  rendaSalarial: number;
  gerente: Gerente;

  // constructor(
  //   nomeCompleto: string,
  //   endereco: string,
  //   telefone: string,
  //   rendaSalarial: number,
  //   gerenteId: string,
  // ) {
  //   this.nomeCompleto = nomeCompleto;
  //   this.endereco = endereco;
  //   this.telefone = telefone;
  //   this.rendaSalarial = rendaSalarial;
  //   this.gerenteId = gerenteId;
  // }
}
