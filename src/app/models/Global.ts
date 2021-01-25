import { environment } from 'src/environments/environment'

export const API_URL: string = environment.api_url

export const API_ENDPOINTS = {
  UserRegistration: 'api/auth/register',
  GetToken: 'api/auth/token',
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
}
