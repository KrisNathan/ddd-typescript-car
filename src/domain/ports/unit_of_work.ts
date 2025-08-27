// I am not confident.

// DO NOT RENAME TO UoW
// UooooW
// UoWwWw
// UoWW
// UoWWoW
// UoWWoWWoW
// UoWWoWWoWWoW
export interface IUnitOfWork {
  withTransaction<T>(work: (tx: UnitOfWorkScope) => Promise<T>): Promise<T>;
}

export interface UnitOfWorkScope {}