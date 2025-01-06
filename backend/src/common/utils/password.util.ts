import * as bcrypt from 'bcryptjs';

export async function hashPassword(
  password: string,
  saltRounds = 10,
): Promise<string> {
  const salt = await bcrypt.genSalt(saltRounds);
  return bcrypt.hash(password, salt);
}

export async function comparePasswords(
  providedPassword: string,
  storedPassword: string,
): Promise<boolean> {
  return await bcrypt.compare(providedPassword, storedPassword);
}
