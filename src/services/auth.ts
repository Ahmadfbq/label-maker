import { prisma } from '../lib/prisma'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'

export class AuthService {
  static async login(data: { email: string; password: string }) {
    const user = await prisma.user.findFirst({
      where: { email: data.email }
    })

    if (!user) return false

    const passwordMatch = await bcrypt.compare(data.password, user.password)

    if (!passwordMatch) return false

    const token = jwt.sign(
      { role: user.role },
      process.env.JWT_SECRET as string,
      { expiresIn: '2h' }
    )

    return token
  }
}
