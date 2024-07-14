import '@testing-library/jest-dom/matchers';
import server from '../utils/mock-server';

beforeAll(() => server.listen({ onUnhandledRequest: 'error' }));
afterAll(() => server.close());
afterEach(() => server.resetHandlers());
