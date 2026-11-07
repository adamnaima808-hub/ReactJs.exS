import { useState } from 'react'

const tabs = [
  { id: 'overview', label: 'Overview' },
  { id: 'courses', label: 'Courses' },
  { id: 'assignments', label: 'Assignments' },
  { id: 'announcements', label: 'Announcements' },
]

const stats = [
  { label: 'Average Grade', value: '88%', icon: '📊' },
  { label: 'Courses', value: '3', icon: '📚' },
  { label: 'Study Hours', value: '45h', icon: '⏰' },
  { label: 'Assignments', value: '12', icon: '✍️' },
]

const courses = [
  {
    id: 1,
    name: 'React Fundamentals',
    progress: 75,
    instructor: 'Sarah Wilson',
    nextLesson: 'Components & Props',
    accent: 'from-blue-500 to-cyan-500',
    dot: 'bg-blue-500',
  },
  
  {
    id: 2,
    name: 'JavaScript Advanced',
    progress: 45,
    instructor: 'Mike Johnson',
    nextLesson: 'Async/Await',
    accent: 'from-violet-500 to-purple-500',
    dot: 'bg-violet-500',
  },
  {
    id: 3,
    name: 'UI/UX Design',
    progress: 90,
    instructor: 'Emily Chen',
    nextLesson: 'Color Theory',
    accent: 'from-pink-500 to-rose-500',
    dot: 'bg-pink-500',
  },
]

const assignments = [
  { id: 1, title: 'Build a Todo App', course: 'React Fundamentals', dueDate: '2024-03-20', status: 'pending' },
  { id: 2, title: 'API Integration', course: 'JavaScript Advanced', dueDate: '2024-03-18', status: 'completed' },
  { id: 3, title: 'Design System', course: 'UI/UX Design', dueDate: '2024-03-25', status: 'in-progress' },
]

const announcements = [
  { id: 1, title: 'New Course Available', message: 'Check out our new TypeScript course!', time: '2 hours ago' },
  { id: 2, title: 'Maintenance Notice', message: 'Platform updates scheduled for tonight', time: '5 hours ago' },
]

const statusStyles = {
  completed: 'bg-emerald-100 text-emerald-700 ring-1 ring-emerald-200',
  'in-progress': 'bg-amber-100 text-amber-700 ring-1 ring-amber-200',
  pending: 'bg-rose-100 text-rose-700 ring-1 ring-rose-200',
}

function StudentDashboard() {
  const [activeTab, setActiveTab] = useState('overview')

  return (
    <div className="min-h-screen bg-slate-100 px-4 py-8 text-slate-800">
      <div className="mx-auto max-w-7xl">
        <header className="mb-6 rounded-[28px] bg-white p-6 shadow-sm ring-1 ring-slate-200">
          <div className="flex flex-col gap-5 md:flex-row md:items-center md:justify-between">
            <div>
              <p className="text-sm font-medium uppercase tracking-[0.22em] text-violet-500">Student portal</p>
              <h1 className="mt-2 text-3xl font-bold text-slate-900">Welcome back, Student!</h1>
              <p className="mt-1 text-sm text-slate-500">Here&apos;s what&apos;s happening with your courses today.</p>
            </div>

            <div className="flex items-center gap-4 self-start md:self-auto">
              <div className="relative">
                <span className="absolute -right-1 -top-1 block h-2.5 w-2.5 rounded-full bg-red-500 ring-2 ring-white" />
                <button className="flex h-11 w-11 items-center justify-center rounded-full border border-slate-200 bg-slate-50 text-xl transition hover:border-slate-300 hover:bg-slate-100">
                  🔔
                </button>
              </div>

              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-br from-violet-500 to-pink-500 text-lg font-bold text-white shadow-lg shadow-violet-200">
                S
              </div>
            </div>
          </div>

          <nav className="mt-6 flex flex-wrap gap-2">
            {tabs.map((tab) => {
              const isActive = activeTab === tab.id

              return (
                <button
                  key={tab.id}
                  type="button"
                  onClick={() => setActiveTab(tab.id)}
                  className={[
                    'rounded-full px-4 py-2 text-sm font-medium transition',
                    isActive
                      ? 'bg-slate-900 text-white shadow-sm shadow-slate-200'
                      : 'bg-slate-100 text-slate-600 hover:bg-slate-200',
                  ].join(' ')}
                >
                  {tab.label}
                </button>
              )
            })}
          </nav>
        </header>

        <section className="mb-6 grid grid-cols-1 gap-6 md:grid-cols-4">
          {stats.map((stat) => (
            <div key={stat.label} className="rounded-xl bg-white p-6 shadow-sm">
              <div className="flex items-center">
                <div className="mr-4 text-2xl">{stat.icon}</div>
                <div>
                  <p className="text-sm text-slate-500">{stat.label}</p>
                  <p className="text-2xl font-bold text-slate-800">{stat.value}</p>
                </div>
              </div>
            </div>
          ))}
        </section>

        <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
          <section className="lg:col-span-2">
            <div className="rounded-xl bg-white p-6 shadow-sm">
              <h2 className="mb-4 text-lg font-semibold text-slate-800">Course Progress</h2>
              <div className="space-y-4">
                {courses.map((course) => (
                  <div key={course.id} className="rounded-lg bg-slate-50 p-4">
                    <div className="mb-2 flex items-center justify-between gap-4">
                      <div className="flex items-center gap-3">
                        <span className={`h-3 w-3 rounded-full ${course.dot}`} />
                        <h3 className="font-medium text-slate-800">{course.name}</h3>
                      </div>
                      <span className="text-sm text-slate-500">{course.progress}%</span>
                    </div>

                    <div className="h-2.5 w-full overflow-hidden rounded-full bg-slate-200">
                      <div
                        className={`h-full rounded-full bg-gradient-to-r ${course.accent}`}
                        style={{ width: `${course.progress}%` }}
                      />
                    </div>

                    <div className="mt-2 flex flex-col gap-1 text-sm text-slate-500 sm:flex-row sm:items-center sm:justify-between">
                      <span>Next: {course.nextLesson}</span>
                      <span>{course.instructor}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>

          <aside className="space-y-6">
            <div className="rounded-xl bg-white p-6 shadow-sm">
              <h2 className="mb-4 text-lg font-semibold text-slate-800">Upcoming Assignments</h2>
              <div className="space-y-4">
                {assignments.map((assignment) => (
                  <div key={assignment.id} className="flex items-center justify-between gap-4">
                    <div className="min-w-0">
                      <h3 className="truncate font-medium text-slate-800">{assignment.title}</h3>
                      <p className="text-sm text-slate-500">{assignment.course}</p>
                    </div>
                    <div className="shrink-0 text-right">
                      <span
                        className={[
                          'inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium',
                          statusStyles[assignment.status],
                        ].join(' ')}
                      >
                        {assignment.status}
                      </span>
                      <p className="mt-1 text-xs text-slate-500">Due {assignment.dueDate}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="rounded-xl bg-white p-6 shadow-sm">
              <h2 className="mb-4 text-lg font-semibold text-slate-800">Announcements</h2>
              <div className="space-y-4">
                {announcements.map((announcement) => (
                  <div key={announcement.id} className="border-l-4 border-blue-500 pl-4">
                    <h3 className="font-medium text-slate-800">{announcement.title}</h3>
                    <p className="mt-1 text-sm text-slate-500">{announcement.message}</p>
                    <p className="mt-1 text-xs text-slate-400">{announcement.time}</p>
                  </div>
                ))}
              </div>
            </div>
          </aside>
        </div>
      </div>
    </div>
  )
}

export default StudentDashboard
