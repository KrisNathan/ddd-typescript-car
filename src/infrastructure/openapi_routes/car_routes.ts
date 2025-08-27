import { createRoute } from '@hono/zod-openapi';
import { 
  RegisterCarSchema, 
  CarResponseSchema, 
  CarsListSchema 
} from '../schemas/car_schemas.js';
import { ErrorResponseSchema } from '../schemas/index.js';

export const registerCarRoute = createRoute({
  method: 'post',
  path: '/api/cars',
  tags: ['Cars'],
  summary: 'Register a new car',
  description: 'Create a new car with make, model, and year',
  request: {
    body: {
      content: {
        'application/json': {
          schema: RegisterCarSchema,
        },
      },
    },
  },
  responses: {
    200: {
      content: {
        'application/json': {
          schema: CarResponseSchema,
        },
      },
      description: 'Car created successfully',
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

export const listCarsRoute = createRoute({
  method: 'get',
  path: '/api/cars',
  tags: ['Cars'],
  summary: 'List all cars',
  description: 'Retrieve a list of all registered cars',
  responses: {
    200: {
      content: {
        'application/json': {
          schema: CarsListSchema,
        },
      },
      description: 'List of cars',
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
