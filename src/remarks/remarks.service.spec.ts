import { jest } from '@jest/globals';
import { NotFoundException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { RemarksService } from './remarks.service';
import { PrismaService } from '../prisma/prisma.service';

const asyncMock = () => jest.fn<(...args: unknown[]) => Promise<unknown>>();

describe('RemarksService', () => {
  let service: RemarksService;
  const prisma = {
    remark: {
      create: asyncMock(),
      findMany: asyncMock(),
      findUnique: asyncMock(),
      findFirst: asyncMock(),
      update: asyncMock(),
      updateMany: asyncMock(),
      delete: asyncMock(),
      deleteMany: asyncMock(),
    },
    student: {
      findUnique: asyncMock(),
    },
  };

  beforeEach(async () => {
    jest.clearAllMocks();

    const module: TestingModule = await Test.createTestingModule({
      providers: [RemarksService, { provide: PrismaService, useValue: prisma }],
    }).compile();

    service = module.get<RemarksService>(RemarksService);
  });

  it('creates a remark with the provided student and content', async () => {
    const remark = { id: 4, studentId: 2, content: 'Good work' };
    prisma.remark.create.mockResolvedValue(remark);

    await expect(
      service.createRemark({ studentId: 2, content: 'Good work' }),
    ).resolves.toBe(remark);
    expect(prisma.remark.create).toHaveBeenCalledWith({
      data: { studentId: 2, content: 'Good work' },
    });
  });

  it('lists remarks and lists student remarks with their student relation', async () => {
    prisma.remark.findMany.mockResolvedValue([]);

    await service.findAllRemarks();
    expect(prisma.remark.findMany).toHaveBeenLastCalledWith();

    await service.getAllStudentsRemarks();
    expect(prisma.remark.findMany).toHaveBeenLastCalledWith({
      include: { Student: true },
      orderBy: { createdAt: 'desc' },
    });
  });

  it('returns a remark with its student and reports a missing remark', async () => {
    const remark = { id: 4, studentId: 2, content: 'Good work' };
    prisma.remark.findUnique.mockResolvedValueOnce(remark).mockResolvedValueOnce(null);

    await expect(service.findOneRemark(4)).resolves.toBe(remark);
    expect(prisma.remark.findUnique).toHaveBeenLastCalledWith({
      where: { id: 4 },
      include: { Student: true },
    });
    await expect(service.findOneRemark(99)).rejects.toThrow(NotFoundException);
  });

  it('updates an existing remark', async () => {
    const remark = { id: 4, studentId: 2, content: 'Good work' };
    prisma.remark.findUnique.mockResolvedValue(remark);
    prisma.remark.update.mockResolvedValue({
      ...remark,
      content: 'Excellent work',
    });

    await expect(
      service.updateRemark(4, { content: 'Excellent work' }),
    ).resolves.toMatchObject({ content: 'Excellent work' });
    expect(prisma.remark.update).toHaveBeenCalledWith({
      where: { id: 4 },
      data: { content: 'Excellent work' },
    });
  });

  it('deletes an existing remark and returns a success message', async () => {
    const remark = { id: 4, studentId: 2, content: 'Good work' };
    prisma.remark.findUnique.mockResolvedValue(remark);
    prisma.remark.delete.mockResolvedValue(remark);

    await expect(service.deleteRemark(4)).resolves.toEqual({
      success: true,
      message: 'Remark with ID 4 has been deleted',
      data: remark,
    });
    expect(prisma.remark.delete).toHaveBeenCalledWith({ where: { id: 4 } });
  });

  it('verifies the student and filters student remarks by ID', async () => {
    prisma.student.findUnique.mockResolvedValue({
      id: 2,
      name: 'Maria',
      programId: 1,
    });
    prisma.remark.findMany.mockResolvedValue([]);

    await service.findOneStudentRemarks(2);

    expect(prisma.student.findUnique).toHaveBeenCalledWith({
      where: { id: 2 },
    });
    expect(prisma.remark.findMany).toHaveBeenCalledWith({
      where: { studentId: 2 },
      include: { Student: true },
      orderBy: { createdAt: 'desc' },
    });
  });
});
