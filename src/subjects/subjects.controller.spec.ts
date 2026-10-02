import { jest } from '@jest/globals';
import { Test, TestingModule } from '@nestjs/testing';
import { SubjectsController } from './subjects.controller';
import { SubjectsGlobalController } from './subjects-global.controller';
import { SubjectsService } from './subjects.service';

describe('SubjectsController', () => {
  let controller: SubjectsController;
  let globalController: SubjectsGlobalController;
  const service = {
    create: jest.fn(),
    findAll: jest.fn(),
    findOne: jest.fn(),
    update: jest.fn(),
    remove: jest.fn(),
    getAllSubjectPrograms: jest.fn(),
    findOneSubjectPrograms: jest.fn(),
    findOneSubjectProgramsId: jest.fn(),
    createSubjectProgram: jest.fn(),
    createSubjectProgramWithId: jest.fn(),
    updateSubjectProgram: jest.fn(),
    updateSubjectAndProgram: jest.fn(),
    updateSubjectProgramPut: jest.fn(),
    updateSubjectAndProgramPut: jest.fn(),
    deleteSubjectProgram: jest.fn(),
    deleteSubjectAndProgram: jest.fn(),
  };

  beforeEach(async () => {
    jest.clearAllMocks();

    const module: TestingModule = await Test.createTestingModule({
      controllers: [SubjectsController, SubjectsGlobalController],
      providers: [{ provide: SubjectsService, useValue: service }],
    }).compile();

    controller = module.get<SubjectsController>(SubjectsController);
    globalController = module.get<SubjectsGlobalController>(
      SubjectsGlobalController,
    );
  });

  it('forwards global subject CRUD operations', () => {
    const createDto = { description: 'Programming', programId: 1 };
    const updateDto = { description: 'Advanced programming' };

    globalController.create(createDto);
    globalController.findAll();
    globalController.findOne('4');
    globalController.update('4', updateDto);
    globalController.remove('4');

    expect(service.create).toHaveBeenCalledWith(createDto);
    expect(service.findAll).toHaveBeenCalled();
    expect(service.findOne).toHaveBeenCalledWith(4);
    expect(service.update).toHaveBeenCalledWith(4, updateDto);
    expect(service.remove).toHaveBeenCalledWith(4);
  });

  it('forwards subject routes nested under a program', () => {
    const createDto = { description: 'Programming', programId: 1 };
    const updateDto = { description: 'Advanced programming' };

    controller.getAllSubjectPrograms();
    controller.getOneSubjectPrograms(1);
    controller.findOneSubjectProgramsId(1, 4);
    controller.createSubjectProgram(1, createDto);
    controller.createSubjectProgramWithId(1, createDto);
    controller.updateSubjectProgram(4, updateDto);
    controller.updateSubjectAndProgram(1, 4, updateDto);
    controller.updateSubjectProgramPut(4, updateDto);
    controller.updateSubjectAndProgramPut(1, 4, updateDto);
    controller.deleteSubjectProgram(4);
    controller.deleteSubjectAndProgram(1, 4);

    expect(service.getAllSubjectPrograms).toHaveBeenCalled();
    expect(service.findOneSubjectPrograms).toHaveBeenCalledWith(1);
    expect(service.findOneSubjectProgramsId).toHaveBeenCalledWith(1, 4);
    expect(service.createSubjectProgram).toHaveBeenCalledWith(createDto);
    expect(service.createSubjectProgramWithId).toHaveBeenCalledWith(
      1,
      createDto,
    );
    expect(service.updateSubjectProgram).toHaveBeenCalledWith(4, updateDto);
    expect(service.updateSubjectAndProgram).toHaveBeenCalledWith(
      4,
      1,
      updateDto,
    );
    expect(service.updateSubjectProgramPut).toHaveBeenCalledWith(4, updateDto);
    expect(service.updateSubjectAndProgramPut).toHaveBeenCalledWith(
      4,
      1,
      updateDto,
    );
    expect(service.deleteSubjectProgram).toHaveBeenCalledWith(4);
    expect(service.deleteSubjectAndProgram).toHaveBeenCalledWith(4, 1);
  });
});
