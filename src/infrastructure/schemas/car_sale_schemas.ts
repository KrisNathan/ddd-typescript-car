import { z } from '@hono/zod-openapi';

export const RegisterCarSaleSchema = z.object({
  carId: z.string().openapi({
    example: '123e4567-e89b-12d3-a456-426614174000',
    description: 'Car unique identifier'
  }),
  customerId: z.string().openapi({
    example: '123e4567-e89b-12d3-a456-426614174000',
    description: 'Customer unique identifier'
  }),
  salesPersonId: z.string().openapi({
    example: '123e4567-e89b-12d3-a456-426614174000',
    description: 'Sales person unique identifier'
  }),
  price: z.number().positive().openapi({
    example: 25000.00,
    description: 'Sale price'
  }),
}).openapi('RegisterCarSaleRequest');

export const CarSaleSchema = z.object({
  id: z.string().openapi({
    example: '123e4567-e89b-12d3-a456-426614174000',
    description: 'Car sale unique identifier'
  }),
  carId: z.string().openapi({
    example: '123e4567-e89b-12d3-a456-426614174000',
    description: 'Car unique identifier'
  }),
  customerId: z.string().openapi({
    example: '123e4567-e89b-12d3-a456-426614174000',
    description: 'Customer unique identifier'
  }),
  salesPersonId: z.string().openapi({
    example: '123e4567-e89b-12d3-a456-426614174000',
    description: 'Sales person unique identifier'
  }),
  transactionDate: z.string().datetime().openapi({
    example: '2023-12-01T10:00:00Z',
    description: 'Transaction date and time'
  }),
  negotiatedPrice: z.object({
    amount: z.number().positive().openapi({
      example: 25000.00,
      description: 'Negotiated sale price'
    }),
    currency: z.string().length(3).openapi({
      example: 'USD',
      description: 'Currency code in ISO 4217 format'
    })
  }),
}).openapi('CarSale');

export const CarSaleResponseSchema = z.object({
  message: z.string().openapi({
    example: 'Car sale registered successfully'
  }),
  carSaleId: z.string().openapi({
    example: '123e4567-e89b-12d3-a456-426614174000'
  }),
}).openapi('CarSaleResponse');

export const CarSalesListSchema = z.object({
  carSales: z.array(CarSaleSchema)
}).openapi('CarSalesList');
