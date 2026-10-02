import { jest } from '@jest/globals';
import { Test, TestingModule } from '@nestjs/testing';
import { ProgramsController } from './programs.controller';
import { ProgramsService } from './programs.service';

describe('ProgramsController', () => {
  let controller: ProgramsController;
  let service: {
    create: jest.Mock;
    findAll: jest.Mock;
    findOne: jest.Mock;
    update: jest.Mock;
    remove: jest.Mock;
  };

  beforeEach(async () => {
    service = {
      create: jest.fn(),
      findAll: jest.fn(),
      findOne: jest.fn(),
      update: jest.fn(),
      remove: jest.fn(),
    };

    const module: TestingModule = await Test.createTestingModule({
      controllers: [ProgramsController],
      providers: [{ provide: ProgramsService, useValue: service }],
    }).compile();

    controller = module.get<ProgramsController>(ProgramsController);
  });

  it('forwards CRUD operations and parsed IDs to the service', () => {
    const createDto = { name: 'Computer Science' };
    const updateDto = { name: 'Information Technology' };

    controller.create(createDto);
    controller.findAll();
    controller.findOne(3);
    controller.update(3, updateDto);
    controller.remove(3);

    expect(service.create).toHaveBeenCalledWith(createDto);
    expect(service.findAll).toHaveBeenCalled();
    expect(service.findOne).toHaveBeenCalledWith(3);
    expect(service.update).toHaveBeenCalledWith(3, updateDto);
    expect(service.remove).toHaveBeenCalledWith(3);
  });
});
