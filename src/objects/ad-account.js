import { AbstractCrudObject } from './../core'
import Ad from './ad'
import AdCreative from './ad-creative'
import AdPreview from './ad-preview'
import AdSet from './ad-set'
import Campaign from './campaign'
import Insights from './insights'
import User from './user'

/**
 * AdAccount
 * @extends AbstractCrudObject
 * @see {@link https://developers.facebook.com/docs/marketing-api/reference/ad-account}
 */
export default class AdAccount extends AbstractCrudObject {
  static get Fields () {
    return Object.freeze({
      account_groups: 'account_groups',
      account_id: 'account_id',
      account_status: 'account_status',
      age: 'age',
      agency_client_declaration: 'agency_client_declaration',
      amount_spent: 'amount_spent',
      balance: 'balance',
      business: 'business',
      business_city: 'business_city',
      business_country_code: 'business_country_code',
      business_name: 'business_name',
      business_state: 'business_state',
      business_street: 'business_street',
      business_street2: 'business_street2',
      business_zip: 'business_zip',
      can_create_brand_lift_study: 'can_create_brand_lift_study',
      capabilities: 'capabilities',
      created_time: 'created_time',
      currency: 'currency',
      disable_reason: 'disable_reason',
      end_advertiser: 'end_advertiser',
      end_advertiser_name: 'end_advertiser_name',
      failed_delivery_checks: 'failed_delivery_checks',
      funding_source: 'funding_source',
      funding_source_details: 'funding_source_details',
      has_migrated_permissions: 'has_migrated_permissions',
      id: 'id',
      io_number: 'io_number',
      is_notifications_enabled: 'is_notifications_enabled',
      is_personal: 'is_personal',
      is_prepay_account: 'is_prepay_account',
      is_tax_id_required: 'is_tax_id_required',
      last_used_time: 'last_used_time',
      line_numbers: 'line_numbers',
      media_agency: 'media_agency',
      min_campaign_group_spend_cap: 'min_campaign_group_spend_cap',
      min_daily_budget: 'min_daily_budget',
      name: 'name',
      offsite_pixels_tos_accepted: 'offsite_pixels_tos_accepted',
      owner: 'owner',
      owner_business: 'owner_business',
      partner: 'partner',
      rf_spec: 'rf_spec',
      spend_cap: 'spend_cap',
      tax_id: 'tax_id',
      tax_id_status: 'tax_id_status',
      tax_id_type: 'tax_id_type',
      timezone_id: 'timezone_id',
      timezone_name: 'timezone_name',
      timezone_offset_hours_utc: 'timezone_offset_hours_utc',
      tos_accepted: 'tos_accepted',
      user_role: 'user_role'
    })
  }

  static get AccessType () {
    return Object.freeze({
      owner: 'OWNER',
      agency: 'AGENCY'
    })
  }

  static get PermittedRoles () {
    return Object.freeze({
      admin: 'ADMIN',
      general_user: 'GENERAL_USER',
      reports_only: 'REPORTS_ONLY',
      instagram_advertiser: 'INSTAGRAM_ADVERTISER',
      instagram_manager: 'INSTAGRAM_MANAGER',
      fb_employee_dso_advertiser: 'FB_EMPLOYEE_DSO_ADVERTISER'
    })
  }

  static getEndpoint () {
    return 'adaccounts'
  }

  getAdCreatives (fields, params, fetchFirstPage) {
    return this.getEdge(AdCreative, fields, params, fetchFirstPage)
  }

  getAds (fields, params, fetchFirstPage) {
    return this.getEdge(Ad, fields, params, fetchFirstPage)
  }

  getAdSets (fields, params, fetchFirstPage) {
    return this.getEdge(AdSet, fields, params, fetchFirstPage)
  }

  getCampaigns (fields, params, fetchFirstPage) {
    return this.getEdge(Campaign, fields, params, fetchFirstPage)
  }

  getGeneratePreviews (fields, params, fetchFirstPage) {
    return this.getEdge(AdPreview, fields, params, fetchFirstPage, 'generatepreviews')
  }

  getInsights (fields, params, fetchFirstPage) {
    return this.getEdge(Insights, fields, params, fetchFirstPage)
  }

  getUsers (fields, params, fetchFirstPage) {
    return this.getEdge(User, fields, params, fetchFirstPage)
  }

}
