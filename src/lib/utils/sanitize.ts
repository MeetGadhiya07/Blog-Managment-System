export function sanitizeInput(input: string): string {
  return input.replace(/[<>]/g, '').trim();
}

export function sanitizeObject<T extends Record<string, any>>(obj: T): T {
  const sanitized = {} as T;
  for (const key in obj) {
    if (typeof obj[key] === 'string') {
      sanitized[key] = sanitizeInput(obj[key]) as T[Extract<keyof T, string>];
    } else {
      sanitized[key] = obj[key];
    }
  }
  return sanitized;
}
