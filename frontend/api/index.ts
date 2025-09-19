import type { Fetch } from 'ofetch';
import { SemesterAPI } from '~/api/semester'
import { AdminApi } from '~/api/admin'
import { StudentTopicAPI } from '~/api/student-topic'
import { StudentInternAPI } from '~/api/student-intern'
import { TopicAPI } from '~/api/topic'
import { FacultyAPI } from '~/api/faculty'
import { SuperTeacherAPI } from '~/api/super-teacher'
import { LOAPI } from '~/api/lo'
import { ResultsAPI } from '~/api/results'
import { TeacherApi } from '~/api/teacher'
import { TeacherGroupAPI } from '~/api/teacher-group'
import { InternAPI } from '~/api/intern'
import { TeacherInternAPI } from '~/api/teacher-intern'
import { StudentTeacherApi } from './student-teacher'
import { AuthApi } from '~/api/auth'
import { SuperAdminApi } from '~/api/super-admin'
import { ReportReportTopicAPI } from '~/api/report-topic'
import {  ReportReportInternAPI } from '~/api/report-intern'
import { BaseApi } from './base';
export class Api {
  public readonly semester: SemesterAPI
  public readonly teacher: TeacherApi
  public readonly studentTopic: StudentTopicAPI
  public readonly studentIntern: StudentInternAPI
  public readonly topic: TopicAPI
  public readonly faculty: FacultyAPI
  public readonly superTeacher: SuperTeacherAPI
  public readonly lo: LOAPI
  public readonly results: ResultsAPI
  public readonly admin: AdminApi
  public readonly teacherGroup: TeacherGroupAPI
  public readonly intern: InternAPI
  public readonly teacherIntern: TeacherInternAPI
  public readonly studentTeacher: StudentTeacherApi
  public readonly auth: AuthApi
  public readonly superAdmin: SuperAdminApi
  public readonly reportTopic: ReportReportTopicAPI
  public readonly reportIntern: ReportReportInternAPI

  constructor() {
    this.semester = new SemesterAPI()
    this.teacher = new TeacherApi()
    this.studentTopic = new StudentTopicAPI()
    this.studentIntern = new StudentInternAPI()
    this.topic = new TopicAPI()
    this.faculty = new FacultyAPI()
    this.superTeacher = new SuperTeacherAPI()
    this.lo = new LOAPI()
    this.results = new ResultsAPI()
    this.admin = new AdminApi()
    this.teacherGroup = new TeacherGroupAPI()
    this.intern = new InternAPI()
    this.teacherIntern = new TeacherInternAPI()
    this.studentTeacher = new StudentTeacherApi()
    this.auth = new AuthApi()
    this.superAdmin = new SuperAdminApi()
    this.reportTopic = new ReportReportTopicAPI()
    this.reportIntern = new ReportReportInternAPI()
    this.auth = new AuthApi()
    this.superAdmin = new SuperAdminApi()
    this.reportTopic = new ReportReportTopicAPI()
    this.intern = new InternAPI()
  }
}
