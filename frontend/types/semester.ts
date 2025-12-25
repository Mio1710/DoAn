export type Semester = {
  id?: number
  name: string
  note: string
  status: boolean
  date: string
  public_topic: string
  register_topic: string
  register_group: string
  defense: string
  result: string
  created_at: string
  createdBy: {
    hodem: string
    ten: string
  }
  start_date: string
  end_date: string
  start_register_topic: string
  end_register_topic: string
  start_publish_topic: string
  end_publish_topic: string
  start_register_group: string
  end_register_group: string
  start_defense: string
  end_defense: string
  start_report_topic: string
  end_report_topic: string
  public_result: string
}
