'use client';

import { useState } from 'react';
import { Button } from '@/components/ui';
import { Input } from './input';
import { Textarea } from './textarea';

interface ContactFormData {
  name: string;
  email: string;
  subject: string;
  message: string;
}

interface ContactFormProps {
  onSubmit?: (data: ContactFormData) => void;
}

export function ContactForm({ onSubmit }: ContactFormProps) {
  const [formData, setFormData] = useState<ContactFormData>({
    name: '',
    email: '',
    subject: '',
    message: '',
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit?.(formData);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <Input
        id="name"
        name="name"
        label="Name"
        value={formData.name}
        onChange={handleChange}
        placeholder="Your name"
        required
      />
      <Input
        id="email"
        name="email"
        type="email"
        label="Email"
        value={formData.email}
        onChange={handleChange}
        placeholder="your@email.com"
        required
      />
      <Input
        id="subject"
        name="subject"
        label="Subject"
        value={formData.subject}
        onChange={handleChange}
        placeholder="How can we help?"
        required
      />
      <Textarea
        id="message"
        name="message"
        label="Message"
        rows={5}
        value={formData.message}
        onChange={handleChange}
        placeholder="Your message..."
        required
      />
      <Button type="submit" className="w-full" size="lg">
        Send Message
      </Button>
    </form>
  );
}
