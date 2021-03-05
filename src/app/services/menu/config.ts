import { ApplicationRolesEnum } from 'src/app/models/UserSessionModel'

export const getMenuData: any[] = [
  // {
  //   category: true,
  //   title: 'Dashboards',
  // },
  {
    title: 'Dashboard',
    key: 'mainDashboard',
    icon: 'fe fe-bookmark',
    url: '/dashboard',
    roles: [
      ApplicationRolesEnum[1],
    ],
  },
  {
    title: 'Cases',
    key: 'cases',
    icon: 'fe fe-book',
    url: '/cases',
    roles: [ApplicationRolesEnum[3]],
  },
  {
    title: 'Calendar',
    key: 'calendar',
    icon: 'fe fe-calendar',
    url: '/calendar',
    roles: [ApplicationRolesEnum[2], ApplicationRolesEnum[4]],
  },
  {
    title: 'Family Child(s)',
    key: 'childProfiles',
    icon: 'fa fa-child',
    roles: [ApplicationRolesEnum[2]],
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
    roles: [ApplicationRolesEnum[2]],
  },
  {
    title: 'Expense(s)',
    key: 'familyExpenses',
    icon: 'fa fa-dollar',
    url: '/expenses',
    roles: [ApplicationRolesEnum[2]],
  },
  {
    title: 'Family Document(s)',
    key: 'documents',
    icon: 'fe fe-folder',
    url: '/documents',
    roles: [ApplicationRolesEnum[2], ApplicationRolesEnum[4]],
  },
  {
    title: 'Connection',
    key: 'connection',
    icon: 'fe fe-link',
    url: '/connection',
    roles: [ApplicationRolesEnum[2]],
  },
  {
    title: 'Lawyers',
    key: 'lawyers',
    icon: 'fe fe-user',
    url: '/lawyers',
    roles: [ApplicationRolesEnum[1]],
  },

  {
    title: 'Journal',
    key: 'familyJournal',
    icon: 'fe fe-message-circle',
    url: '/journal',
    roles: [ApplicationRolesEnum[2]],
  },
  {
    title: 'Messages',
    key: 'messagesTab',
    icon: 'fe fe-message-square',
    url: '/journal/groupchat',
    roles: [ApplicationRolesEnum[2], ApplicationRolesEnum[4]],
  },
  {
    title: 'Custody Plan Template',
    key: 'parentingPlan',
    icon: 'fe fe-file-text',
    url: '/custody-template',
    roles: [ApplicationRolesEnum[1]],
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
