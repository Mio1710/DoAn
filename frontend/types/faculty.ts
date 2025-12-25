export interface Faculty {
  id: number
  name: string
  code: string
  created_at: string
  updated_at: string
  super_teachers: {
    id: number
    hodem: string
    ten: string
  }
}
