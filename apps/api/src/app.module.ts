import { Module } from "@nestjs/common";
import { ThrottlerGuard, ThrottlerModule } from "@nestjs/throttler";
import { APP_GUARD } from "@nestjs/core";
import { PrismaModule } from "./prisma/prisma.module";
import { EmailService } from "./common/email.service";
import { PdfService } from "./common/pdf.service";
import { AuthService } from "./auth/auth.service";
import { AuthController } from "./auth/auth.controller";
import { PublicController } from "./public/public.controller";
import { AdminController } from "./admin/admin.controller";

@Module({
  imports: [
    PrismaModule,
    ThrottlerModule.forRoot([
      {
        ttl: 60000,
        limit: 60,
      },
    ]),
  ],
  controllers: [AuthController, PublicController, AdminController],
  providers: [
    EmailService,
    PdfService,
    AuthService,
    {
      provide: APP_GUARD,
      useClass: ThrottlerGuard,
    },
  ],
})
export class AppModule {}
