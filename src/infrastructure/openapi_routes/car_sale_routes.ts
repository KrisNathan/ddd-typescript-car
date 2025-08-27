import { createRoute } from '@hono/zod-openapi';
import { 
  RegisterCarSaleSchema, 
  CarSaleResponseSchema, 
  CarSalesListSchema 
} from '../schemas/car_sale_schemas.js';
import { ErrorResponseSchema } from '../schemas/index.js';

export const registerCarSaleRoute = createRoute({
  method: 'post',
  path: '/api/car-sales',
  tags: ['Car Sales'],
  summary: 'Register a new car sale',
  description: 'Create a new car sale transaction',
  request: {
    body: {
      content: {
        'application/json': {
          schema: RegisterCarSaleSchema,
        },
      },
    },
  },
  responses: {
    200: {
      content: {
        'application/json': {
          schema: CarSaleResponseSchema,
        },
      },
      description: 'Car sale registered successfully',
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

export const listCarSalesRoute = createRoute({
  method: 'get',
  path: '/api/car-sales',
  tags: ['Car Sales'],
  summary: 'List all car sales',
  description: 'Retrieve a list of all car sales transactions',
  responses: {
    200: {
      content: {
        'application/json': {
          schema: CarSalesListSchema,
        },
      },
      description: 'List of car sales',
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
