import {
  Controller,
  Param,
  Post,
  HttpException,
  HttpStatus,
  Get,
  Body,
  Put,
  Delete,
} from '@nestjs/common';

import { ClienteService } from '../../domain/services/cliente.service';
import { TipoConta } from '../../domain/enums/tipo-conta.enum';
import { TipoPagamento } from '../../domain/enums/tipo-pagamento.enum';
import { CriarClienteDto } from '../dtos/cliente.dto';
import { MudarContaDto } from '../dtos/conta.dto';

@Controller('clientes')
export class ClienteController {
  constructor(private readonly clienteService: ClienteService) {}

  @Post('cadastrar')
  async cadastrarCliente(
    @Body()
    criarClienteDto: CriarClienteDto,
  ) {
    try {
      const cliente =
        await this.clienteService.cadastrarCliente(criarClienteDto);
      return {
        statusCode: HttpStatus.CREATED,
        message: 'Cliente cadastrado com sucesso',
        data: cliente,
      };
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }

  @Get()
  async listarClientes() {
    try {
      const clientes = await this.clienteService.listarClientes();
      return {
        statusCode: HttpStatus.OK,
        message: 'Clientes retornados com sucesso',
        data: clientes,
      };
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }

  @Get(':clienteId')
  async obterCliente(@Param('clienteId') clienteId: string) {
    try {
      const cliente = await this.clienteService.obterCliente(clienteId);
      return {
        statusCode: HttpStatus.OK,
        message: 'Cliente retornado com sucesso',
        data: cliente,
      };
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.NOT_FOUND);
    }
  }

  @Post(':clienteId/:tipoConta')
  async abrirConta(
    @Param('clienteId') clienteId: string,
    @Param('tipoConta') tipo: TipoConta,
  ) {
    try {
      const cliente = await this.clienteService.obterCliente(clienteId);
      await this.clienteService.adicionarContaAoCliente(tipo, cliente);
      return {
        statusCode: HttpStatus.CREATED,
        message: `Conta ${tipo} criada com sucesso`,
      };
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }

  @Put('mudarconta/:contaId')
  async mudarTipoConta(
    @Param('contaId') contaId: string,
    @Body() mudarContaDto: MudarContaDto,
  ) {
    try {
      await this.clienteService.mudarTipoConta(contaId, mudarContaDto.novoTipo);
      return {
        statusCode: HttpStatus.NO_CONTENT,
        message: `Tipo da conta alterado com sucesso`,
      };
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }

  @Delete('excluir/:contaId')
  async fecharConta(@Param('contaId') contaId: string) {
    try {
      await this.clienteService.fecharConta(contaId);
      return {
        statusCode: HttpStatus.NO_CONTENT,
        message: `Conta fechada com sucesso`,
      };
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }

  @Post(':clienteId/contas/:contaId')
  async fazerPagamento(
    @Param('clienteId') clienteId: string,
    @Param('contaId') contaId: string,
    @Body('valor') valor: number,
    @Body('tipoPagamento') tipoPagamento: TipoPagamento,
  ) {
    try {
      await this.clienteService.obterCliente(clienteId);

      const pagamento = await this.clienteService.fazerPagamento(
        contaId,
        valor,
        tipoPagamento,
      );

      return {
        statusCode: HttpStatus.CREATED,
        message: `Pagamento via ${tipoPagamento} no valor de R$ ${valor} realizado com sucesso`,
        data: pagamento,
      };
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }
}
