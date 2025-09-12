const filters = {
    statusColor(type: string): string {
      switch (type) {
        case 'pending':
          return 'info'
        case 'approved':
          return 'success'
        case 'rejected':
          return 'error'
        default:
          return '#ccc'
      }
    },
    statusType(type: string): string {
      switch (type) {
        case 'pending':
          return 'Chờ duyệt'
        case 'approved':
          return 'Đã duyệt'
        case 'rejected':
          return 'Từ chối'
        default:
          return 'Chờ duyệt'
      }
    },
  }
  
  export default filters
  