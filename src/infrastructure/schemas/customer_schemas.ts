import { z } from '@hono/zod-openapi';

export const RegisterCustomerSchema = z.object({
  name: z.string().min(1).max(512).openapi({
    example: 'John Doe',
    description: 'Customer full name'
  }),
  email: z.string().email().openapi({
    example: 'john.doe@example.com',
    description: 'Customer email address'
  }),
}).openapi('RegisterCustomerRequest');

export const CustomerSchema = z.object({
  id: z.string().openapi({
    example: '123e4567-e89b-12d3-a456-426614174000',
    description: 'Customer unique identifier'
  }),
  name: z.string().openapi({
    example: 'John Doe',
    description: 'Customer full name'
  }),
  email: z.string().email().openapi({
    example: 'john.doe@example.com',
    description: 'Customer email address'
  }),
}).openapi('Customer');

export const CustomerResponseSchema = z.object({
  message: z.string().openapi({
    example: 'Customer created successfully'
  }),
  customerId: z.string().openapi({
    example: '123e4567-e89b-12d3-a456-426614174000'
  }),
}).openapi('CustomerResponse');

export const CustomersListSchema = z.object({
  customers: z.array(CustomerSchema)
}).openapi('CustomersList');

export const ErrorResponseSchema = z.object({
  message: z.string().openapi({
    example: 'Internal Server Error'
  }),
  errors: z.string().optional().openapi({
    example: 'Validation error details'
  }),
}).openapi('ErrorResponse');
