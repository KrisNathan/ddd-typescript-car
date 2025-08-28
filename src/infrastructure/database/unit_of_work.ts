import type { IUnitOfWork, IUnitOfWorkScope } from "@application/unit_of_work";
import type { Database } from "./types";
import type { Work } from "@application/unit_of_work";
import RepositoryProvider from "@infrastructure/repository_provider";

export class PostgresUnitOfWork implements IUnitOfWork {
  constructor(private readonly db: Database) { }

  async withTransaction<T>(work: Work<T>): Promise<T> {
    return await this.db.transaction(async (tx) => {
      const repositoryProvider = new RepositoryProvider(tx);
      const scope: IUnitOfWorkScope = { repositoryProvider };
      return work(scope);
    });
  }
}