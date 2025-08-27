import { createRoute } from '@hono/zod-openapi';
import { 
  RegisterSalesPersonSchema, 
  SalesPersonResponseSchema, 
  SalesPersonsListSchema 
} from '../schemas/sales_person_schemas.js';
import { ErrorResponseSchema } from '../schemas/index.js';

export const registerSalesPersonRoute = createRoute({
  method: 'post',
  path: '/api/sales-persons',
  tags: ['Sales Persons'],
  summary: 'Register a new sales person',
  description: 'Create a new sales person with name and email',
  request: {
    body: {
      content: {
        'application/json': {
          schema: RegisterSalesPersonSchema,
        },
      },
    },
  },
  responses: {
    200: {
      content: {
        'application/json': {
          schema: SalesPersonResponseSchema,
        },
      },
      description: 'Sales person created successfully',
    },
    400: {
      content: {
        'application/json': {
          schema: ErrorResponseSchema,
        },
      },
      description: 'Invalid request body',
    },
    500: {
      content: {
        'application/json': {
          schema: ErrorResponseSchema,
        },
      },
      description: 'Internal server error',
    },
  },
});

export const listSalesPersonsRoute = createRoute({
  method: 'get',
  path: '/api/sales-persons',
  tags: ['Sales Persons'],
  summary: 'List all sales persons',
  description: 'Retrieve a list of all registered sales persons',
  responses: {
    200: {
      content: {
        'application/json': {
          schema: SalesPersonsListSchema,
        },
      },
      description: 'List of sales persons',
    },
    500: {
      content: {
        'application/json': {
          schema: ErrorResponseSchema,
        },
      },
      description: 'Internal server error',
    },
  },
});
