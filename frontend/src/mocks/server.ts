import { handlers } from '@/mocks/handler';
import { setupServer } from 'msw/node';

export const server = setupServer(...handlers);
