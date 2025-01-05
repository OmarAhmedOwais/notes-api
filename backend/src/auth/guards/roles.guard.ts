// src/auth/guards/roles.guard.ts
import {
  CanActivate,
  ExecutionContext,
  Injectable,
  ForbiddenException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { ROLES_KEY } from '../decorators/roles.decorator';
import { UserRole } from '../../users/user-role.enum';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private readonly reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    // 1) Get roles required by the route (if any)
    const requiredRoles = this.reflector.getAllAndOverride<UserRole[]>(
      ROLES_KEY,
      [context.getHandler(), context.getClass()],
    );
    // if no roles are required, allow access
    if (!requiredRoles || requiredRoles.length === 0) {
      return true;
    }

    // 2) Extract user from request (attached by JwtStrategy)
    const { user } = context.switchToHttp().getRequest();

    // 3) If user has any of the required roles, allow
    if (requiredRoles.includes(user.role)) {
      return true;
    }

    // 4) Otherwise, deny
    throw new ForbiddenException(`Required roles: ${requiredRoles}`);
  }
}
