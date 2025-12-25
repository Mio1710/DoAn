export interface TableHeader<T> {
  title: string
  align?: 'start' | 'center' | 'end'
  sortable?: boolean
  key: keyof T | 'index' | 'action'
  minWidth?: string | number
  width?: string | number
}
