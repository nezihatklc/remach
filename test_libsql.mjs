import { createClient } from '@libsql/client';

try {
  const client = createClient({ url: 'file:./dev.db' });
  console.log('Client created successfully');
} catch (error) {
  console.error('Error:', error);
}
