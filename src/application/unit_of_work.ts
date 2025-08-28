// I am not confident.

import type IRepositoryProivder from "./repository_provider";

// DO NOT RENAME TO UoW
// UooooW
// UoWwWw
// UoWW
// UoWWoW
// UoWWoWWoW
// UoWWoWWoWWoW

export interface IUnitOfWorkScope {
  repositoryProvider: IRepositoryProivder;
}

export type Work<T> = (tx: IUnitOfWorkScope) => Promise<T>;

export interface IUnitOfWork {
  withTransaction<T>(work: Work<T>): Promise<T>;
}
