import { z } from '@hono/zod-openapi';

export const RegisterSalesPersonSchema = z.object({
  name: z.string().min(1).max(512).openapi({
    example: 'Jane Smith',
    description: 'Sales person full name'
  }),
  email: z.string().email().openapi({
    example: 'jane.smith@company.com',
    description: 'Sales person email address'
  }),
}).openapi('RegisterSalesPersonRequest');

export const SalesPersonSchema = z.object({
  id: z.string().openapi({
    example: '123e4567-e89b-12d3-a456-426614174000',
    description: 'Sales person unique identifier'
  }),
  name: z.string().openapi({
    example: 'Jane Smith',
    description: 'Sales person full name'
  }),
  email: z.string().email().openapi({
    example: 'jane.smith@company.com',
    description: 'Sales person email address'
  }),
}).openapi('SalesPerson');

export const SalesPersonResponseSchema = z.object({
  message: z.string().openapi({
    example: 'Sales person created successfully'
  }),
  salesPersonId: z.string().openapi({
    example: '123e4567-e89b-12d3-a456-426614174000'
  }),
}).openapi('SalesPersonResponse');

export const SalesPersonsListSchema = z.object({
  salesPersons: z.array(SalesPersonSchema)
}).openapi('SalesPersonsList');
