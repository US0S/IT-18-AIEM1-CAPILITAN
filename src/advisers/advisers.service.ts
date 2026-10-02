import { Injectable } from '@nestjs/common';
import { CreateAdviserDto } from './dto/create-adviser.dto';
import { UpdateAdviserDto } from './dto/update-adviser.dto';
import { PrismaService } from '../prisma/prisma.service';
@Injectable()
export class AdvisersService {
  constructor(private readonly prisma: PrismaService) {}

  private buildAdviserCreateData(createAdviserDto: CreateAdviserDto, programId?: number) {
    const data: any = {
      name: createAdviserDto.name,
    };

    if (programId !== undefined && programId !== null) {
      data.Program = {
        connect: { id: programId },
      };
    }

    return data;
  }

  createAdviser(createAdviserDto: CreateAdviserDto) {
    return this.prisma.adviser.create({
      data: this.buildAdviserCreateData(createAdviserDto),
    });
  }

  findAllAdvisers() {
    return this.prisma.adviser.findMany({
      orderBy: { id: 'desc' },
    });
  }

  async findOneAdviser(id: number) {
    const adviser = await this.prisma.adviser.findUnique({
      where: { id },
    });
    
    if (!adviser) {
      throw new Error('Adviser not found');
    }
    return adviser;
  }

  async updateAdviser(id: number, updateAdviserDto: UpdateAdviserDto) {
    const adviser = await this.prisma.adviser.findUnique({ where: { id } });
    if (!adviser) {
      throw new Error('Adviser not found');
    }

    return this.prisma.adviser.update({
      where: { id },
      data: {
        name: updateAdviserDto.name,
      },
    });
  }

  async removeAdviser(id: number) {
    const adviser = await this.prisma.adviser.findUnique({ where: { id } });
    if (!adviser) {
      throw new Error('Adviser not found');
    }
    const deletedAdviser = await this.prisma.adviser.delete({ where: { id } });
    if (!deletedAdviser) {
      throw new Error('Adviser not found');
    }
    return {
      success: true,
      message: `Adviser with ID ${id} has been deleted`,
      data: deletedAdviser,
    };
  }
//////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////

getAllAdviserPrograms() {
  return this.prisma.adviser.findMany({
    include: {
      Program: true,
    },
  });
}
  
private async searchProgramExists(programId: number) {
  const program = await this.prisma.program.findUnique({
    where: { id: programId },
  });
  if (!program) {
    throw new Error(`Program with ID ${programId} not found`);
  }
  return program;
}

async findOneAdviserPrograms(programId: number) {
  await this.searchProgramExists(programId);
  return this.prisma.adviser.findMany({
    where: { programId },
  });
}

async findOneAdviserProgramsId(programId: number, adviserId: number) {
  await this.searchProgramExists(programId);
  const adviser = await this.prisma.adviser.findFirst({
    where: {
      id: adviserId,
      programId: programId,
    },
  });
  if (!adviser) {
    throw new Error(`Adviser with ID ${adviserId} not found for program with ID ${programId}`);
  }
  return adviser;
}

createAdviserProgram(programId: number, createAdviserDto: CreateAdviserDto) {
  return this.prisma.adviser.create({
    data: {
      ...createAdviserDto,
      programId: programId,
    },
  });
}

createAdviserProgramWithId(programId: number, createAdviserDto: CreateAdviserDto) {
  return this.prisma.adviser.create({
    data: {
      ...createAdviserDto,
      programId: programId,
    },
  });
}
async updateAdviserProgram(adviserId: number, updateAdviserDto: UpdateAdviserDto) {
  const adviser = await this.prisma.adviser.findUnique({ where: { id: adviserId } });
  if (!adviser) {
    throw new Error(`Adviser with ID ${adviserId} not found`);
  }
  return this.prisma.adviser.update({
    where: { id: adviserId },
    data: updateAdviserDto,
  });
}

async updateAdviserAndProgram(adviserId: number, programId: number, updateAdviserDto: UpdateAdviserDto) {
  await this.searchProgramExists(programId);
  const adviser = await this.prisma.adviser.findFirst({
    where: {
      id: adviserId,
      programId: programId,
    },
  });
  if (!adviser) {
    throw new Error(`Adviser with ID ${adviserId} not found for program with ID ${programId}`);
  }
  return this.prisma.adviser.update({
    where: { id: adviserId },
    data: updateAdviserDto,
  });
}

async updateAdviserProgramPut(adviserId: number, updateAdviserDto: UpdateAdviserDto) {
  const adviser = await this.prisma.adviser.findUnique({ where: { id: adviserId } });
  if (!adviser) {
    throw new Error(`Adviser with ID ${adviserId} not found`);
  }
  return this.prisma.adviser.update({
    where: { id: adviserId },
    data: updateAdviserDto,
  });
}

async updateAdviserAndProgramPut(adviserId: number, programId: number, updateAdviserDto: UpdateAdviserDto) {
  await this.searchProgramExists(programId);
  const adviser = await this.prisma.adviser.findFirst({
    where: {
      id: adviserId,
      programId: programId,
    },
  });
  if (!adviser) {
    throw new Error(`Adviser with ID ${adviserId} not found for program with ID ${programId}`);
  }
  return this.prisma.adviser.update({
    where: { id: adviserId },
    data: updateAdviserDto,
  });
}

async deleteAdviserProgram(adviserId: number) {
  const adviser = await this.prisma.adviser.findUnique({ where: { id: adviserId } });
  if (!adviser) {
    throw new Error(`Adviser with ID ${adviserId} not found`);
  }
  const deletedAdviser = await this.prisma.adviser.delete({ where: { id: adviserId } });
  if (!deletedAdviser) {
    throw new Error(`Adviser with ID ${adviserId} not found`);
  }
  return {
    success: true,
    message: `Adviser with ID ${adviserId} has been deleted`,
    data: deletedAdviser,
  };
}

async deleteAdviserAndProgram(adviserId: number, programId: number) {
  await this.searchProgramExists(programId);
  const adviser = await this.prisma.adviser.findFirst({
    where: {
      id: adviserId,
      programId: programId,
    },
  });
  if (!adviser) {
    throw new Error(`Adviser with ID ${adviserId} not found for program with ID ${programId}`);
  }
  const deletedAdviser = await this.prisma.adviser.delete({
    where: { id: adviserId },
  });
  if (!deletedAdviser) {
    throw new Error(`Adviser with ID ${adviserId} not found for program with ID ${programId}`);
  }
  return {
    success: true,
    message: `Adviser with ID ${adviserId} has been deleted for program with ID ${programId}`,
    data: deletedAdviser,
  };
}    
}  
