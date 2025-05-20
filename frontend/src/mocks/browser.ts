import { handlers } from '@/mocks/handler';
import { setupWorker } from 'msw/browser';

export const worker = setupWorker(...handlers);
