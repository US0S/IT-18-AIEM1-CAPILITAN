import { jest } from '@jest/globals';
import { NotFoundException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { StudentsService } from './students.service';
import { PrismaService } from '../prisma/prisma.service';

const asyncMock = () => jest.fn<(...args: unknown[]) => Promise<unknown>>();

describe('StudentsService', () => {
  let service: StudentsService;
  const prisma = {
    student: {
      create: asyncMock(),
      findMany: asyncMock(),
      findUnique: asyncMock(),
      update: asyncMock(),
      delete: asyncMock(),
    },
  };

  beforeEach(async () => {
    jest.clearAllMocks();

    const module: TestingModule = await Test.createTestingModule({
      providers: [StudentsService, { provide: PrismaService, useValue: prisma }],
    }).compile();

    service = module.get<StudentsService>(StudentsService);
  });

  it('creates and lists students', async () => {
    const student = { id: 3, name: 'Maria', programId: 1 };
    prisma.student.create.mockResolvedValue(student);
    prisma.student.findMany.mockResolvedValue([student]);

    await expect(
      service.createStudents({ name: student.name, programId: student.programId }),
    ).resolves.toBe(student);
    expect(prisma.student.create).toHaveBeenCalledWith({
      data: { name: student.name, programId: student.programId },
    });

    await expect(service.findAllStudents()).resolves.toEqual([student]);
  });

  it('finds a student by ID and reports when the student is missing', async () => {
    const student = { id: 3, name: 'Maria', programId: 1 };
    prisma.student.findUnique.mockResolvedValueOnce(student).mockResolvedValueOnce(null);

    await expect(service.findOneStudent(3)).resolves.toBe(student);
    expect(prisma.student.findUnique).toHaveBeenLastCalledWith({
      where: { id: 3 },
    });
    await expect(service.findOneStudent(99)).rejects.toThrow(NotFoundException);
  });

  it('updates an existing student', async () => {
    const student = { id: 3, name: 'Maria', programId: 1 };
    prisma.student.findUnique.mockResolvedValue(student);
    prisma.student.update.mockResolvedValue({ ...student, name: 'Maria Updated' });

    await expect(
      service.updateStudent(3, { name: 'Maria Updated' }),
    ).resolves.toMatchObject({ name: 'Maria Updated' });
    expect(prisma.student.update).toHaveBeenCalledWith({
      where: { id: 3 },
      data: { name: 'Maria Updated' },
    });
  });

  it('deletes an existing student and returns a success message', async () => {
    const student = { id: 3, name: 'Maria', programId: 1 };
    prisma.student.findUnique.mockResolvedValue(student);
    prisma.student.delete.mockResolvedValue(student);

    await expect(service.deleteStudent(3)).resolves.toEqual({
      success: true,
      message: 'Student with ID 3 has been deleted',
      data: student,
    });
    expect(prisma.student.delete).toHaveBeenCalledWith({ where: { id: 3 } });
  });
});
