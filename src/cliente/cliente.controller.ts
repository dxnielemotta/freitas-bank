import { Controller, Get, Post, Body, Param } from '@nestjs/common';
import { ClienteService } from './cliente.service';
import { Cliente } from './cliente.model';

@Controller('clientes')
export class ClienteController {
  constructor(private readonly clienteService: ClienteService) {}

  @Get()
  listarClientes(): Cliente[] {
    return this.clienteService.listarClientes();
  }

  @Get(':id')
  obterCliente(@Param('id') id: string): Cliente {
    return this.clienteService.obterCliente(id);
  }

  @Post('cadastrar')
  cadastrarCliente(
    @Body('nomeCompleto') nomeCompleto: string,
    @Body('endereco') endereco: string,
    @Body('telefone') telefone: string,
    @Body('rendaSalarial') rendaSalarial: number,
  ): Cliente {
    return this.clienteService.cadastrarCliente(
      nomeCompleto,
      endereco,
      telefone,
      rendaSalarial,
    );
  }
}
