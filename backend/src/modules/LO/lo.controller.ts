import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Req,
  Res,
  UseGuards,
} from '@nestjs/common';
import { Roles } from 'src/decorators/role.decorator';
import { CreateLODto } from 'src/dtos';
import { AuthGuard } from 'src/modules/Auth/guards/auth.guard';
import { RolesGuard } from 'src/modules/Auth/guards/roles.guard';
import { ResponseUtils } from 'src/utils';
import { LO } from './entity/lo.entity';
import { LOService } from './lo.service';

@Controller('los')
@UseGuards(AuthGuard, RolesGuard)
export class LOController {
  constructor(
    private readonly loService: LOService,
    private readonly responseUtils: ResponseUtils,
  ) {}

  @Get()
  async getListLOs(@Res() res) {
    const data = await this.loService.getLists({});
    return this.responseUtils.success({ data }, res);
  }

  @Roles('super_teacher')
  @Post()
  async createLO(@Body() lo: CreateLODto, @Res() res, @Req() req) {
    const khoa_id = req.user.khoa_id;
    const data = await this.loService.create({ ...lo, khoa_id });
    return this.responseUtils.success({ data }, res);
  }

  @Get(':id')
  async getLOById(@Param() id: number, @Res() res) {
    console.log('lo id', id);

    const data = await this.loService.findOne({ id });
    return this.responseUtils.success({ data }, res);
  }

  @Roles('super_teacher')
  @Put(':id')
  async updateLO(@Param('id') id: number, @Body() lo: CreateLODto, @Res() res) {
    console.log('lo id', id);

    const data = await this.loService.update(id, lo as LO);
    return this.responseUtils.success({ data }, res);
  }

  @Delete(':id')
  async deleteLO(@Param('id') id: number, @Res() res) {
    console.log('lo id', id);

    const data = await this.loService.delete(id);
    return this.responseUtils.success({ data }, res);
  }
}
