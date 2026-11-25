import { Injectable, UnauthorizedException, ServiceUnavailableException } from "@nestjs/common";
import * as argon2 from "argon2";
import * as crypto from "crypto";
import { PrismaService } from "../prisma/prisma.service";

export const SESSION_COOKIE_NAME = "vlearnin_admin_session";
export const CSRF_COOKIE_NAME = "vlearnin_csrf_token";

@Injectable()
export class AuthService {
  constructor(private readonly prisma: PrismaService) {}

  private hashToken(token: string): string {
    return crypto.createHash("sha256").update(token).digest("hex");
  }

  async hashPassword(password: string): Promise<string> {
    return argon2.hash(password, {
      type: argon2.argon2id,
      memoryCost: 19456,
      timeCost: 2,
      parallelism: 1,
    });
  }

  async verifyPassword(hash: string, plain: string): Promise<boolean> {
    try {
      return await argon2.verify(hash, plain);
    } catch {
      return false;
    }
  }

  async login(
    email: string,
    password: string,
    ipAddress?: string,
    userAgent?: string,
  ) {
    if (!this.prisma.isConnected) {
      throw new ServiceUnavailableException(
        "Database is not connected. Configure DATABASE_URL and run migrations.",
      );
    }

    const admin = await this.prisma.adminUser.findUnique({
      where: { email: email.toLowerCase().trim() },
    });

    if (!admin || !admin.isActive || admin.deletedAt) {
      throw new UnauthorizedException("Invalid email or password");
    }

    const valid = await this.verifyPassword(admin.passwordHash, password);
    if (!valid) {
      throw new UnauthorizedException("Invalid email or password");
    }

    const rawToken = crypto.randomBytes(32).toString("hex");
    const tokenHash = this.hashToken(rawToken);
    const csrfToken = crypto.randomBytes(24).toString("hex");
    const expiresAt = new Date(Date.now() + 1000 * 60 * 60 * 12); // 12 hours

    await this.prisma.$transaction([
      this.prisma.adminSession.create({
        data: {
          adminUserId: admin.id,
          tokenHash,
          csrfToken,
          ipAddress,
          userAgent,
          expiresAt,
        },
      }),
      this.prisma.adminUser.update({
        where: { id: admin.id },
        data: { lastLoginAt: new Date() },
      }),
      this.prisma.auditLog.create({
        data: {
          actorId: admin.id,
          action: "ADMIN_LOGIN",
          entityType: "AdminUser",
          entityId: admin.id,
          ipAddress,
        },
      }),
    ]);

    return {
      rawToken,
      csrfToken,
      expiresAt,
      user: {
        id: admin.id,
        email: admin.email,
        name: admin.name,
        role: admin.role,
      },
    };
  }

  async validateSession(rawToken: string) {
    if (!this.prisma.isConnected || !rawToken) return null;
    const tokenHash = this.hashToken(rawToken);
    const session = await this.prisma.adminSession.findUnique({
      where: { tokenHash },
      include: { adminUser: true },
    });

    if (
      !session ||
      session.revokedAt ||
      session.expiresAt < new Date() ||
      !session.adminUser.isActive ||
      session.adminUser.deletedAt
    ) {
      return null;
    }

    return session;
  }

  async logout(rawToken: string, ipAddress?: string) {
    if (!this.prisma.isConnected || !rawToken) return;
    const tokenHash = this.hashToken(rawToken);
    const session = await this.prisma.adminSession.findUnique({
      where: { tokenHash },
    });
    if (session) {
      await this.prisma.$transaction([
        this.prisma.adminSession.update({
          where: { id: session.id },
          data: { revokedAt: new Date() },
        }),
        this.prisma.auditLog.create({
          data: {
            actorId: session.adminUserId,
            action: "ADMIN_LOGOUT",
            entityType: "AdminSession",
            entityId: session.id,
            ipAddress,
          },
        }),
      ]);
    }
  }
}
