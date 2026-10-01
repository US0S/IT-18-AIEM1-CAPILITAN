import { Test, TestingModule } from '@nestjs/testing';
import { SubjectsService } from './subjects.service';
import { PrismaService } from '../prisma/prisma.service';
import { NotFoundException } from '@nestjs/common';

describe('SubjectsService', () => {
  let service: SubjectsService;
  const prisma = {
    program: {
      findUnique: jest.fn(),
    },
    subject: {
      create: jest.fn(),
      findMany: jest.fn(),
      findUnique: jest.fn(),
      update: jest.fn(),
      delete: jest.fn(),
    },
  };

  beforeEach(async () => {
    jest.clearAllMocks();

    const module: TestingModule = await Test.createTestingModule({
      providers: [SubjectsService, { provide: PrismaService, useValue: prisma }],
    }).compile();

    service = module.get<SubjectsService>(SubjectsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('creates a subject connected to its program', async () => {
    const subject = {
      id: 1,
      description: 'Introduction to programming',
      programId: 2,
    };
    prisma.program.findUnique.mockResolvedValue({
      id: subject.programId,
      name: 'Computer Science',
    });
    prisma.subject.create.mockResolvedValue(subject);

    await expect(
      service.create({
        description: subject.description,
        programId: subject.programId,
      }),
    ).resolves.toBe(subject);
    expect(prisma.subject.create).toHaveBeenCalledWith({
      data: {
        description: subject.description,
        Program: { connect: { id: subject.programId } },
      },
      include: { Program: true },
    });
  });

  it('returns subjects with their programs in descending ID order', async () => {
    prisma.subject.findMany.mockResolvedValue([]);

    await service.findAll();

    expect(prisma.subject.findMany).toHaveBeenCalledWith({
      include: { Program: true },
      orderBy: { id: 'desc' },
    });
  });

  it('returns a subject by ID', async () => {
    const subject = { id: 1, description: 'Programming', programId: 2 };
    prisma.subject.findUnique.mockResolvedValue(subject);

    await expect(service.findOne(1)).resolves.toBe(subject);
    expect(prisma.subject.findUnique).toHaveBeenCalledWith({
      where: { id: 1 },
      include: { Program: true },
    });
  });

  it('throws when a subject does not exist', async () => {
    prisma.subject.findUnique.mockResolvedValue(null);

    await expect(service.findOne(42)).rejects.toThrow(NotFoundException);
  });

  it('throws when the program does not exist', async () => {
    prisma.program.findUnique.mockResolvedValue(null);

    await expect(
      service.create({ description: 'Programming', programId: 42 }),
    ).rejects.toThrow(NotFoundException);
  });

  it('updates a subject and connects a replacement program when provided', async () => {
    const subject = { id: 1, description: 'Programming', programId: 2 };
    prisma.subject.findUnique.mockResolvedValue(subject);
    prisma.program.findUnique.mockResolvedValue({
      id: 3,
      name: 'Information Technology',
    });
    prisma.subject.update.mockResolvedValue(subject);

    await service.update(1, {
      description: 'Advanced programming',
      programId: 3,
    });

    expect(prisma.subject.update).toHaveBeenCalledWith({
      where: { id: 1 },
      data: {
        description: 'Advanced programming',
        Program: { connect: { id: 3 } },
      },
      include: { Program: true },
    });
  });

  it('deletes an existing subject', async () => {
    const subject = { id: 1, description: 'Programming', programId: 2 };
    prisma.subject.findUnique.mockResolvedValue(subject);
    prisma.subject.delete.mockResolvedValue(subject);

    await expect(service.remove(1)).resolves.toBe(subject);
    expect(prisma.subject.delete).toHaveBeenCalledWith({
      where: { id: 1 },
    });
  });
});
