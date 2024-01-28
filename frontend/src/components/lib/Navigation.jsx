import { PiStudent, PiExam, PiBank } from "react-icons/pi"
import { SlSettings } from "react-icons/sl"
import { HiOutlineLogout } from "react-icons/hi"
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
        icon: <SlSettings className="w-6 h-6"/>,
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