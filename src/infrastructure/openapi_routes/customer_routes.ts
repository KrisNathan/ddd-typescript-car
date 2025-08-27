import { createRoute } from '@hono/zod-openapi';
import { 
  RegisterCustomerSchema, 
  CustomerResponseSchema, 
  CustomersListSchema 
} from '../schemas/customer_schemas.js';
import { ErrorResponseSchema } from '../schemas/index.js';

export const registerCustomerRoute = createRoute({
  method: 'post',
  path: '/api/customers',
  tags: ['Customers'],
  summary: 'Register a new customer',
  description: 'Create a new customer with name and email',
  request: {
    body: {
      content: {
        'application/json': {
          schema: RegisterCustomerSchema,
        },
      },
    },
  },
  responses: {
    200: {
      content: {
        'application/json': {
          schema: CustomerResponseSchema,
        },
      },
      description: 'Customer created successfully',
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

export const listCustomersRoute = createRoute({
  method: 'get',
  path: '/api/customers',
  tags: ['Customers'],
  summary: 'List all customers',
  description: 'Retrieve a list of all registered customers',
  responses: {
    200: {
      content: {
        'application/json': {
          schema: CustomersListSchema,
        },
      },
      description: 'List of customers',
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
