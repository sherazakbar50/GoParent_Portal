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
  },
  {
    title: 'Family Child(s)',
    key: 'childProfiles',
    icon: 'fa fa-child',
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
  },
  {
    title: 'Expense(s)',
    key: 'familyExpenses',
    icon: 'fa fa-dollar',
    url: '/expenses',
  },
  {
    title: 'Connection',
    key: 'connection',
    icon: 'fe fe-link',
    url: '/connection',
  },
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
