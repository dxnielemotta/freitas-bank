import {
  Controller,
  Param,
  HttpException,
  HttpStatus,
  Get,
  Post,
  Body,
} from '@nestjs/common';
import { ContaService } from '../../domain/services/conta.service';
import { TipoPagamento } from '../../domain/enums/tipo-pagamento.enum';

@Controller('contas')
export class ContaController {
  constructor(private readonly contaService: ContaService) {}

  @Get('/')
  async listarContas() {
    try {
      const contas = await this.contaService.listarContas();
      return {
        statusCode: HttpStatus.OK,
        message: 'Contas retornadas com sucesso',
        data: contas,
      };
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }

  @Get(':contaId')
  async obterContaPorId(@Param('contaId') contaId: string) {
    try {
      const conta = await this.contaService.obterConta(contaId);
      return {
        statusCode: HttpStatus.OK,
        message: 'Conta retornada com sucesso',
        data: conta,
      };
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }

  @Post(':contaId/pagar')
  async fazerPagamento(
    @Param('contaId') contaId: string,
    //criar um dto
    @Body('valor') valor: number,
    @Body('tipoPagamento') tipoPagamento: TipoPagamento,
  ) {
    try {
      const pagamento = await this.contaService.fazerPagamento(
        contaId,
        valor,
        tipoPagamento,
      );
      return {
        statusCode: HttpStatus.CREATED,
        message: `Pagamento via ${tipoPagamento} realizado com sucesso!`,
        data: pagamento,
      };
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }
}
