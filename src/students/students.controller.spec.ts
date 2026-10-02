import { jest } from '@jest/globals';
import { Test, TestingModule } from '@nestjs/testing';
import { StudentsController } from './students.controller';
import { StudentsGlobalController } from './students-global.controller';
import { StudentsService } from './students.service';

describe('StudentsController', () => {
  let controller: StudentsController;
  let globalController: StudentsGlobalController;
  const service = {
    createStudents: jest.fn(),
    findAllStudents: jest.fn(),
    findOneStudent: jest.fn(),
    updateStudent: jest.fn(),
    deleteStudent: jest.fn(),
    getAllStudentPrograms: jest.fn(),
    findOneStudentPrograms: jest.fn(),
    findOneStudentProgramsId: jest.fn(),
    createStudentProgram: jest.fn(),
    createStudentProgramWithId: jest.fn(),
    updateStudentProgram: jest.fn(),
    updateStudentAndProgram: jest.fn(),
    updateStudentProgramPut: jest.fn(),
    updateStudentAndProgramPut: jest.fn(),
    deleteStudentProgram: jest.fn(),
    deleteStudentAndProgram: jest.fn(),
  };

  beforeEach(async () => {
    jest.clearAllMocks();

    const module: TestingModule = await Test.createTestingModule({
      controllers: [StudentsController, StudentsGlobalController],
      providers: [{ provide: StudentsService, useValue: service }],
    }).compile();

    controller = module.get<StudentsController>(StudentsController);
    globalController = module.get<StudentsGlobalController>(
      StudentsGlobalController,
    );
  });

  it('forwards global student CRUD operations', () => {
    const createDto = { name: 'Maria', programId: 1 };
    const updateDto = { name: 'Maria Updated' };

    globalController.createStudents(createDto);
    globalController.findAllStudents();
    globalController.findOneStudent(3);
    globalController.updateStudent(3, updateDto);
    globalController.deletestudent(3);

    expect(service.createStudents).toHaveBeenCalledWith(createDto);
    expect(service.findAllStudents).toHaveBeenCalled();
    expect(service.findOneStudent).toHaveBeenCalledWith(3);
    expect(service.updateStudent).toHaveBeenCalledWith(3, updateDto);
    expect(service.deleteStudent).toHaveBeenCalledWith(3);
  });

  it('forwards nested student routes under a program', () => {
    const createDto = { name: 'Maria', programId: 1 };
    const updateDto = { name: 'Maria Updated' };

    controller.getAllStudentPrograms();
    controller.getOneStudentPrograms(1);
    controller.findOneStudentProgramsId(1, 3);
    controller.createStudentProgram(1, createDto);
    controller.createStudentProgramWithId(1, createDto);
    controller.updateStudentProgram(3, updateDto);
    controller.updateStudentAndProgram(1, 3, updateDto);
    controller.updateStudentProgramPut(3, updateDto);
    controller.updateStudentAndProgramPut(1, 3, updateDto);
    controller.deleteStudentProgram(3);
    controller.deleteStudentAndProgram(1, 3);

    expect(service.getAllStudentPrograms).toHaveBeenCalled();
    expect(service.findOneStudentPrograms).toHaveBeenCalledWith(1);
    expect(service.findOneStudentProgramsId).toHaveBeenCalledWith(1, 3);
    expect(service.createStudentProgram).toHaveBeenCalledWith(createDto);
    expect(service.createStudentProgramWithId).toHaveBeenCalledWith(
      1,
      createDto,
    );
    expect(service.updateStudentProgram).toHaveBeenCalledWith(3, updateDto);
    expect(service.updateStudentAndProgram).toHaveBeenCalledWith(
      3,
      1,
      updateDto,
    );
    expect(service.updateStudentProgramPut).toHaveBeenCalledWith(3, updateDto);
    expect(service.updateStudentAndProgramPut).toHaveBeenCalledWith(
      3,
      1,
      updateDto,
    );
    expect(service.deleteStudentProgram).toHaveBeenCalledWith(3);
    expect(service.deleteStudentAndProgram).toHaveBeenCalledWith(3, 1);
  });
});
