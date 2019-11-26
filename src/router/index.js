import Vue from "vue";
import i18m from "../i18n/i18n";

import Router from "vue-router";
import homePage from "@/components/homePage.vue";

import allCourse from "@/components/course/allCourse.vue";
import home from "@/components/course/home/home.vue";
import modules from "@/components/course/modules.vue";
import syllabus from "@/components/course/syllabus.vue";
import assignments from "@/components/course/assignments2.vue";
import assignmentdetail from "@/components/course/assignmentdetail2.vue";
import fileView from "@/components/course/fileView.vue";
import assignmentPreView from "@/components/course/assignmentPreView.vue";
import quizzes from "@/components/course/quizzes.vue";
import discussions from "@/components/course/discussions.vue";
import announcements from "@/components/course/announcements.vue";
import people from "@/components/course/people.vue";
// import pages from '@/components/course/pages'
// import files from '@/components/course/files'
import grades from "@/components/course/grades.vue";
import settings from "@/components/course/settings.vue";
import studentHomePage from "@/components/students/studentHomePage.vue";
import studentControlPanel from "@/components/students/studentDashboard/studentControlPanel.vue";
import studentHomeCourse from "@/components/students/studentCourse/studentHomeCourse.vue";

//* ********************关于学生端课程的路由start****************************
import studentfileView from "@/components/students/studentCourse/studentfileView.vue";
import studentsyllabus from "@/components/students/studentCourse/studentsyllabus.vue";
import studentModules from "@/components/students/studentCourse/studentModules.vue";
import studentAllCourse from "@/components/students/studentCourse/studentAllCourse.vue";
import studentAnnouncement from "@/components/students/studentCourse/studentAnnouncement.vue";
import studentAssignments from "@/components/students/studentCourse/studentAssignments.vue";
import studentAssignmentDetail from "@/components/students/studentCourse/studentAssignmentDetail.vue";
import studentAssignmentSubmit from "@/components/students/studentCourse/studentAssignmentSubmit.vue";
import studentDiscussions from "@/components/students/studentCourse/studentDiscussions.vue";
import studentGrades from "@/components/students/studentCourse/studentGrades.vue";
import studentPeople from "@/components/students/studentCourse/studentPeople.vue";
import studentCourseDiscussionCreateList from "@/components/students/studentCourse/studentCourseDiscussion/studentCourseDiscussionCreateList.vue";
import studentCourseDiscussionAdmit from "@/components/students/studentCourse/studentCourseDiscussion/studentCourseDiscussionAdmit.vue";
import studentCourseDiscussionDetail from "@/components/students/studentCourse/studentCourseDiscussion/studentCourseDiscussionDetail.vue";
import studentAnnouncementCreateList from "@/components/students/studentCourse/studentAnnouncement/studentAnnouncementCreateList.vue";
import studentAnnouncementDeatil from "@/components/students/studentCourse/studentAnnouncement/studentAnnouncementDetail.vue";

//* ********************关于学生端课程的路由end****************************
// import homeCourse from '@/components/course/homeCourse'
import adminHomePage from "@/components/admin/adminHomePage.vue";
import terms from "@/components/admin/adminTerms/terms.vue";
import adminCourseAll from "@/components/admin/adminCourse/adminCourseAll.vue";
import coursesettings from "@/components/admin/adminCourse/coursesettings.vue";
import adminPeople from "@/components/admin/adminPeople/adminPeople.vue";
// import permission from '@/components/admin/adminPermission/permission'
import subAccount from "@/components/admin/adminSubAccount/subAccount.vue";
// import sisImport from '@/components/admin/adminSisImport/sisImport'
import adminSettings from "@/components/admin/adminSettings/adminSettings.vue";
// import inbox from '@/components/admin/adminInbox/inbox'
// import adminHelp from '@/components/admin/adminHelp/adminHelp'
import peopleDetail from "@/components/admin/adminPeople/peopleDetail.vue";
import announcementCreate from "@/components/course/announcement/announcementcreate.vue";
import announcementAdmit from "@/components/course/announcement/announcementadmit.vue";
import announcementList from "@/components/course/announcement/announcementlist.vue";
import announcementDetail from "@/components/course/announcement/announcementdetail.vue";
import discussionDeatilCourse from "@/components/course/discussion/discussiondetailcourse.vue";
import discussionAdmit from "@/components/course/discussion/discussionadmit.vue";
import discussionCreateList from "@/components/course/discussion/discussioncreatelist.vue";
import store from "@/store/index";
import i18n from "../i18n/i18n";
// import discussionDetailGroup from '@/components/course/discussion/discussiondetailgroup'

Vue.use(Router);
Vue.use(i18m);

const loginRouters = [
    {
        path: "/",
        component: resolve => {
            require(["@/components/login/login"], resolve);
        },
        alias: "/login"
        // component: resolve => { require(['@/components/calendar/caleadarWatch'], resolve) }
    },
    {
        path: "/signUp",
        component: resolve => {
            require(["@/components/login/signUp"], resolve);
        }
    },
    {
        path: "/courseEnroll",
        component: resolve => {
            require(["@/components/login/courseEnroll"], resolve);
        }
    },
    {
        path: "/enrollment",
        component: resolve => {
            require(["@/components/login/enrollment"], resolve);
        }
    },
    {
        path: "/ePortfolio",
        name: "ePortfolios_p",
        component: resolve => {
            require(["@/components/account/ePortfolios/ePortView"], resolve);
        },
        redirect: { path: "ePortfolio/ePortList" },
        children: [
            {
                path: "ePortList",
                name: "ePortfolios_p2",
                component: resolve => {
                    require([
                        "@/components/account/ePortfolios/ePortList"
                    ], resolve);
                }
            },
            {
                path: "ePortPages",
                name: "ePortfolios_p3",
                component: resolve => {
                    require([
                        "@/components/account/ePortfolios/ePortPages"
                    ], resolve);
                }
            }
        ]
    }
];

const teacherRouters = {
    path: "/homePage",
    component: homePage,
    redirect: { path: "/homePage" },
    children: [
        {
            path: "personalHomepage",
            name: "account",
            component: resolve => {
                require(["@/components/account/personalHomepage"], resolve);
            },
            redirect: { path: "personalHomepage/profile" },
            children: [
                {
                    path: "profile",
                    name: "account_Profile_t",
                    component: resolve => {
                        require(["@/components/account/profile"], resolve);
                    }
                },
                {
                    path: "setting",
                    name: "account_Settings_t",
                    component: resolve => {
                        require(["@/components/account/settings"], resolve);
                    }
                },
                {
                    path: "file",
                    name: "account_Files_t",
                    component: resolve => {
                        require([
                            "@/components/course/files/files.vue"
                        ], resolve);
                    }
                },
                {
                    path: "ePortfolios",
                    name: "account_ePortfolios_t",
                    component: resolve => {
                        require([
                            "@/components/account/ePortfolios/ePortView"
                        ], resolve);
                    },
                    redirect: { path: "ePortfolios/ePortIndex" },
                    children: [
                        {
                            path: "ePortIndex",
                            name: "account_ePortfolios_t1",
                            component: resolve => {
                                require([
                                    "@/components/account/ePortfolios/ePortIndex"
                                ], resolve);
                            }
                        },
                        {
                            path: "ePortList",
                            name: "account_ePortfolios_t2",
                            component: resolve => {
                                require([
                                    "@/components/account/ePortfolios/ePortList"
                                ], resolve);
                            }
                        },
                        {
                            path: "ePortPages",
                            name: "account_ePortfolios_t3",
                            component: resolve => {
                                require([
                                    "@/components/account/ePortfolios/ePortPages"
                                ], resolve);
                            }
                        }
                    ]
                }
            ]
        },
        {
            path: "controlPanel",
            name: "Dashboard",
            component: resolve => {
                require(["@/components/dashboard/controlPanel"], resolve);
            }
        },
        {
            path: "teacherMain",
            component: resolve => {
                require([
                    "@/components/students/studentGroup/studentMain"
                ], resolve);
            },
            // redirect: to=>{ return { path: '/homePage/teacherMain/groupPeople' } },
            redirect: { path: "studentAllCourse/studentHome" },
            children: [
                {
                    path: "groupFiles",
                    name: "Course_teacherMain_studentFiles",
                    component: resolve => {
                        require(["@/components/course/files/files"], resolve);
                    }
                },

                {
                    path: "groupPeople",
                    name: "Course_teacherMain_groupPeople_1",
                    component: resolve => {
                        require([
                            "@/components/students/studentGroup/groupPeople"
                        ], resolve);
                    }
                },
                {
                    path: "groupDiscussionAdmit",
                    name: "Course_teacherMain_studentDiscussions_3",
                    component: resolve => {
                        require([
                            "@/components/students/studentGroup/groupDiscussion/groupDiscussionAdmit"
                        ], resolve);
                    }
                },
                {
                    path: "groupDiscussionCreateList",
                    name: "Course_teacherMain_studentDiscussions_1",
                    component: resolve => {
                        require([
                            "@/components/students/studentGroup/groupDiscussion/groupDiscussionCreateList"
                        ], resolve);
                    }
                },
                {
                    path: "groupDiscussionDetail",
                    name: "Course_teacherMain_studentDiscussions_2",
                    component: resolve => {
                        require([
                            "@/components/students/studentGroup/groupDiscussion/groupDiscussionDetail"
                        ], resolve);
                    }
                },
                {
                    path: "groupAnnouncementCreate",
                    name: "Course_teacherMain_studentAnnouncement_1",
                    component: resolve => {
                        require([
                            "@/components/students/studentGroup/groupAnnouncement/groupAnnouncementCreate"
                        ], resolve);
                    }
                },
                {
                    path: "groupAnnouncementAdmit",
                    name: "Course_teacherMain_studentAnnouncement_2",
                    component: resolve => {
                        require([
                            "@/components/students/studentGroup/groupAnnouncement/groupAnnouncementAdmit"
                        ], resolve);
                    }
                },
                {
                    path: "groupAnnouncementCreateList",
                    name: "Course_teacherMain_studentAnnouncement_3",
                    component: resolve => {
                        require([
                            "@/components/students/studentGroup/groupAnnouncement/groupAnnouncementCreateList"
                        ], resolve);
                    }
                },
                {
                    path: "groupAnnouncementDetail",
                    name: "Course_teacherMain_studentAnnouncement_4",
                    component: resolve => {
                        require([
                            "@/components/students/studentGroup/groupAnnouncement/groupAnnouncementDetail"
                        ], resolve);
                    }
                }
            ]
        },
        // end: 小组部分
        {
            path: "allCourse",
            component: allCourse,
            name: "Course_allCourse",

            children: [
                // start: 测验模块
                {
                    path: "quizzes",
                    name: "Course_allCourse_quizzes_1",
                    component: quizzes
                },
                {
                    path: "courseQuizz",
                    name: "Course_allCourse_quizzes_2",
                    component: resolve => {
                        require([
                            "@/components/course/quizz/courseQuizz"
                        ], resolve);
                    }
                },
                {
                    path: "quizzAnswer",
                    name: "Course_allCourse_quizzes_3",
                    component: resolve => {
                        require([
                            "@/components/course/quizz/quizzAnswer"
                        ], resolve);
                    }
                },
                {
                    path: "quizzList",
                    name: "Course_allCourse_quizzes_4",
                    component: resolve => {
                        require([
                            "@/components/course/quizz/quizzList"
                        ], resolve);
                    }
                },
                {
                    path: "mondifyQuizz",
                    name: "Course_allCourse_quizzes_5",
                    component: resolve => {
                        require([
                            "@/components/course/quizz/mondifyQuizz"
                        ], resolve);
                    }
                },
                // end: 测验模块

                // start: 作业
                {
                    path: "assignments",
                    name: "Course_allCourse_assignments_1",
                    component: assignments
                },
                {
                    path: "assignmentPreView",
                    name: "Course_allCourse_assignments_2",
                    component: assignmentPreView
                },
                {
                    path: "assignmentdetail",
                    name: "Course_allCourse_assignments_3",
                    component: assignmentdetail
                },
                // {
                //   path: 'fileView',
                //   name: 'Course_allCourse_assignments_4',
                //   component: fileView,
                // },
                // end: 作业
                {
                    path: "home",
                    name: "Course_allCourse_home",
                    component: home
                },
                {
                    path: "modules",
                    name: "Course_allCourse_modules",
                    component: modules
                },
                {
                    path: "fileView",
                    name: "Course_allCourse_modules_1",
                    component: fileView
                },
                // start: 公告
                {
                    path: "announcements",
                    name: "Course_allCourse_announcements_1",
                    component: announcements
                },
                {
                    path: "announcementCreate",
                    name: "Course_allCourse_announcements_2",
                    component: announcementCreate
                },
                {
                    path: "announcementAdmit",
                    name: "Course_allCourse_announcements_3",
                    component: announcementAdmit
                },
                {
                    path: "announcementDetail",
                    name: "Course_allCourse_announcements_4",
                    component: announcementDetail
                },
                {
                    path: "announcementList",
                    name: "Course_allCourse_announcements_5",
                    component: announcementList
                },
                // end: 公告
                {
                    path: "people",
                    name: "Course_allCourse_people",
                    component: people
                },
                {
                    path: "files",
                    name: "Course_allCourse_files",
                    component: resolve => {
                        require(["@/components/course/files/files"], resolve);
                    }
                },

                // srart: 评分
                {
                    path: "grades",
                    name: "Course_allCourse_grades_1",
                    component: grades
                },
                {
                    path: "batchGradePage",
                    name: "Course_allCourse_batch Grade",
                    component: resolve => {
                        require([
                            "@/components/course/grades/batchGradePage"
                        ], resolve);
                    }
                },
                {
                    path: "oneGradePage",
                    name: "Course_allCourse_Grade one by one",
                    component: resolve => {
                        require([
                            "@/components/course/grades/gradesTask"
                        ], resolve);
                    }
                },
                {
                    path: "gradeBook",
                    name: "Course_allCourse_grade Book",
                    component: resolve => {
                        require([
                            "@/components/course/grades/gradeBook"
                        ], resolve);
                    }
                },
                {
                    path: "sectionAnalytics",
                    name: "Course_allCourse_grades_3",
                    component: resolve => {
                        require([
                            "@/components/course/grades/sectionAnalytics"
                        ], resolve);
                    }
                },
                {
                    path: "stuAnalytics",
                    name: "Course_allCourse_grades_4",
                    component: resolve => {
                        require([
                            "@/components/course/grades/stuAnalytics"
                        ], resolve);
                    }
                },
                // end: 评分
                {
                    path: "settings",
                    name: "Course_allCourse_settings",
                    component: settings
                },

                // start: 公告
                {
                    path: "announcementCreate",
                    name: "Course_allCourse_announcements_10",
                    component: announcementCreate
                },
                {
                    path: "announcementAdmit",
                    name: "Course_allCourse_announcements_20",
                    component: announcementAdmit
                },
                {
                    path: "announcementList",
                    name: "Course_allCourse_announcements_30",
                    component: announcementList
                },
                {
                    path: "announcementDetail",
                    name: "Course_allCourse_announcements_40",
                    component: announcementDetail
                },
                // end: 公告
                // start:大纲
                {
                    path: "syllabus",
                    name: "Course_allCourse_syllabus",
                    component: syllabus
                },
                // end: 大纲
                // start: 讨论
                {
                    path: "discussions",
                    name: "Course_allCourse_discussions_1",
                    component: discussions
                },
                {
                    path: "discussionDeatilCourse",
                    name: "Course_allCourse_discussions_2",
                    component: discussionDeatilCourse
                },
                {
                    path: "discussionAdmit",
                    name: "Course_allCourse_discussions_3",
                    component: discussionAdmit
                },
                {
                    path: "discussionCreateList",
                    name: "Course_allCourse_discussions_4",
                    component: discussionCreateList
                },
                // end: 讨论
                // start: 直播
                {
                    path: "liveMain",
                    name: "Course_allCourse_Lives",
                    component: resolve => {
                        require([
                            "@/components/course/lives/liveMain"
                        ], resolve);
                    },
                    redirect: { path: "/homePage/allCourse/liveMain/liveList" },
                    children: [
                        {
                            path: "liveList",
                            name: "Course_allCourse_Lives_1",
                            component: resolve => {
                                require([
                                    "@/components/course/lives/liveList"
                                ], resolve);
                            }
                        },
                        {
                            path: "liveEdit",
                            name: "Course_allCourse_Lives_2",
                            component: resolve => {
                                require([
                                    "@/components/course/lives/liveEdit"
                                ], resolve);
                            }
                        },
                        {
                            path: "liveDetail",
                            name: "Course_allCourse_Lives_3",
                            component: resolve => {
                                require([
                                    "@/components/course/lives/liveDetail"
                                ], resolve);
                            }
                        }
                    ]
                }
                // end: 直播
            ]
        },

        {
            path: "homeCourse",
            name: "Course",
            component: resolve => {
                require(["@/components/course/homeCourse/homeCourse"], resolve);
            }
        },
        {
            path: "courseResource",
            name: "Course_2",
            component: resolve => {
                require([
                    "@/components/course/homeCourse/courseResource"
                ], resolve);
            }
        },
        {
            path: "homeCourseList",
            name: "Resource_m",
            component: resolve => {
                require([
                    "@/components/course/homeCourse/homeCourseList"
                ], resolve);
            }
        },
        // start: 日历
        {
            path: "caleadarWatch",
            name: "Calendar_1",
            component: resolve => {
                require(["@/components/calendar/caleadarWatch"], resolve);
            }
        },
        {
            path: "calanederEvent",
            name: "Calendar_2",
            component: resolve => {
                require(["@/components/calendar/calanederEvent"], resolve);
            }
        },
        {
            path: "calanederDetail",
            name: "Calendar_3",
            component: resolve => {
                require(["@/components/calendar/calanederDetail"], resolve);
            }
        },
        // end: 日历
        // start:消息
        {
            path: "messageLeft",
            component: resolve => {
                require(["@/components/messages/messageLeft"], resolve);
            },
            name: "Message",
            children: [
                {
                    path: "messageAdmit",
                    name: "Message_1",
                    component: resolve => {
                        require([
                            "@/components/messages/messageAdmit"
                        ], resolve);
                    }
                },
                {
                    path: "messageList",
                    name: "Message_2",
                    component: resolve => {
                        require(["@/components/messages/messageList"], resolve);
                    }
                },
                {
                    path: "messageDetail",
                    name: "Message_3",
                    component: resolve => {
                        require([
                            "@/components/messages/messageDetail"
                        ], resolve);
                    }
                }
                // {
                //     path: 'messagePanel',
                //     name: 'Message_4',
                //     component: (resolve) => {
                //         require([
                //             '@/components/messages/messagePanel',
                //         ], resolve);
                //     },
                // },
            ]
        },
        // end:消息
        // start认证模块
        {
            path: "certificationList",
            name: "Certification_1",
            component: resolve => {
                require([
                    "@/components/certification/certificationList"
                ], resolve);
            }
        },
        {
            path: "certificationDetail",
            name: "Certification_2",
            component: resolve => {
                require([
                    "@/components/certification/certificationDetail"
                ], resolve);
            }
        },
        // end认证模块
        // start: 资源
        {
            path: "resourceEdit",
            name: "Resource_19",
            component: resolve => {
                require(["@/components/resource/resourceEdit"], resolve);
            }
        },
        {
            path: "resourceMain",
            name: "Resource",
            component: resolve => {
                require(["@/components/resource/resourceMain"], resolve);
            },

            redirect: {
                path: "resourceMain/resourceList",
                query: { type: "All" }
            },
            children: [
                {
                    path: "resourceList",
                    name: "Resource_1",
                    component: resolve => {
                        require([
                            "@/components/resource/resourceList"
                        ], resolve);
                    }
                },
                {
                    path: "resourceDetail",
                    name: "Resource_2",
                    component: resolve => {
                        require([
                            "@/components/resource/resourceDetail"
                        ], resolve);
                    }
                },
                {
                    path: "resourceStatus",
                    name: "Resource_4",
                    component: resolve => {
                        require([
                            "@/components/resource/resourceStatus"
                        ], resolve);
                    }
                }
            ]
        },
        {
            path: "resImportUrl",
            name: "Resource_6",
            component: resolve => {
                require(["@/components/resource/resImportUrl"], resolve);
            }
        }

        // end: 资源
    ]
};
const studentRouters = {
    path: "/studentHomePage",
    component: studentHomePage,
    name: "studentHomePage",
    // redirect: { path: '/studentHomePage/studentHomeCourse'},
    children: [
        {
            path: "studentPersonal",
            name: "saccount",
            component: resolve => {
                require(["@/components/account/personalHomepage"], resolve);
            },
            redirect: { path: "studentPersonal/profile" },
            children: [
                {
                    path: "profile",
                    name: "saccount_Profile_s",
                    component: resolve => {
                        require(["@/components/account/profile"], resolve);
                    }
                },
                {
                    path: "setting",
                    name: "saccount_Settings_s",
                    component: resolve => {
                        require(["@/components/account/settings"], resolve);
                    }
                },
                {
                    path: "file",
                    name: "saccount_Files_s",
                    component: resolve => {
                        require([
                            "@/components/students/studentFiles/files.vue"
                        ], resolve);
                    }
                },
                {
                    path: "ePortfolios",
                    name: "saccount_ePortfolios_t",
                    component: resolve => {
                        require([
                            "@/components/account/ePortfolios/ePortView"
                        ], resolve);
                    },
                    redirect: { path: "ePortfolios/ePortIndex" },
                    children: [
                        {
                            path: "ePortIndex",
                            name: "saccount_ePortfolios_t1",
                            component: resolve => {
                                require([
                                    "@/components/account/ePortfolios/ePortIndex"
                                ], resolve);
                            }
                        },
                        {
                            path: "ePortList",
                            name: "saccount_ePortfolios_t2",
                            component: resolve => {
                                require([
                                    "@/components/account/ePortfolios/ePortList"
                                ], resolve);
                            }
                        },
                        {
                            path: "ePortPages",
                            name: "saccount_ePortfolios_t3",
                            component: resolve => {
                                require([
                                    "@/components/account/ePortfolios/ePortPages"
                                ], resolve);
                            }
                        }
                    ]
                }
            ]
        },
        {
            path: "studentControlPanel",
            name: "sDashboard",
            component: studentControlPanel
        },
        {
            path: "studentHomeCourse",
            name: "sCourse",
            component: studentHomeCourse
        },
        {
            path: "studentAllCourse",
            name: "sCourse_sAllCourse",
            component: studentAllCourse,
            redirect: { path: "studentAllCourse/studentHome" },
            children: [
                // 公告
                {
                    path: "studentAnnouncement",
                    name: "sCourse_sAllCourse_studentAnnouncement_1",
                    component: studentAnnouncement
                },
                {
                    path: "studentAnnouncementDeatil",
                    name: "sCourse_sAllCourse_studentAnnouncement_2",
                    component: studentAnnouncementDeatil
                },
                {
                    path: "studentAnnouncementCreateList",
                    name: "sCourse_sAllCourse_studentAnnouncement_3",
                    component: studentAnnouncementCreateList
                },
                {
                    path: "studentModules",
                    name: "sCourse_sAllCourse_studentModules",
                    component: studentModules
                },
                {
                    path: "studentfileView",
                    name: "sCourse_sAllCourse_studentModules_1",
                    component: studentfileView
                },
                // 大纲
                {
                    path: "studentsyllabus",
                    name: "sCourse_sAllCourse_studentsyllabus",
                    component: studentsyllabus
                },
                // 作业
                {
                    path: "studentAssignments",
                    name: "sCourse_sAllCourse_studentAssignments_1",
                    component: studentAssignments
                },
                {
                    path: "studentAssignmentDetail",
                    name: "sCourse_sAllCourse_studentAssignments_2",
                    component: studentAssignmentDetail
                },
                {
                    path: "studentAssignmentSubmit",
                    name: "sCourse_sAllCourse_studentAssignments_3",
                    component: studentAssignmentSubmit
                },
                // {
                //   path: 'fileView',
                //   name: 'sCourse_sAllCourse_studentAssignments_4',
                //   component: fileView,
                // },
                // start: 讨论
                {
                    path: "studentDiscussions",
                    name: "sCourse_sAllCourse_studentDiscussions_1",
                    component: studentDiscussions
                },
                {
                    path: "studentCourseDiscussionCreateList",
                    name: "sCourse_sAllCourse_studentDiscussions_2",
                    component: studentCourseDiscussionCreateList
                },
                {
                    path: "studentCourseDiscussionAdmit",
                    name: "sCourse_sAllCourse_studentDiscussions_3",
                    component: studentCourseDiscussionAdmit
                },
                {
                    path: "studentCourseDiscussionDetail",
                    name: "sCourse_sAllCourse_studentDiscussions_4",
                    component: studentCourseDiscussionDetail
                },
                // end: 讨论
                // start: 直播
                {
                    path: "liveMain",
                    name: "Course_allCourse_studentLives",
                    component: resolve => {
                        require([
                            "@/components/course/lives/liveMain"
                        ], resolve);
                    },
                    redirect: {
                        path:
                            "/studentHomePage/studentAllCourse/liveMain/liveList"
                    },
                    children: [
                        {
                            path: "liveList",
                            name: "Course_allCourse_studentLives_1",
                            component: resolve => {
                                require([
                                    "@/components/course/lives/liveList"
                                ], resolve);
                            }
                        },
                        {
                            path: "liveEdit",
                            name: "Course_allCourse_studentLives_2",
                            component: resolve => {
                                require([
                                    "@/components/course/lives/liveEdit"
                                ], resolve);
                            }
                        },
                        {
                            path: "liveDetail",
                            name: "Course_allCourse_studentLives_3",
                            component: resolve => {
                                require([
                                    "@/components/course/lives/liveDetail"
                                ], resolve);
                            }
                        }
                    ]
                },
                // end: 直播
                {
                    path: "studentGrades", // 评分
                    name: "sCourse_sAllCourse_studentGrades",
                    component: studentGrades
                },
                {
                    path: "studentPeople", // 人员
                    name: "sCourse_sAllCourse_studentPeople",
                    component: studentPeople
                },
                {
                    path: "studentFiles", // 文件
                    name: "sCourse_sAllCourse_studentFiles",
                    component: resolve => {
                        require([
                            "@/components/students/studentFiles/files"
                        ], resolve);
                    }
                },

                // {
                //   path: 'studentPages',
                //   component: studentPages,
                // },
                /* {
          path: 'studentQuizzes',
          component: studentQuizzes,
        }, */
                // start: 测验
                {
                    path: "studentQuizzess",
                    name: "sCourse_sAllCourse_studentQuizzes_1",
                    component: resolve => {
                        require([
                            "@/components/students/studentCourse/studentQuizz/studentQuizzess"
                        ], resolve);
                    }
                },
                {
                    path: "quizzDetail",
                    name: "sCourse_sAllCourse_studentQuizzes_2",
                    component: resolve => {
                        require([
                            "@/components/students/studentCourse/studentQuizz/quizzDetail"
                        ], resolve);
                    }
                },
                // end:测验
                {
                    path: "studentHome",
                    name: "sCourse_sAllCourse_studentHome",
                    component: resolve => {
                        require([
                            "@/components/students/studentCourse/studentHome"
                        ], resolve);
                    }
                }
            ]
        },
        {
            path: "studentCourseList",
            name: "sCourse_2",
            component: resolve => {
                require([
                    "@/components/course/homeCourse/homeCourseList"
                ], resolve);
            }
        },
        {
            path: "studentGroup",
            name: "sGroup",
            component: resolve => {
                require([
                    "@/components/students/studentGroup/studentGroup"
                ], resolve);
            }
        },

        {
            path: "studentMain",
            name: "sGroup_groupMain",
            component: resolve => {
                require([
                    "@/components/students/studentGroup/studentMain"
                ], resolve);
            },
            redirect: () => ({
                path: "/studentHomePage/studentMain/groupPeople"
            }),
            children: [
                {
                    path: "groupFiles",
                    name: "sGroup_groupMain_studentFiles",
                    component: resolve => {
                        require([
                            "@/components/students/studentFiles/files"
                        ], resolve);
                    }
                },
                {
                    path: "groupPeople",
                    name: "sGroup_groupMain_groupPeople",
                    component: resolve => {
                        require([
                            "@/components/students/studentGroup/groupPeople"
                        ], resolve);
                    }
                },
                {
                    path: "groupDiscussionAdmit",
                    name: "sGroup_groupMain_studentDiscussions_1",
                    component: resolve => {
                        require([
                            "@/components/students/studentGroup/groupDiscussion/groupDiscussionAdmit"
                        ], resolve);
                    }
                },
                {
                    path: "groupDiscussionCreateList",
                    name: "sGroup_groupMain_studentDiscussions_2",
                    component: resolve => {
                        require([
                            "@/components/students/studentGroup/groupDiscussion/groupDiscussionCreateList"
                        ], resolve);
                    }
                },
                {
                    path: "groupDiscussionDetail",
                    name: "sGroup_groupMain_studentDiscussions_3",
                    component: resolve => {
                        require([
                            "@/components/students/studentGroup/groupDiscussion/groupDiscussionDetail"
                        ], resolve);
                    }
                },
                {
                    path: "groupDiscussionDetail1",
                    name: "sGroup_groupMain_studentDiscussions_4",
                    component: resolve => {
                        require([
                            "@/components/students/studentGroup/groupDiscussion/groupDiscussionDetail"
                        ], resolve);
                    }
                },
                {
                    path: "groupAnnouncementCreate",
                    name: "sGroup_groupMain_studentAnnouncement_1",
                    component: resolve => {
                        require([
                            "@/components/students/studentGroup/groupAnnouncement/groupAnnouncementCreate"
                        ], resolve);
                    }
                },
                {
                    path: "groupAnnouncementAdmit",
                    name: "sGroup_groupMain_studentAnnouncement_2",
                    component: resolve => {
                        require([
                            "@/components/students/studentGroup/groupAnnouncement/groupAnnouncementAdmit"
                        ], resolve);
                    }
                },
                {
                    path: "groupAnnouncementCreateList",
                    name: "sGroup_groupMain_studentAnnouncement_3",
                    component: resolve => {
                        require([
                            "@/components/students/studentGroup/groupAnnouncement/groupAnnouncementCreateList"
                        ], resolve);
                    }
                },
                {
                    path: "groupAnnouncementDetail",
                    name: "sGroup_groupMain_studentAnnouncement_4",
                    component: resolve => {
                        require([
                            "@/components/students/studentGroup/groupAnnouncement/groupAnnouncementDetail"
                        ], resolve);
                    }
                }
            ]
        },
        {
            path: "studentCalendarWatch",
            name: "sCalendar_1",
            component: resolve => {
                require([
                    "@/components/students/studentCalendar/caleadarWatch"
                ], resolve);
            }
        },
        {
            path: "studentCalanederEvent",
            name: "sCalendar_2",
            component: resolve => {
                require([
                    "@/components/students/studentCalendar/calanederEvent"
                ], resolve);
            }
        },
        {
            path: "studentCalanederDetail",
            name: "sCalendar_3",
            component: resolve => {
                require([
                    "@/components/students/studentCalendar/calanederDetail"
                ], resolve);
            }
        },
        // start:消息
        {
            path: "studentMessageLeft",
            component: resolve => {
                require(["@/components/messages/messageLeft"], resolve);
            },
            name: "sMessage",
            children: [
                {
                    path: "studentMessageAdmit",
                    name: "sMessage_1",
                    component: resolve => {
                        require([
                            "@/components/messages/messageAdmit"
                        ], resolve);
                    }
                },
                {
                    path: "studentMessageList",
                    name: "sMessage_2",
                    component: resolve => {
                        require(["@/components/messages/messageList"], resolve);
                    }
                },
                {
                    path: "studentMessageDetail",
                    name: "sMessage_3",
                    component: resolve => {
                        require([
                            "@/components/messages/messageDetail"
                        ], resolve);
                    }
                }
            ]
        },
        // end:消息
        // start认证模块
        {
            path: "studentCertificationList",
            name: "sCertification_1",
            component: resolve => {
                require([
                    "@/components/certification/certificationList"
                ], resolve);
            }
        },
        {
            path: "studentCertificationDetail",
            name: "sCertification_2",
            component: resolve => {
                require([
                    "@/components/certification/certificationDetail"
                ], resolve);
            }
        }
        // end认证模块
    ]
};
const adminRouters = {
    path: "/adminHomePage",
    component: adminHomePage,
    redirect: { path: "/adminHomePage/adminCourseAll" },
    children: [
        {
            path: "account",
            name: "Aaccount",
            component: resolve => {
                require(["@/components/account/personalHomepage"], resolve);
            },
            redirect: { path: "account/profile" },
            children: [
                {
                    path: "profile",
                    name: "Aaccount_Profile_a",
                    component: resolve => {
                        require(["@/components/account/profile"], resolve);
                    }
                },
                {
                    path: "setting",
                    name: "Aaccount_Settings_a",
                    component: resolve => {
                        require(["@/components/account/settings"], resolve);
                    }
                },
                {
                    path: "file",
                    name: "Aaccount_Files_a",
                    component: resolve => {
                        require([
                            "@/components/course/files/files.vue"
                        ], resolve);
                    }
                },
                {
                    path: "ePortfolios",
                    name: "Aaccount_ePortfolios_t",
                    component: resolve => {
                        require([
                            "@/components/account/ePortfolios/ePortView"
                        ], resolve);
                    },
                    redirect: { path: "ePortfolios/ePortIndex" },
                    children: [
                        {
                            path: "ePortIndex",
                            name: "Aaccount_ePortfolios_t1",
                            component: resolve => {
                                require([
                                    "@/components/account/ePortfolios/ePortIndex"
                                ], resolve);
                            }
                        },
                        {
                            path: "ePortList",
                            name: "Aaccount_ePortfolios_t2",
                            component: resolve => {
                                require([
                                    "@/components/account/ePortfolios/ePortList"
                                ], resolve);
                            }
                        },
                        {
                            path: "ePortPages",
                            name: "Aaccount_ePortfolios_t3",
                            component: resolve => {
                                require([
                                    "@/components/account/ePortfolios/ePortPages"
                                ], resolve);
                            }
                        }
                    ]
                }
            ]
        },
        {
            path: "adminCourseAll",
            name: "ACourse",
            component: adminCourseAll
        },
        {
            path: "coursesettings",
            name: "ACourse_1",
            component: coursesettings
        },
        {
            path: "adminPeople",
            name: "Apeople_1",
            component: adminPeople
        },
        {
            path: "peopleDetail",
            name: "Apeople_2",
            component: peopleDetail
        },
        {
            path: "subAccount",
            name: "AsubAccount",
            component: subAccount
        },
        {
            path: "terms",
            name: "Aterms",
            component: terms
        },
        {
            path: "sisImport",
            name: "sisImport_1",
            component: resolve => {
                require([
                    "@/components/admin/adminSisImport/sisImport"
                ], resolve);
            }
        },
        {
            path: "sisImportList",
            name: "sisImport_2",
            component: resolve => {
                require([
                    "@/components/admin/adminSisImport/sisImportList"
                ], resolve);
            }
        },
        {
            path: "sisImporting",
            name: "sisImport_3",
            component: resolve => {
                require([
                    "@/components/admin/adminSisImport/sisImporting"
                ], resolve);
            }
        },
        {
            path: "adminSettings",
            name: "aSettings",
            component: adminSettings
        },
        {
            path: "adminResource",
            name: "aResource",
            component: resolve => {
                require([
                    "@/components/admin/adminRescourse/rescourseView"
                ], resolve);
            },
            redirect: {
                path: "/adminHomePage/adminResource/adminRescourseList"
            },
            children: [
                {
                    path: "adminRescourseList",
                    name: "aResource_1",
                    component: resolve => {
                        require([
                            "@/components/admin/adminRescourse/adminRescourse"
                        ], resolve);
                    }
                },
                {
                    path: "adminResourceSet",
                    name: "aResource_2",
                    component: resolve => {
                        require([
                            "@/components/admin/adminRescourse/adminRescourseSet"
                        ], resolve);
                    }
                },
                {
                    path: "adminResDetail",
                    name: "aResource_3",
                    component: resolve => {
                        require([
                            "@/components/resource/resourceDetail"
                        ], resolve);
                    }
                },
                {
                    path: "adminResEdit",
                    name: "aResource_4",
                    component: resolve => {
                        require([
                            "@/components/resource/resourceEdit"
                        ], resolve);
                    }
                }
            ]
        },
        //* ****************认证模块路由start**************
        {
            path: "adminCertificationList",
            name: "adminCertificationList_1",
            component: resolve => {
                require([
                    "@/components/admin/adminCertifications/adminCertificationList"
                ], resolve);
            }
        },
        {
            path: "adminCertificationAdmit",
            name: "adminCertificationList_2",
            component: resolve => {
                require([
                    "@/components/admin/adminCertifications/adminCertificationAdmit"
                ], resolve);
            }
        },
        {
            path: "adminCertificationDetailLeft",
            name: "adminCertificationList_3",
            component: resolve => {
                require([
                    "@/components/admin/adminCertifications/adminCertificationDetailLeft"
                ], resolve);
            },
            children: [
                {
                    path: "adminCertificationDetail",
                    name: "adminCertificationList_4",
                    component: resolve => {
                        require([
                            "@/components/admin/adminCertifications/adminCertificationDetail"
                        ], resolve);
                    }
                },
                {
                    path: "adminCertificationLearnersList",
                    name: "adminCertificationList_5",
                    component: resolve => {
                        require([
                            "@/components/admin/adminCertifications/adminLearnersList"
                        ], resolve);
                    }
                }
            ]
        }

        //* ****************认证模块路由end**************
    ]
};
function visitRouters(rootRouters, fn) {
    fn(rootRouters);
    if (rootRouters.children && rootRouters.children.length) {
        for (let i = 0, len = rootRouters.children.length; i < len; i += 1) {
            visitRouters(rootRouters.children[i], fn);
        }
    }
}

// 给路由加上权限, admin [1] teacher [2, 3] student  [4]
/* eslint-disable no-param-reassign */
visitRouters(teacherRouters, router => {
    router.meta = router.meta || {};
    router.meta.access = [2, 3];
});
visitRouters(studentRouters, router => {
    router.meta = router.meta || {};
    router.meta.access = [4];
});
visitRouters(adminRouters, router => {
    router.meta = router.meta || {};
    router.meta.access = [1];
});
/* eslint-enable no-param-reassign */

const allRouters = [
    ...loginRouters,
    teacherRouters,
    studentRouters,
    adminRouters
];
const router = new Router({
    routes: allRouters
});
export const roleHomePath = {
    1: "/adminHomePage/adminCourseAll",
    2: "/homePage/controlPanel",
    3: "/homePage/controlPanel",
    4: "/studentHomePage/studentControlPanel"
};
function canAccess(router, userType) {
    if (!router.meta || !router.meta.access) {
        // 无权限控制, 如login/signUp等
        return true;
    }
    // 不用indexOf, 防止 '1'跟 1比较的情况
    return router.meta.access.some(access => access === userType);
}
function turnTo(to, userType, next) {
    if (to.path === "/" || to.path === "/login") {
        next({
            path: roleHomePath[userType]
        });
        return;
    }
    if (canAccess(to, userType)) {
        next();
    } else {
        // 重定向到现角色下的默认页
        next({
            path: roleHomePath[userType]
        });
    }
}

const LOGIN_PATH = "/";
const LOGIN_WHITELIST = loginRouters.map(i => i.path).slice(1);
router.beforeEach((to, from, next) => {
    if (to.matched.length > 1) {
        const firstPath = to.matched[0].path;
        if (LOGIN_WHITELIST.indexOf(firstPath) > -1) {
            next();
            return;
        }
    }
    if (LOGIN_WHITELIST.indexOf(to.path) > -1) {
        next();
        return;
    }
    if ((to.path === "/" || to.path === "/login") && to.query.force) {
        next();
        return;
    }
    if (store.state.hasUserInfo) {
        turnTo(to, store.state.userInfo.type, next);
    } else {
        store
            .dispatch("getUserInfo")
            .then(data => {
                if (
                    Number(data.code) === 200 &&
                    data.entity &&
                    data.entity.id !== undefined
                ) {
                    const userInfo = data.entity;
                    turnTo(to, userInfo.type, next);
                } else if (to.path !== "/" && to.path !== "/login") {
                    next({ path: LOGIN_PATH });
                } else {
                    next();
                }
            })
            .catch(e => {
                next({ path: LOGIN_PATH });
                console.log(e);
            });
    }
});

export default router;
