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
    title: 'Child(s)',
    key: 'childProfiles',
    icon: 'fe fe-home',
    // roles: ['admin'], // set user roles with access to this route
    // count: 4,
    children: [
      {
        title: 'Information',
        key: 'childProfilesInformation',
        url: '/dashboard/alpha',
      },
    ],
  },

  {
    title: 'Family Contact(s)',
    key: 'familyContacts',
    icon: 'fe fe-bookmark',
    url: '/ui-kits/antd',
  },
]
