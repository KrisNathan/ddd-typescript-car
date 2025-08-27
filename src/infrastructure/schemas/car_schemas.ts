import { z } from '@hono/zod-openapi';

export const RegisterCarSchema = z.object({
  make: z.string().min(1).max(512).openapi({
    example: 'Toyota',
    description: 'Car manufacturer'
  }),
  model: z.string().min(1).max(512).openapi({
    example: 'Camry',
    description: 'Car model'
  }),
  year: z.number().min(1886).max(new Date().getFullYear() + 1).openapi({
    example: 2023,
    description: 'Car manufacturing year'
  }),
}).openapi('RegisterCarRequest');

export const CarSchema = z.object({
  id: z.string().openapi({
    example: '123e4567-e89b-12d3-a456-426614174000',
    description: 'Car unique identifier'
  }),
  make: z.string().openapi({
    example: 'Toyota',
    description: 'Car manufacturer'
  }),
  model: z.string().openapi({
    example: 'Camry',
    description: 'Car model'
  }),
  year: z.number().openapi({
    example: 2023,
    description: 'Car manufacturing year'
  }),
}).openapi('Car');

export const CarResponseSchema = z.object({
  message: z.string().openapi({
    example: 'Car created successfully'
  }),
}).openapi('CarResponse');

export const CarsListSchema = z.object({
  cars: z.array(CarSchema)
}).openapi('CarsList');
