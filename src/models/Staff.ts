import type { StaffId } from "./Score.ts";

export class Staff {
  public readonly id: StaffId = crypto.randomUUID()// symbol?
}
