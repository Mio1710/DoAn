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

  constructor(fetch: Fetch) {
    this.semester = new SemesterAPI(fetch)
    this.teacher = new TeacherApi(fetch)
    this.studentTopic = new StudentTopicAPI(fetch)
    this.studentIntern = new StudentInternAPI(fetch)
    this.topic = new TopicAPI(fetch)
    this.faculty = new FacultyAPI(fetch)
    this.superTeacher = new SuperTeacherAPI(fetch)
    this.lo = new LOAPI(fetch)
    this.results = new ResultsAPI(fetch)
    this.admin = new AdminApi(fetch)
    this.teacherGroup = new TeacherGroupAPI(fetch)
    this.intern = new InternAPI(fetch)
    this.teacherIntern = new TeacherInternAPI(fetch)
    this.studentTeacher = new StudentTeacherApi(fetch)
    this.auth = new AuthApi(fetch)
    this.superAdmin = new SuperAdminApi(fetch)
    this.reportTopic = new ReportReportTopicAPI(fetch)
    this.reportIntern = new ReportReportInternAPI(fetch)
    this.auth = new AuthApi(fetch)
    this.superAdmin = new SuperAdminApi(fetch)
    this.reportTopic = new ReportReportTopicAPI(fetch)
    this.intern = new InternAPI(fetch)
  }
}
