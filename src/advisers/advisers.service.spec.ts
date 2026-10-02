import { jest } from '@jest/globals';
import { Test, TestingModule } from '@nestjs/testing';
import { AdvisersService } from './advisers.service';
import { PrismaService } from '../prisma/prisma.service';

const asyncMock = () => jest.fn<(...args: unknown[]) => Promise<unknown>>();

describe('AdvisersService', () => {
  let service: AdvisersService;
  const prisma = {
    adviser: {
      create: asyncMock(),
      findMany: asyncMock(),
      findUnique: asyncMock(),
      findFirst: asyncMock(),
      update: asyncMock(),
      delete: asyncMock(),
    },
    program: {
      findUnique: asyncMock(),
    },
  };

  beforeEach(async () => {
    jest.clearAllMocks();

    const module: TestingModule = await Test.createTestingModule({
      providers: [AdvisersService, { provide: PrismaService, useValue: prisma }],
    }).compile();

    service = module.get<AdvisersService>(AdvisersService);
  });

  it('creates an adviser with the supplied name', async () => {
    const adviser = { id: 1, name: 'Alex Adviser', programId: 2 };
    prisma.adviser.create.mockResolvedValue(adviser);

    await expect(service.createAdviser({ name: adviser.name })).resolves.toBe(
      adviser,
    );
    expect(prisma.adviser.create).toHaveBeenCalledWith({
      data: { name: adviser.name },
    });
  });

  it('lists advisers in descending ID order', async () => {
    prisma.adviser.findMany.mockResolvedValue([]);

    await service.findAllAdvisers();

    expect(prisma.adviser.findMany).toHaveBeenCalledWith({
      orderBy: { id: 'desc' },
    });
  });

  it('returns an adviser by ID and reports missing advisers', async () => {
    const adviser = { id: 3, name: 'Alex Adviser', programId: 2 };
    prisma.adviser.findUnique.mockResolvedValueOnce(adviser).mockResolvedValueOnce(null);

    await expect(service.findOneAdviser(3)).resolves.toBe(adviser);
    await expect(service.findOneAdviser(99)).rejects.toThrow('Adviser not found');
  });

  it('updates and deletes an adviser with a success response', async () => {
    const adviser = { id: 3, name: 'Alex Adviser', programId: 2 };
    prisma.adviser.findUnique.mockResolvedValue(adviser);
    prisma.adviser.update.mockResolvedValue({
      ...adviser,
      name: 'Alex Updated',
    });
    prisma.adviser.delete.mockResolvedValue(adviser);

    await expect(
      service.updateAdviser(3, { name: 'Alex Updated' }),
    ).resolves.toMatchObject({ name: 'Alex Updated' });
    expect(prisma.adviser.update).toHaveBeenCalledWith({
      where: { id: 3 },
      data: { name: 'Alex Updated' },
    });

    await expect(service.removeAdviser(3)).resolves.toEqual({
      success: true,
      message: 'Adviser with ID 3 has been deleted',
      data: adviser,
    });
    expect(prisma.adviser.delete).toHaveBeenCalledWith({ where: { id: 3 } });
  });

  it('lists advisers with their program relation', async () => {
    prisma.adviser.findMany.mockResolvedValue([]);

    await service.getAllAdviserPrograms();

    expect(prisma.adviser.findMany).toHaveBeenCalledWith({
      include: { Program: true },
    });
  });
});
