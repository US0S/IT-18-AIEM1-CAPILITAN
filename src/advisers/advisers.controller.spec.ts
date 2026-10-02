import { jest } from '@jest/globals';
import { Test, TestingModule } from '@nestjs/testing';
import { AdvisersController } from './advisers.controller';
import { AdvisersGlobalController } from './advisers-global.controller';
import { AdvisersService } from './advisers.service';

describe('AdvisersController', () => {
  let controller: AdvisersController;
  let globalController: AdvisersGlobalController;
  const service = {
    createAdviser: jest.fn(),
    findAllAdvisers: jest.fn(),
    findOneAdviser: jest.fn(),
    updateAdviser: jest.fn(),
    removeAdviser: jest.fn(),
    getAllAdviserPrograms: jest.fn(),
    findOneAdviserPrograms: jest.fn(),
    findOneAdviserProgramsId: jest.fn(),
    createAdviserProgram: jest.fn(),
    createAdviserProgramWithId: jest.fn(),
    updateAdviserProgram: jest.fn(),
    updateAdviserAndProgram: jest.fn(),
    updateAdviserProgramPut: jest.fn(),
    updateAdviserAndProgramPut: jest.fn(),
    deleteAdviserProgram: jest.fn(),
    deleteAdviserAndProgram: jest.fn(),
  };

  beforeEach(async () => {
    jest.clearAllMocks();

    const module: TestingModule = await Test.createTestingModule({
      controllers: [AdvisersController, AdvisersGlobalController],
      providers: [{ provide: AdvisersService, useValue: service }],
    }).compile();

    controller = module.get<AdvisersController>(AdvisersController);
    globalController = module.get<AdvisersGlobalController>(
      AdvisersGlobalController,
    );
  });

  it('creates, lists, finds, updates, and deletes global advisers', () => {
    const createDto = { name: 'Alex Adviser' };
    const updateDto = { name: 'Alex Updated' };

    globalController.createAdviser(createDto);
    globalController.findAllAdvisers();
    globalController.findOne('3');
    globalController.update('3', updateDto);
    globalController.updatePut('3', updateDto);
    globalController.removeAdviser('3');

    expect(service.createAdviser).toHaveBeenCalledWith(createDto);
    expect(service.findAllAdvisers).toHaveBeenCalled();
    expect(service.findOneAdviser).toHaveBeenCalledWith(3);
    expect(service.updateAdviser).toHaveBeenCalledWith(3, updateDto);
    expect(service.removeAdviser).toHaveBeenCalledWith(3);
  });

  it('handles nested adviser routes under a program', () => {
    const createDto = { name: 'Alex Adviser', programId: 2 };
    const updateDto = { name: 'Alex Updated' };

    controller.getAllAdviserPrograms();
    controller.getOneAdviserPrograms('2');
    controller.findOneAdviserProgramsId('2', '4');
    controller.createAdviserProgram('2', createDto);
    controller.createAdviserProgramWithId('2', '4', createDto);
    controller.updateAdviserProgram('4', updateDto);
    controller.updateAdviserAndProgram('2', '4', updateDto);
    controller.updateAdviserProgramPut('4', updateDto);
    controller.updateAdviserAndProgramPut('2', '4', updateDto);
    controller.deleteAdviserProgram('4');
    controller.deleteAdviserAndProgram('2', '4');

    expect(service.getAllAdviserPrograms).toHaveBeenCalled();
    expect(service.findOneAdviserPrograms).toHaveBeenCalledWith(2);
    expect(service.findOneAdviserProgramsId).toHaveBeenCalledWith(2, 4);
    expect(service.createAdviserProgram).toHaveBeenCalledWith(2, createDto);
    expect(service.createAdviserProgramWithId).toHaveBeenCalledWith(
      2,
      createDto,
    );
    expect(service.updateAdviserProgram).toHaveBeenCalledWith(4, updateDto);
    expect(service.updateAdviserAndProgram).toHaveBeenCalledWith(
      4,
      2,
      updateDto,
    );
    expect(service.updateAdviserProgramPut).toHaveBeenCalledWith(4, updateDto);
    expect(service.updateAdviserAndProgramPut).toHaveBeenCalledWith(
      4,
      2,
      updateDto,
    );
    expect(service.deleteAdviserProgram).toHaveBeenCalledWith(4);
    expect(service.deleteAdviserAndProgram).toHaveBeenCalledWith(4, 2);
  });
});
