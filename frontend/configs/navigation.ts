import type { menu } from '~/types/config'
export const SuperAdminMenu: menu = {
  title: 'Quản trị hệ thống',
  icon: 'mdi-account',
  children: [
    {
      title: 'Quản lý khoa',
      icon: 'mdi-list-box-outline',
      to: '/admin/super/faculty',
    },
  ],
}
export const CurrentSemesterMenu: menu = {
  title: 'Học kỳ hiện tại',
  icon: 'mdi-account',
  to: '/semester',
}
export const StudentMenu: menu[] = [
  {
    id: 1,
    title: 'Sinh viên',
    icon: 'mdi-account',
    children: [
      {
        title: 'Đăng ký đề tài (đồ án)',
        icon: 'mdi-view-dashboard',
        to: '/student',
      },
      {
        title: 'Đăng ký công ty thực tập',
        icon: 'mdi-account',
        to: '/student/company',
      },
      {
        title: 'Xem ghi chú từ GVHD',
        icon: 'mdi-clipboard-list',
        to: '/student/note',
      },
      {
        title: 'Xem điểm khóa luận',
        icon: 'mdi-clock-edit-outline',
        to: '/student/result',
      },
      {
        title: 'Đề xuất đề tài',
        icon: 'mdi-view-dashboard',
        to: '/student/recommend-topic',
      },
      {
        title: 'Báo cáo khóa luận',
        icon: 'mdi-account',
        to: '/student/report-topic',
      },
      {
        title: 'Báo cáo thực tập',
        icon: 'mdi-book',
        to: '/student/report-intern',
      },
      {
        title: 'Liên hệ giảng viên',
        icon: 'mdi-clipboard-list',
        to: '/student/contact-teacher',
      },
    ],
  },
]

export const TeacherMenu: menu = {
  title: 'Giảng viên',
  icon: 'mdi-account',
  children: [
    {
      title: 'Cập nhật đề tài',
      icon: 'mdi-book',
      to: '/admin/teacher',
    },
    {
      title: 'Đề tài đề xuất',
      icon: 'mdi-account',
      to: '/admin/teacher/recommend-topic',
    },
    {
      title: 'Sinh viên thực tập',
      icon: 'mdi-view-dashboard',
      to: '/admin/teacher/guide-point',
    },
    {
      title: 'Sinh viên khóa luận',
      icon: 'mdi-account',
      to: '/admin/teacher/review-point',
    },
  ],
}

export const SuperTeacherMenu: menu = {
  title: 'Bộ môn',
  icon: 'mdi-account',
  children: [
    {
      title: 'Danh sách đăng ký khóa luận',
      icon: 'mdi-view-dashboard',
      to: '/admin/subject/student-topic',
    },
    {
      title: 'Duyệt đề tài',
      icon: 'mdi-view-dashboard',
      to: '/admin/subject/topic',
    },
    {
      title: 'Phân GV phản biện',
      icon: 'mdi-account',
      to: '/admin/subject/teacher',
    },
    {
      title: 'Danh sách đăng ký thực tập',
      icon: 'mdi-book',
      to: '/admin/subject/company',
    },
    {
      title: 'Chỉnh sửa LO',
      icon: 'mdi-clock-out',
      to: '/admin/faculty/lo',
    },
  ],
}
export const AdminMenu: menu = {
  title: 'Khoa',
  icon: 'mdi-account',
  children: [
    {
      title: 'Bảng điều khiển',
      icon: 'mdi-view-dashboard',
      to: '/admin/faculty',
    },
    {
      title: 'Quản lý sinh viên thực tập',
      icon: 'mdi-view-dashboard',
      to: '/admin/faculty/student-company',
    },
    {
      title: 'Quản lý sinh viên khóa luận',
      icon: 'mdi-view-dashboard',
      to: '/admin/faculty/student-topic',
    },
    {
      title: 'Tạo đợt đăng ký mới',
      icon: 'mdi-book',
      to: '/admin/faculty/semester',
    },
    {
      title: 'Quản lý giảng viên',
      icon: 'mdi-clipboard-list',
      to: '/admin/faculty/teacher',
    },
    {
      title: 'Reset đề tài',
      icon: 'mdi-clock-edit-outline',
      to: '/admin/faculty/reset-topic',
    },
  ],
}
