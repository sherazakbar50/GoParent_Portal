import { environment } from 'src/environments/environment'

export const API_URL: string = environment.api_url

export const DATA_FORMATS = {
  Date: 'MMMM d, y',
  DATETIME: 'MMMM d, y h:mm a',
}

export class SelectItem {
  Id: number | string
  Name: string
}

export const API_ENDPOINTS = {
  UserRegistration: 'api/auth/register',
  GetToken: 'api/auth/token',
  GetAllContacts: 'api/Contacts/list',
  addUpdateContact: 'api/contacts/addUpdate',
  DeleteContact: 'api/contacts/delete',
  DummyList: 'api/dummy/list',
  DummyAdd: 'api/dummy/add',
  DummyDelete: 'api/dummy/delete',
  DummyUpdate: 'api/dummy/update',
  DummyGet: 'api/dummy/get',
  BillingPlans: 'api/BillingPlans/GetBillingPlansAsLookup',
  SubscriptionPlans: 'api/SubscriptionPlans',
  StripeConfiguration: 'api/StripeConfiguration',
  Company: 'api/Company/GetCompanies',
  Counts: 'api/Company/GetCounts',
  UpdateCompany: 'api/Company',
  LookUp: 'api/Lookup',
  Form: 'api/Form',
  CheckEmail: 'api/auth/CheckEmail',
  IsOtherCoparentExists: 'api/Family/IsOtherCoparentExists',
  GetFamilyChildsList: 'api/FamilyMember/getfamilychilds',
  DeleteFamilyMember: 'api/FamilyMember/DeleteMember',
  SaveBasicInfo: 'api/FamilyMember/SaveBasicInfo',
  GetChildProfile: 'api/FamilyMember/ChildProfile',
  SaveMedicalInfo: 'api/FamilyMember/SaveMedicalInfo',
  SaveBankInfo: 'api/FamilyMember/SaveBankInfo',
  CreateFamilyChild: 'api/FamilyMember/createchlid',
  GetMemberVaccines: 'api/Vaccines/GetVaccines',
  GetMemberVaccine: 'api/Vaccines/GetVaccine',
  DeleteVaccine: 'api/Vaccines/DeleteVaccine',
  AddUpdateVaccine: 'api/Vaccines/AddUpdateVaccine',
  GetFamilyExpenses: 'api/FamilyExpenses/allexpenses',
  GetFamilyExpense: 'api/FamilyExpenses/expense',
  GetExpenseTypes: 'api/FamilyExpenses/expensetypes',
  DeleteExpense: 'api/FamilyExpenses/DeleteExpense',
  AddUpdateExpense: 'api/FamilyExpenses/AddUpdateExpense',
  UpdateExpenseStatus: 'api/FamilyExpenses/SetExpenseStatus',
  UpdateUserInfo: 'api/FamilyMember/updateUserInfo',
  ForgotPassword: 'api/auth/ForgotPassword',
  ResetPassword: 'api/auth/ResetPassword',
  CreatePortalAccess: 'api/FamilyMember/CreatePortalAccess',
  GetOtherCoParentIfExits: 'api/FamilyMember/GetOtherCoParentIfExits',
  CreateLawyerAccount: 'api/Lawyers/CreateLawyerAccount',
  LawyersList: 'api/Lawyers/GetList',
  GetFamilies: 'api/Lawyers/GetFamilies',
  AssignCaseToLawyer: 'api/Lawyers/AssignCaseToLawyer',
  SaveFamilyEvent: 'api/FamilyMember/SaveFamilyEvent',
  GetAllFamilyEvents: 'api/FamilyMember/GetAllFamilyEvents',
  GetMonthWiseFamilyEvents: 'api/FamilyMember/GetMonthWiseFamilyEvents',
  GetFamilyChilds: 'api/Family/GetFamilyChilds',
  DeleteEvent: 'api/FamilyMember/DeleteEvent',
  AddUpdateFolder: 'api/Folder/addUpdate',
  getAllFolders: 'api/Folder/folderList',
  AddUpdateDocument: 'api/FamilyDocuments/addUpdate',
  AddChatAttachment: 'api/FamilyDocuments/AddChatAttachment',
  getFamilyDocuments: 'api/FamilyDocuments/familyDocumentList',
  getFolderDocuments: 'api/FamilyDocuments/documentListByFolder',
  deleteFolder: 'api/Folder/DeleteFolder',
  deleteDocument: 'api/FamilyDocuments/DeleteDocument',
  downloadDocument: 'api/FamilyDocuments/DownloadDocument',
  ChatGoupsList: 'api/Messaging/chatgroups',
  AddUpdateChatGroup: 'api/Messaging/addupdatechatgroup',
  GetGroupChat: 'api/Messaging/getgroupchat',
  JournalGroupId: 'api/Messaging/journalgroupid',
  AllFamilyMembers: 'api/FamilyMember/getfamilymembers',
  GetCoParentsInfo: 'api/FamilyMember/GetCoParentsInfo',

  // Custodies
  SaveCustody: 'api/FamilyCustodies/SaveCustody',
  SaveCustodyTemplate: 'api/CustodyTemplates/SaveCustodyTemplate',
  CustodyTemplatesList: 'api/CustodyTemplates/GetList',
  DeleteCustodyTemplate: 'api/CustodyTemplates/Delete',

  UserAllRoomIds: 'api/Messaging/allroomids',
  GetCasesByLawyer: 'api/Cases/casesList',
  GetCaseNoteByCase: 'api/CasesNote/caseNoteList',
  AddUpdateCaseNote: 'api/CasesNote/addUpdateNote',
  deleteCaseNote: 'api/CasesNote/DeleteCaseNote',
  GetCaseTimeByCase: 'api/CaseTime/caseTimeList',
  AddUpdateCaseTime: 'api/CaseTime/addUpdateTime',
  DeleteCustody: 'api/FamilyCustodies/DeleteCustody',
  GetMonthlyCalendarData: 'api/Calendar/GetMonthlyCalendarData',
  GetYearlyCalendarData: 'api/Calendar/GetYearlyCalendarData',

  // Change Request
  GetRequestsList: 'api/ChangeRequest/GetRequestsList',
  AddUpdateChangeRequest: 'api/ChangeRequest/AddUpdateChangeRequest',
  UpdateStatusOfRequest: 'api/ChangeRequest/UpdateStatusOfRequest',

  // Check In/Out
  GetCheckList: 'api/CheckInOut/GetList',
  AddUpdateCheck: 'api/CheckInOut/AddUpdate',

  // ExpenseType
  GetExpenseTypeList: 'api/FamilyExpenses/GetExpenseTypeList',
  AddUdpateExpenseType: 'api/FamilyExpenses/AddUdpateExpenseType',
  DeleteExpenseType: 'api/FamilyExpenses/DeleteExpenseType',


  // Calendar Updated
  GetCalendarbyMonth: 'api/Calendar/GetCalendarbyMonth',
  GetCalendarbyYear: 'api/Calendar/GetCalendarbyYear',
}
