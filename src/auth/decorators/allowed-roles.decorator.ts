import { SetMetadata } from "@nestjs/common"
import { Role } from "../models/roles.model"

export const ALLOWED_ROLRES_DECOR_KEY = 'allowed-roles'

export const AllowedRoles = (...roles: Role[]) => SetMetadata(ALLOWED_ROLRES_DECOR_KEY, roles)
