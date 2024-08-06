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
  listarContas() {
    try {
      const contas = this.contaService.listarContas();
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
  obterContaPorId(@Param('contaId') contaId: string) {
    try {
      const conta = this.contaService.obterConta(contaId);
      if (!conta) {
        throw new Error('Conta não encontrada');
      }
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
  fazerPagamento(
    @Param('contaId') contaId: string,
    //criar um dto
    @Body('valor') valor: number,
    @Body('tipoPagamento') tipoPagamento: TipoPagamento,
  ) {
    try {
      this.contaService.fazerPagamento(contaId, valor, tipoPagamento);
      return {
        statusCode: HttpStatus.CREATED,
        message: `Pagamento via ${tipoPagamento} realizado com sucesso!`,
      };
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }
}
