import type { ExtractTablesWithRelations } from 'drizzle-orm';
import { NodePgDatabase, type NodePgQueryResultHKT } from 'drizzle-orm/node-postgres';
import type { PgTransaction } from 'drizzle-orm/pg-core';
import type { Pool } from 'pg';

export type Database = NodePgDatabase<Record<string, never>> & {
  $client: Pool;
}

export type Transaction = PgTransaction<NodePgQueryResultHKT, Record<string, never>, ExtractTablesWithRelations<Record<string, never>>>;

export type DatabaseOrTransaction =
  | Database
  | Transaction;
