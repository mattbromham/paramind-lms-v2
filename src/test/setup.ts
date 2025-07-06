import '@testing-library/jest-dom';

import { beforeEach } from 'vitest';

import { queryClient } from '@/lib/queryClient';

beforeEach(() => {
  queryClient.clear();
});
