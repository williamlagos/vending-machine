import type { Role } from '@prisma/client'

export interface TokenProfile {
  id: string
  role: Role
}

export interface CoinsContainer {
  hundred?: number
  fifty?: number
  twenty?: number
  ten?: number
  five?: number
}
