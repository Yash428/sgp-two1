import { PiStudent, PiExam, PiBank } from "react-icons/pi"
import { SlSettings } from "react-icons/sl"
import { HiOutlineLogout } from "react-icons/hi"
import { CgMoreVerticalR } from "react-icons/cg";
import { MdOutlineEditCalendar } from "react-icons/md";
export const STUDENT_DASHBOARD_SIDEBAR_LINKS = [
    {
        key: "studentDashboard",
        title: "Student Dashboard",
        label: "Dashboard",
        icon: <PiStudent className="w-6 h-6"/>,
        path: "/student",
    },
    {
        key: "studentAttendance",
        label: "Attendance",
        title: "Student Attendance",
        icon: <PiExam className="w-6 h-6"/>,
        path: "/student/attendance",
    },
    {
        key: "exam",
        label: "Exam",
        title: "Exam",
        icon: <PiBank className="w-6 h-6"/>,
        path: "/student/exam",
    },
    {
        key: "leave",
        label: "Leave Application",
        title: "Leave",
        icon: <MdOutlineEditCalendar className="w-6 h-6"/>,
        path: "/student/leave",
    },
    {
        key: "more",
        label: "More",
        title: "More",
        icon: <SlSettings className="w-6 h-6"/>,
        path: "/student/more",
    }
]
export const STUDENT_DASHBOARD_SIDEBAR_BOTTOM_LINKS = [
    {
        key: "settings",
        label: "Settings",
        title: "Settings",
        icon: <SlSettings className="w-6 h-6"/>,
        path: "/student/settings",
    }
]

export const TEACHER_DASHBOARD_SIDEBAR_LINKS = [
    {
        key: "teacherDashboard",
        title: "Teacher Dashboard",
        label: "Dashboard",
        icon: <PiStudent className="w-6 h-6"/>,
        path: "/teacher",
    },
    {
        key: "students",
        label: "Students",
        title: "Students",
        icon: <PiExam className="w-6 h-6"/>,
        path: "/teacher/students"
    },
    {
        key: "parents",
        label: "Parents",
        title: "Parents",
        icon: <PiBank className="w-6 h-6"/>,
        path: "/teacher/parents"
    },
    {
        key: "exam",
        label: "Exam",
        title: "Exam",
        icon: <PiBank className="w-6 h-6"/>,
        path: "/teacher/exam"
    },
    {
        key: 'course',
        label: 'Course',
        title: 'Course',
        icon: <PiBank className="w-6 h-6"/>,
        path: "/teacher/course"
    },
    {
        key: "accounts",
        label: "Accounts",
        title: "Accounts",
        icon: <PiBank className="w-6 h-6"/>,
        path: "/teacher/accounts"
    },
    {
        key: "more",
        label: "More",
        title: "More",
        icon: <CgMoreVerticalR className="w-6 h-6"/>,
        path: "/teacher/more",
    }
]

export const TEACHER_DASHBOARD_SIDEBAR_BOTTOM_LINKS = [
    {
        key: "settings",
        label: "Settings",
        title: "Settings",
        icon: <SlSettings className="w-6 h-6"/>,
        path: "/teacher/settings",
    }
]

export const ADMIN_DASHBOARD_SIDEBAR_LINKS = [
    {
        key: "adminDashboard",
        label: "Dashboard",
        title: "Dashboard",
        icon: <PiStudent className="w-6 h-6"/>,
        path: "/admin",
    },
    {
        key: "teachers",
        label: "Teachers",
        title: "Teachers",
        icon: <PiExam className="w-6 h-6"/>,
        path: "/admin/teachers"
    },
    {
        key: "students",
        label: "Students",
        title: "Students",
        icon: <PiExam className="w-6 h-6"/>,
        path: "/admin/students"
    },
    {
        key: "parents",
        label: "Parents",
        title: "Parents",
        icon: <PiBank className="w-6 h-6"/>,
        path: "/admin/parents"
    },
    {
        key: "exam",
        label: "Exam",
        title: "Exam",
        icon: <PiBank className="w-6 h-6"/>,
        path: "/admin/exam"
    },
    {
        key: 'course',
        label: 'Course',
        title: 'Course',
        icon: <PiBank className="w-6 h-6"/>,
        path: "/admin/course"
    },
    {
        key: "accounts",
        label: "Accounts",
        title: "Accounts",
        icon: <PiBank className="w-6 h-6"/>,
        path: "/admin/accounts"
    },
    {
        key: "more",
        label: "More",
        title: "More",
        icon: <CgMoreVerticalR className="w-6 h-6"/>,
        path: "/admin/more",
    }
]

export const ADMIN_DASHBOARD_SIDEBAR_BOTTOM_LINKS = [
    {
        key: "settings",
        label: "Settings",
        title: "Settings",
        icon: <SlSettings className="w-6 h-6"/>,
        path: "/admin/settings",
    },
    
]

export const TEACHER_DASHBOARD_STUDENT_LINKS = [
    
    {
        key: "attendance",
        label: "Attendance",
        title: "Attendance",
        icon: <PiExam className="w-6 h-6"/>,
        path: "/teacher/students/attendance",
    },
    {
        key: "timetable",
        label: "Timetable",
        title: "Timetable",
        icon: <PiExam className="w-6 h-6"/>,
        path: "/teacher/students/timetable",
    },
    {
        key: "leave",
        label: "Leave Applications",
        title: "Leave Application",
        icon: <PiExam className="w-6 h-6"/>,
        path: "/teacher/students/leaveApplications",
    },
    {
        key: "profiles",
        label: "Student Profiles",
        title: "Student Profiles",
        icon: <PiExam className="w-6 h-6"/>,
        path: "/teacher/students/studentProfiles",
    },
    {
        key: "passwords",
        label: "Student Passwords",
        title: "Student Passwords",
        icon: <PiExam className="w-6 h-6"/>,
        path: "/teacher/students/studentPasswords",
    },
    {
        key: "report",
        label: "Student Report",
        title: "Download Student Report",
        icon: <PiExam className="w-6 h-6"/>,
        path: "/teacher/studentReport",
    }
]

export const ADMIN_DASHBOARD_STUDENT_LINKS = [
    {
        key: "addStudent",
        label: "Add Student",
        title: "Add Student",
        icon: <PiExam className="w-6 h-6"/>,
        path: "/admin/students/addStudent",
    },
    {
        key: "studentDatabase",
        label: "Student Database",
        title: "Student Database",
        icon: <PiExam className="w-6 h-6"/>,
        path: "/admin/students/studentDatabase",
    },
    {
        key: "attendance",
        label: "Attendance",
        title: "Attendance",
        icon: <PiExam className="w-6 h-6"/>,
        path: "/admin/students/attendance",
    },
    {
        key: "studentLeave",
        label: "Student Leave Applications",
        title: "Student Leave",
        icon: <PiExam className="w-6 h-6"/>,
        path: "/admin/students/studentLeave",
    },
    {
        key: "studentReports",
        label: "Student Reports",
        title: "Student Reports",
        icon: <PiExam className="w-6 h-6"/>,
        path: "/admin/students/studentReports",
    },
    {
        key: "performance",
        label: "Student Performance",
        title: "Student Performance",
        icon: <PiExam className="w-6 h-6"/>,
        path: "/admin/students/performance",
    },
    {
        key: "timeTable",
        label: "Time Table",
        title: "Time Table",
        icon: <PiExam className="w-6 h-6"/>,
        path: "/admin/students/timeTable",
    }
]
export const PARENT_DASHBOARD_SIDEBAR_LINKS = [
    {
        key: "studentDashboard",
        title: "Student Dashboard",
        label: "Dashboard",
        icon: <PiStudent className="w-6 h-6"/>,
        path: "/parent",
    },
    {
        key: "studentAttendance",
        label: "Attendance",
        title: "Student Attendance",
        icon: <PiExam className="w-6 h-6"/>,
        path: "/parent/attendance",
    },
    {
        key: "exam",
        label: "Exam",
        title: "Exam",
        icon: <PiBank className="w-6 h-6"/>,
        path: "/parent/exam",
    },
    {
        key: 'leave',
        label: 'Leave Application',
        title: 'Leave',
        icon: <PiBank className="w-6 h-6"/>,
        path: "/parent/leave",
    }
]
export const PARENT_DASHBOARD_SIDEBAR_BOTTOM_LINKS = [
    {
        key: "settings",
        label: "Settings",
        title: "Settings",
        icon: <SlSettings className="w-6 h-6"/>,
        path: "/pardent/settings",
    }
]