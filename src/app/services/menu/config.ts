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
    roles: [ApplicationRolesEnum[1]],
  },
  {
    title: 'Cases',
    key: 'cases',
    icon: 'fe fe-book',
    url: '/cases',
    roles: [ApplicationRolesEnum[3]],
  },
  {
    title: 'View Case',
    key: 'view-cases',
    icon: 'fe fe-book',
    url: '/cases/cases-tab',
    hidden: true,
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
      {
        title: 'Child Profile',
        key: 'childprofile',
        url: '/childs/childprofile',
        hidden: true,
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
    title: 'Expense Types',
    key: 'expense',
    icon: 'fa fa-dollar',
    url: '/expense-type',
    roles: [ApplicationRolesEnum[1]],
  },
  {
    title: 'Family Document(s)',
    key: 'documents',
    icon: 'fe fe-folder',
    url: '/documents',
    roles: [ApplicationRolesEnum[2], ApplicationRolesEnum[4]],
  },
  {
    title: 'View Documents',
    key: 'view-documents',
    icon: 'fe fe-folder',
    url: '/documents/view-documents',
    hidden: true,
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

  {
    title: 'Agreement',
    key: 'parentAgreement',
    icon: 'fe fe-feather',
    url: '/agreement',
    roles: [ApplicationRolesEnum[2]],
  },
  {
    title: 'Positive Parenting',
    key: 'positiveParenting',
    icon: 'fe fe-user-check',
    url: '/positive-parenting',
    roles: [ApplicationRolesEnum[1], ApplicationRolesEnum[2], ApplicationRolesEnum[3]],
  },
]
