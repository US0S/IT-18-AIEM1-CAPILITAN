import { Test, TestingModule } from '@nestjs/testing';
import { AdvisersController } from './advisers.controller';
import { AdvisersService } from './advisers.service';

describe('AdvisersController', () => {
  let controller: AdvisersController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AdvisersController],
      providers: [AdvisersService],
    }).compile();

    controller = module.get<AdvisersController>(AdvisersController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
