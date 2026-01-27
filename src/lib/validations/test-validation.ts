import { commentSchema } from '@/lib/validations/blog';

// Test validation schema
console.log('=== Comment Validation Tests ===');

// Test valid data
const validComment = {
  name: 'John Doe',
  email: 'john@example.com',
  comment: 'This is a great blog post with detailed information.',
  rating: 5,
};

try {
  const result = commentSchema.parse(validComment);
  console.log('✅ Valid comment passed:', result);
} catch (error) {
  console.log('❌ Valid comment failed:', error);
}

// Test invalid data
const invalidCases = [
  {
    name: 'Short name',
    data: { ...validComment, name: 'A' },
    expected: 'Name too short',
  },
  {
    name: 'Invalid email',
    data: { ...validComment, email: 'invalid-email' },
    expected: 'Invalid email format',
  },
  {
    name: 'Short comment',
    data: { ...validComment, comment: 'Short' },
    expected: 'Comment too short',
  },
  {
    name: 'Invalid rating (too low)',
    data: { ...validComment, rating: 0 },
    expected: 'Rating too low',
  },
  {
    name: 'Invalid rating (too high)',
    data: { ...validComment, rating: 6 },
    expected: 'Rating too high',
  },
];

invalidCases.forEach(({ name, data, expected }) => {
  try {
    commentSchema.parse(data);
    console.log(`❌ ${name}: Should have failed but passed`);
  } catch (error) {
    console.log(`✅ ${name}: Correctly failed - ${expected}`);
  }
});

export {};
