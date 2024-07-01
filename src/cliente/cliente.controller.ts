import { Body, Controller, HttpStatus, Post } from '@nestjs/common';
import { ClientesService } from './cliente.service';

@Controller('clientes')
export class ClientesController {
  constructor(private readonly clienteService: ClientesService) {}

  @Post('cadastrar')
  abrirConta(
    @Body()
    body: {
      nomeCompleto: string;
      endereco: string;
      telefone: string;
      rendaSalarial: number;
    },
  ) {
    const cliente = this.clienteService.cadastrarCliente(
      body.nomeCompleto,
      body.endereco,
      body.telefone,
      body.rendaSalarial,
    );
    return {
      statusCode: HttpStatus.CREATED,
      message: 'Cliente cadastrado com sucesso',
      data: cliente,
    };
  }
}
