import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
  Req,
  Res,
  UseGuards,
} from '@nestjs/common';
import { Roles } from 'src/decorators/role.decorator';
import { CreateTopicDto } from 'src/dtos';
import { AuthGuard } from 'src/guards/auth.guard';
import { RolesGuard } from 'src/guards/roles.guard';
import { ResponseUtils } from 'src/utils';
import { Topic } from './entities/topic.entity';
import { TopicService } from './topic.service';

@Controller('topics')
@UseGuards(AuthGuard, RolesGuard)
export class TopicController {
  constructor(
    private readonly topicService: TopicService,
    private readonly responseUtils: ResponseUtils,
  ) {}

  @Get()
  async getListTopics(@Res() res, @Req() req, @Query() query?) {
    console.log('params1111', query.filter);
    const khoa_id = req.user.khoa_id;
    const viewAll = query.filter?.viewAll == 'true' ? true : false;
    const options = { khoa_id, viewAll };
    if (query?.semester_id) {
      options['semester_id'] = query.semester_id;
    }

    if (query.filter?.status) {
      options['status'] = query.filter.status;
    }

    const data = await this.topicService.getLists(options);
    return this.responseUtils.success({ data }, res);
  }

  @Post()
  async createTopic(@Body() topic: CreateTopicDto, @Res() res, @Req() req) {
    const khoa_id = req.user.khoa_id;
    const teacher_id = req.user.id;
    const data = await this.topicService.create({
      ...topic,
      khoa_id,
      teacher_id,
    });
    console.log('topic data create', data);
    return this.responseUtils.success({ data }, res);
  }

  @Get('registed')
  async getTopicRegistedDetail(@Res() res) {
    const data = await this.topicService.getRegistedDetail();
    console.log('topic data', data);

    return this.responseUtils.success({ data }, res);
  }

  @Get(':id')
  async getTopicById(@Param() id: number, @Res() res) {
    console.log('topic id', id);

    const data = await this.topicService.findOne({ id });
    console.log('topic data', data);
    return this.responseUtils.success({ data }, res);
  }

  @Put(':id')
  async updateTopic(
    @Param() id: number,
    @Body() topic: CreateTopicDto,
    @Res() res,
  ) {
    const data = await this.topicService.update(id, topic as Topic);
    console.log('topic data', data);
    return this.responseUtils.success({ data }, res);
  }

  @Post(':id/:status')
  @Roles('super_teacher')
  async activeTopic(
    @Param('id') id: number,
    @Param('status') status: string,
    @Res() res,
  ) {
    console.log('topic id', id);

    const data = await this.topicService.checkTopic(id, status);
    console.log('topic data', data);
    return this.responseUtils.success({ data }, res);
  }

  @Delete(':id')
  async deleteTopic(@Param('id') id: number, @Res() res) {
    const data = await this.topicService.delete(id);
    return this.responseUtils.success({ data }, res);
  }
}
