import { Model, Document } from "mongoose";

class DatabaseService<T extends Document> {
  private model: Model<T>;

  constructor(model: Model<T>) {
    this.model = model;
  }

  async create(data: Partial<T>): Promise<T> {
    return this.model.create(data);
  }

  async findById(id: string): Promise<T | null> {
    return this.model.findById(id).exec();
  }

  async findOne(filter: Record<string, unknown>): Promise<T | null> {
    return this.model.findOne(filter).exec();
  }

  async findAll(filter: Record<string, unknown> = {}): Promise<T[]> {
    return this.model.find(filter).exec();
  }

  async update(id: string, data: Partial<T>): Promise<T | null> {
    return this.model.findByIdAndUpdate(id, data, { new: true }).exec();
  }

  async delete(id: string): Promise<T | null> {
    return this.model.findByIdAndDelete(id).exec();
  }

  async findByIdAndDelete(id: string): Promise<T | null> {
    return this.model.findByIdAndDelete(id).exec();
  }
  async findByIdAndUpdate(id: string): Promise<T | null> {
    return this.model.findByIdAndUpdate(id).exec();
  }
}
export default DatabaseService;
