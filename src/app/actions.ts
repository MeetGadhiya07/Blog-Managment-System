'use server';

import { z } from 'zod';

const contactSchema = z.object({
  name: z.string().min(2),
  email: z.string().email(),
  message: z.string().min(10),
});

export async function submitContact(formData: FormData) {
  const data = {
    name: formData.get('name'),
    email: formData.get('email'),
    message: formData.get('message'),
  };

  const result = contactSchema.safeParse(data);

  if (!result.success) {
    return { success: false, error: 'Invalid form data' };
  }

  // Simulate API call
  await new Promise(resolve => setTimeout(resolve, 1000));

  return { success: true, message: 'Message sent successfully' };
}
