import {
  CanActivate,
  ExecutionContext,
  ForbiddenException,
  Injectable,
  SetMetadata,
  UnauthorizedException,
} from "@nestjs/common";
import { Reflector } from "@nestjs/core";
import { Role } from "@prisma/client";
import { AuthService, SESSION_COOKIE_NAME } from "./auth.service";

export const ROLES_KEY = "roles";
export const Roles = (...roles: Role[]) => SetMetadata(ROLES_KEY, roles);

@Injectable()
export class AdminAuthGuard implements CanActivate {
  constructor(
    private readonly authService: AuthService,
    private readonly reflector: Reflector,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const req = context.switchToHttp().getRequest();
    const rawToken = req.cookies?.[SESSION_COOKIE_NAME];

    if (!rawToken) {
      throw new UnauthorizedException("Authentication required");
    }

    const session = await this.authService.validateSession(rawToken);
    if (!session) {
      throw new UnauthorizedException("Session expired or invalid");
    }

    // CSRF protection on mutating requests
    const method = (req.method || "GET").toUpperCase();
    if (["POST", "PUT", "PATCH", "DELETE"].includes(method)) {
      const headerToken = req.headers["x-csrf-token"];
      if (!headerToken || headerToken !== session.csrfToken) {
        throw new ForbiddenException("Invalid CSRF token");
      }
    }

    const requiredRoles = this.reflector.getAllAndOverride<Role[]>(ROLES_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);
    if (requiredRoles && requiredRoles.length > 0) {
      if (!requiredRoles.includes(session.adminUser.role)) {
        throw new ForbiddenException("Insufficient permissions");
      }
    }

    req.adminUser = session.adminUser;
    req.adminSession = session;
    return true;
  }
}
