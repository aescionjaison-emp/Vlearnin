import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
  Req,
  Res,
  UseGuards,
} from "@nestjs/common";
import { Request, Response } from "express";
import { Throttle } from "@nestjs/throttler";
import { AdminLoginInput, AdminLoginSchema } from "@vlearnin/shared";
import { ZodValidationPipe } from "../common/zod-validation.pipe";
import {
  AuthService,
  CSRF_COOKIE_NAME,
  SESSION_COOKIE_NAME,
} from "./auth.service";
import { AdminAuthGuard } from "./auth.guard";

@Controller("auth")
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post("login")
  @HttpCode(HttpStatus.OK)
  @Throttle({ default: { limit: 10, ttl: 60000 } })
  async login(
    @Body(new ZodValidationPipe(AdminLoginSchema)) body: AdminLoginInput,
    @Req() req: Request,
    @Res({ passthrough: true }) res: Response,
  ) {
    const result = await this.authService.login(
      body.email,
      body.password,
      req.ip,
      req.headers["user-agent"],
    );

    const isProd = process.env.NODE_ENV === "production";

    res.cookie(SESSION_COOKIE_NAME, result.rawToken, {
      httpOnly: true,
      secure: isProd,
      sameSite: "lax",
      expires: result.expiresAt,
      path: "/",
    });

    res.cookie(CSRF_COOKIE_NAME, result.csrfToken, {
      httpOnly: false,
      secure: isProd,
      sameSite: "lax",
      expires: result.expiresAt,
      path: "/",
    });

    return {
      user: result.user,
      csrfToken: result.csrfToken,
    };
  }

  @Post("logout")
  @HttpCode(HttpStatus.OK)
  async logout(@Req() req: Request, @Res({ passthrough: true }) res: Response) {
    const rawToken = req.cookies?.[SESSION_COOKIE_NAME];
    if (rawToken) {
      await this.authService.logout(rawToken, req.ip);
    }

    res.clearCookie(SESSION_COOKIE_NAME, { path: "/" });
    res.clearCookie(CSRF_COOKIE_NAME, { path: "/" });

    return { ok: true };
  }

  @Get("me")
  @UseGuards(AdminAuthGuard)
  async me(@Req() req: Request & { adminUser?: { id: string; email: string; name: string; role: string } }) {
    return {
      user: {
        id: req.adminUser?.id,
        email: req.adminUser?.email,
        name: req.adminUser?.name,
        role: req.adminUser?.role,
      },
    };
  }
}
