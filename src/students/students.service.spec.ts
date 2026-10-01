import { Test, TestingModule } from '@nestjs/testing';
import { StudentsService } from './students.service';
import { PrismaService } from '../prisma/prisma.service';
import { BadRequestException } from '@nestjs/common';

describe('StudentsService', () => {
  let service: StudentsService;
  const prisma = {
    student: {
      findUnique: jest.fn(),
    },
  };

  beforeEach(async () => {
    jest.clearAllMocks();

    const module: TestingModule = await Test.createTestingModule({
      providers: [StudentsService, { provide: PrismaService, useValue: prisma }],
    }).compile();

    service = module.get<StudentsService>(StudentsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('rejects an invalid student ID before querying Prisma', async () => {
    await expect(service.findOneStudent(Number.NaN)).rejects.toThrow(
      BadRequestException,
    );
    expect(prisma.student.findUnique).not.toHaveBeenCalled();
  });
});
