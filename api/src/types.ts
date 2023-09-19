import type { Role } from '@prisma/client'

export interface TokenProfile {
  id: string
  role: Role
}
