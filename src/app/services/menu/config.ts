export const getMenuData: any[] = [
  // {
  //   category: true,
  //   title: 'Dashboards',
  // },
  {
    title: 'Dashboard',
    key: 'mainDashboard',
    icon: 'fe fe-bookmark',
    url: '/dashboard/index',
    roles: ["Admin", "Parent", "Lawyer"],
  },

  {
    title: 'Cases',
    key: 'cases',
    icon: 'fe fe-book',
    url: '/cases',
  },
  {
    title: 'Family Child(s)',
    key: 'childProfiles',
    icon: 'fa fa-child',
    roles: [ "Parent"],
    // roles: ['admin'], // set user roles with access to this route
    // count: 4,
    children: [
      {
        title: 'View Children',
        key: 'viewChildInformation',
        url: '/childs/list',
      },
    ],
  },
  {
    title: 'Family Contact(s)',
    key: 'familyContacts',
    icon: 'fe fe-users',
    url: '/contacts',
    roles: ["Parent", "Lawyer"],
  },
  {
    title: 'Expense(s)',
    key: 'familyExpenses',
    icon: 'fa fa-dollar',
    url: '/expenses',
    roles: [ "Parent", "Lawyer"],
  },
  {
    title: 'Family Documents',
    key: 'documents',
    icon: 'fe fe-folder',
    url: '/documents',
  },
  {
    title: 'Connection',
    key: 'connection',
    icon: 'fe fe-link',
    url: '/connection',
    roles: ["Parent"],
  },
  {
    title: 'Lawyers',
    key: 'lawyers',
    icon: 'fe fe-user',
    url: '/lawyers',
    roles: ["Admin"],
  },
  {
    title: 'Calendar',
    key: 'connection',
    icon: 'fe fe-calendar',
    url: '/calendar',
    roles: ["Parent", "Lawyer"],
  }
  // {
  //   title: 'Setting',
  //   key: 'userSetting',
  //   icon: 'fe fe-home',
  //   children: [
  //     {
  //       title: 'Connection',
  //       key: 'userSettingConnection',
  //       url: '/setting/connection',
  //     },
  //   ],
  // },
]
