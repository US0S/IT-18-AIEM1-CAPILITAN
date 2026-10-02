import { jest } from '@jest/globals';
import { Test, TestingModule } from '@nestjs/testing';
import { RemarksController } from './remarks.controller';
import { RemarksGlobalController } from './remarks-global.controller';
import { RemarksService } from './remarks.service';

describe('RemarksController', () => {
  let controller: RemarksController;
  let globalController: RemarksGlobalController;
  const service = {
    createRemark: jest.fn(),
    findAllRemarks: jest.fn(),
    findOneRemark: jest.fn(),
    updateRemark: jest.fn(),
    deleteRemark: jest.fn(),
    getAllStudentsRemarks: jest.fn(),
    findOneStudentRemarks: jest.fn(),
    findOneStudentRemarksId: jest.fn(),
    createStudentRemarkWithId: jest.fn(),
    updateStudentRemark: jest.fn(),
    updateStudentAndRemark: jest.fn(),
    updateStudentRemarkPut: jest.fn(),
    updateStudentAndRemarkPut: jest.fn(),
    deleteRemarkStudent: jest.fn(),
    deleteStudentAndRemark: jest.fn(),
  };

  beforeEach(async () => {
    jest.clearAllMocks();

    const module: TestingModule = await Test.createTestingModule({
      controllers: [RemarksController, RemarksGlobalController],
      providers: [{ provide: RemarksService, useValue: service }],
    }).compile();

    controller = module.get<RemarksController>(RemarksController);
    globalController = module.get<RemarksGlobalController>(
      RemarksGlobalController,
    );
  });

  it('forwards global remark CRUD operations', () => {
    const createDto = { studentId: 1, content: 'Good work' };
    const updateDto = { content: 'Excellent work' };

    globalController.createRemark(createDto);
    globalController.findAllRemarks();
    globalController.findOneRemark('5');
    globalController.updateRemark('5', updateDto);
    globalController.deleteRemark('5');

    expect(service.createRemark).toHaveBeenCalledWith(createDto);
    expect(service.findAllRemarks).toHaveBeenCalled();
    expect(service.findOneRemark).toHaveBeenCalledWith(5);
    expect(service.updateRemark).toHaveBeenCalledWith(5, updateDto);
    expect(service.deleteRemark).toHaveBeenCalledWith(5);
  });

  it('forwards all-student and student-specific remark routes', () => {
    const createDto = { content: 'Good work' };
    const updateDto = { content: 'Excellent work' };

    controller.getAllStudentsRemarks();
    controller.getOneStudentRemarks(1);
    controller.getOneStudentRemarksId(1, 5);
    controller.createStudentRemark(1, { ...createDto, studentId: 1 });
    controller.createStudentRemarkWithId(1, createDto);
    controller.updateStudentRemark(5, updateDto);
    controller.updateStudentAndRemark(1, 5, updateDto);
    controller.updateStudentRemarkPut(5, updateDto);
    controller.updateStudentAndRemarkPut(1, 5, updateDto);
    controller.deleteStudentRemark(5);
    controller.deleteStudentAndRemark(1, 5);

    expect(service.getAllStudentsRemarks).toHaveBeenCalled();
    expect(service.findOneStudentRemarks).toHaveBeenCalledWith(1);
    expect(service.findOneStudentRemarksId).toHaveBeenCalledWith(1, 5);
    expect(service.createRemark).toHaveBeenCalledWith({
      content: 'Good work',
      studentId: 1,
    });
    expect(service.createStudentRemarkWithId).toHaveBeenCalledWith(
      1,
      createDto,
    );
    expect(service.updateStudentRemark).toHaveBeenCalledWith(5, updateDto);
    expect(service.updateStudentAndRemark).toHaveBeenCalledWith(
      1,
      5,
      updateDto,
    );
    expect(service.updateStudentRemarkPut).toHaveBeenCalledWith(5, updateDto);
    expect(service.updateStudentAndRemarkPut).toHaveBeenCalledWith(
      1,
      5,
      updateDto,
    );
    expect(service.deleteRemarkStudent).toHaveBeenCalledWith(5);
    expect(service.deleteStudentAndRemark).toHaveBeenCalledWith(1, 5);
  });
});
