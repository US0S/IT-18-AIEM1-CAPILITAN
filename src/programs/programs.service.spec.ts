import { jest } from '@jest/globals';
import { Test, TestingModule } from '@nestjs/testing';
import { ProgramsService } from './programs.service';
import { PrismaService } from '../prisma/prisma.service';
import { NotFoundException } from '@nestjs/common';

const asyncMock = () => jest.fn<(...args: unknown[]) => Promise<unknown>>();

describe('ProgramsService', () => {
  let service: ProgramsService;
  const prisma = {
    program: {
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
      providers: [ProgramsService, { provide: PrismaService, useValue: prisma }],
    }).compile();

    service = module.get<ProgramsService>(ProgramsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('creates a program using its name', async () => {
    const program = { id: 1, name: 'Computer Science' };
    prisma.program.create.mockResolvedValue(program);

    await expect(service.create({ name: program.name })).resolves.toBe(program);
    expect(prisma.program.create).toHaveBeenCalledWith({
      data: { name: program.name },
    });
  });

  it('returns all programs in descending ID order', async () => {
    prisma.program.findMany.mockResolvedValue([]);

    await service.findAll();

    expect(prisma.program.findMany).toHaveBeenCalledWith({
      orderBy: { id: 'desc' },
    });
  });

  it('returns a program by ID', async () => {
    const program = { id: 1, name: 'Computer Science' };
    prisma.program.findUnique.mockResolvedValue(program);

    await expect(service.findOne(1)).resolves.toBe(program);
    expect(prisma.program.findUnique).toHaveBeenCalledWith({
      where: { id: 1 },
    });
  });

  it('throws when a program does not exist', async () => {
    prisma.program.findUnique.mockResolvedValue(null);

    await expect(service.findOne(42)).rejects.toThrow(NotFoundException);
  });

  it('updates an existing program', async () => {
    const program = { id: 1, name: 'Computer Science' };
    prisma.program.findUnique.mockResolvedValue(program);
    prisma.program.update.mockResolvedValue(program);

    await service.update(1, { name: 'Information Technology' });

    expect(prisma.program.update).toHaveBeenCalledWith({
      where: { id: 1 },
      data: { name: 'Information Technology' },
    });
  });

  it('deletes an existing program and returns a success message', async () => {
    const program = { id: 1, name: 'Computer Science' };
    prisma.program.findUnique.mockResolvedValue(program);
    prisma.program.delete.mockResolvedValue(program);

    await expect(service.remove(1)).resolves.toEqual({
      success: true,
      message: 'Program with ID 1 has been deleted',
      data: program,
    });
    expect(prisma.program.delete).toHaveBeenCalledWith({
      where: { id: 1 },
    });
  });
});
