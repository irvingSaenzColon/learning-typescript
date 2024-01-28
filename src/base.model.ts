export interface BaseModel {
  readonly id: string | number;
  readonly createdAt : Date | null;
  readonly updatedAt : Date | null;
}
