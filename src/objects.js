import { AbstractCrudObject } from './core'

/**
 * Business
 * @extends AbstractCrudObject
 */
export class Business extends AbstractCrudObject {
}
Business.fields = Object.freeze({
  id: 'id',
  name: 'name',
  payment_account_id: 'payment_account_id',
  primary_page: 'primary_page'
})

/**
 * User
 * @extends AbstractCrudObject
 */
export class User extends AbstractCrudObject {
}
User.fields = Object.freeze({
  about: 'about',
  admin_notes: 'admin_notes',
  age_range: 'age_range',
  bio: 'bio',
  birthday: 'birthday',
  context: 'context',
  cover: 'cover',
  currency: 'currency',
  devices: 'devices',
  education: 'education',
  email: 'email',
  favorite_athletes: 'favorite_athletes',
  favorite_teams: 'favorite_teams',
  first_name: 'first_name',
  gender: 'gender',
  hometown: 'hometown',
  id: 'id',
  inspirational_people: 'inspirational_people',
  install_type: 'install_type',
  installed: 'installed',
  interested_in: 'interested_in',
  is_shared_login: 'is_shared_login',
  is_verified: 'is_verified',
  labels: 'labels',
  languages: 'languages',
  last_name: 'last_name',
  link: 'link',
  locale: 'locale',
  location: 'location',
  meeting_for: 'meeting_for',
  middle_name: 'middle_name',
  name: 'name',
  name_format: 'name_format',
  payment_pricepoints: 'payment_pricepoints',
  political: 'political',
  public_key: 'public_key',
  quotes: 'quotes',
  relationship_status: 'relationship_status',
  religion: 'religion',
  security_settings: 'security_settings',
  shared_login_upgrade_required_by: 'shared_login_upgrade_required_by',
  significant_other: 'significant_other',
  sports: 'sports',
  test_group: 'test_group',
  third_party_id: 'third_party_id',
  timezone: 'timezone',
  token_for_business: 'token_for_business',
  updated_time: 'updated_time',
  verified: 'verified',
  video_upload_limits: 'video_upload_limits',
  viewer_can_send_gift: 'viewer_can_send_gift',
  website: 'website',
  work: 'work'
})
