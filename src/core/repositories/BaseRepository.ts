export interface BaseRepository<T, ID> {
  getAll(): Promise<T[]>;
  getById(id: ID): Promise<T | null>;
  save(item: T): Promise<void>;
  deleteById(id: ID): Promise<void>;
}
