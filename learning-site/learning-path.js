export const learningPaths = [
  {
    id: 'foundations',
    label: 'pathFoundations',
    lessonIds: ['tip-calculator', 'number-game', 'word-counter', 'quiz']
  },
  {
    id: 'functions-data',
    label: 'pathFunctionsData',
    lessonIds: ['expense-tracker', 'gradebook']
  },
  {
    id: 'files-structured-data',
    label: 'pathFilesStructuredData',
    lessonIds: ['file-journal', 'json-contact-book', 'api-response-analyzer', 'csv-sales-report', 'debug-empty-scores']
  },
  {
    id: 'applications',
    label: 'pathApplications',
    lessonIds: ['library-catalog', 'command-line-task-manager', 'text-adventure', 'study-planner', 'budget-dashboard', 'inventory-system', 'sqlite-reading-list']
  },
  {
    id: 'testing-capstone',
    label: 'pathTestingCapstone',
    lessonIds: ['unit-test-expenses', 'project-blueprint']
  }
];

export const orderedLessonIds = learningPaths.flatMap(path => path.lessonIds);
