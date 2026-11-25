import { Injectable, Logger, OnModuleDestroy, OnModuleInit } from "@nestjs/common";
import { PrismaClient } from "@prisma/client";

@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit, OnModuleDestroy {
  private readonly logger = new Logger(PrismaService.name);
  public isConnected = false;

  async onModuleInit() {
    if (!process.env.DATABASE_URL) {
      this.logger.warn(
        "DATABASE_URL is not configured. Running with read-only catalog fallback until PostgreSQL is connected.",
      );
      return;
    }
    try {
      await this.$connect();
      this.isConnected = true;
      this.logger.log("Connected to PostgreSQL via Prisma");
    } catch (error) {
      this.logger.warn(
        `Could not connect to PostgreSQL: ${error instanceof Error ? error.message : String(error)}`,
      );
    }
  }

  async onModuleDestroy() {
    if (this.isConnected) {
      await this.$disconnect();
    }
  }
}
