import { AbstractCrudObject } from './../core'
import Ad from './ad'
import AdAccountRoas from './adaccountroas'
import AdAccountTargetingUnified from './adaccounttargetingunified'
import AdAccountUser from './adaccountuser'
import AdActivity from './adactivity'
import AdAsyncRequestSet from './adasyncrequestset'
import AdCreative from './adcreative'
import AdImage from './adimage'
import AdLabel from './adlabel'
import AdPlacePageSet from './adplacepageset'
import AdPreview from './adpreview'
import AdReportRun from './adreportrun'
import AdsDataPartner from './adsdatapartner'
import AdSet from './adset'
import AdsInsights from './adsinsights'
import AdsPixel from './adspixel'
import BroadTargetingCategories from './broadtargetingcategories'
import Campaign from './campaign'
import CustomAudience from './customaudience'
import CustomAudiencesTOS from './customaudiencestos'
import LeadgenForm from './leadgenform'
import MinimumBudget from './minimumbudget'
import OffsitePixel from './offsitepixel'
import PartnerCategory from './partnercategory'
import RateCard from './ratecard'
import ReachEstimate from './reachestimate'
import ReachFrequencyPrediction from './reachfrequencyprediction'
import TargetingSentenceLine from './targetingsentenceline'
import Transaction from './transaction'

export default class AdAccount extends AbstractCrudObject {

  static get Field () {
    return Object.freeze({
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
      line_numbers: 'line_numbers',
      media_agency: 'media_agency',
      min_campaign_group_spend_cap: 'min_campaign_group_spend_cap',
      min_daily_budget: 'min_daily_budget',
      name: 'name',
      offsite_pixels_tos_accepted: 'offsite_pixels_tos_accepted',
      owner: 'owner',
      partner: 'partner',
      rf_spec: 'rf_spec',
      salesforce_invoice_group_id: 'salesforce_invoice_group_id',
      show_checkout_experience: 'show_checkout_experience',
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
      agency: 'AGENCY',
      owner: 'OWNER'
    })
  }

  static get PermittedRoles () {
    return Object.freeze({
      admin: 'ADMIN',
      fb_employee_dso_advertiser: 'FB_EMPLOYEE_DSO_ADVERTISER',
      general_user: 'GENERAL_USER',
      instagram_advertiser: 'INSTAGRAM_ADVERTISER',
      instagram_manager: 'INSTAGRAM_MANAGER',
      reports_only: 'REPORTS_ONLY'
    })
  }

  static getEndpoint () {
    return 'adaccounts'
  }

  getActivities (fields, params) {
    return this.getEdge(AdActivity, fields, params, 'activities')
  }

  getAdCreatives (fields, params) {
    return this.getEdge(AdCreative, fields, params, 'adcreatives')
  }

  getAdCreativesByLabels (fields, params) {
    return this.getEdge(AdCreative, fields, params, 'adcreativesbylabels')
  }

  getAdImages (fields, params) {
    return this.getEdge(AdImage, fields, params, 'adimages')
  }

  getAdLabels (fields, params) {
    return this.getEdge(AdLabel, fields, params, 'adlabels')
  }

  getAdPlacePageSets (fields, params) {
    return this.getEdge(AdPlacePageSet, fields, params, 'ad_place_page_sets')
  }

  getAdReportRuns (fields, params) {
    return this.getEdge(AdReportRun, fields, params, 'adreportruns')
  }

  getAdReportSchedules (fields, params) {
    return this.getEdge(AbstractCrudObject, fields, params, 'adreportschedules')
  }

  getAdSets (fields, params) {
    return this.getEdge(AdSet, fields, params, 'adsets')
  }

  getAdSetsByLabels (fields, params) {
    return this.getEdge(AdSet, fields, params, 'adsetsbylabels')
  }

  getAdVideos (fields, params) {
    return this.getEdge(AbstractCrudObject, fields, params, 'advideos')
  }

  getAds (fields, params) {
    return this.getEdge(Ad, fields, params, 'ads')
  }

  getAdsByLabels (fields, params) {
    return this.getEdge(Ad, fields, params, 'adsbylabels')
  }

  getAdsPixels (fields, params) {
    return this.getEdge(AdsPixel, fields, params, 'adspixels')
  }

  getAdvertisableApplications (fields, params) {
    return this.getEdge(AbstractCrudObject, fields, params, 'advertisable_applications')
  }

  getApplications (fields, params) {
    return this.getEdge(AbstractCrudObject, fields, params, 'applications')
  }

  getAsyncAdRequestSets (fields, params) {
    return this.getEdge(AdAsyncRequestSet, fields, params, 'asyncadrequestsets')
  }

  getBroadTargetingCategories (fields, params) {
    return this.getEdge(BroadTargetingCategories, fields, params, 'broadtargetingcategories')
  }

  getCampaigns (fields, params) {
    return this.getEdge(Campaign, fields, params, 'campaigns')
  }

  getCampaignsByLabels (fields, params) {
    return this.getEdge(Campaign, fields, params, 'campaignsbylabels')
  }

  getCustomAudiences (fields, params) {
    return this.getEdge(CustomAudience, fields, params, 'customaudiences')
  }

  getCustomAudiencesTos (fields, params) {
    return this.getEdge(CustomAudiencesTOS, fields, params, 'customaudiencestos')
  }

  getGeneratePreviews (fields, params) {
    return this.getEdge(AdPreview, fields, params, 'generatepreviews')
  }

  getInsights (fields, params) {
    return this.getEdge(AdsInsights, fields, params, 'insights')
  }

  getInsightsAsync (fields, params) {
    return this.getEdge(AdReportRun, fields, params, 'insights')
  }

  getInstagramAccounts (fields, params) {
    return this.getEdge(AbstractCrudObject, fields, params, 'instagram_accounts')
  }

  getLeadGenForms (fields, params) {
    return this.getEdge(LeadgenForm, fields, params, 'leadgen_forms')
  }

  getMinimumBudgets (fields, params) {
    return this.getEdge(MinimumBudget, fields, params, 'minimum_budgets')
  }

  getOfflineConversionDataSets (fields, params) {
    return this.getEdge(AbstractCrudObject, fields, params, 'offline_conversion_data_sets')
  }

  getOffsitePixels (fields, params) {
    return this.getEdge(OffsitePixel, fields, params, 'offsitepixels')
  }

  getPartnerCategories (fields, params) {
    return this.getEdge(PartnerCategory, fields, params, 'partnercategories')
  }

  getPartners (fields, params) {
    return this.getEdge(AdsDataPartner, fields, params, 'partners')
  }

  getPublisherBlockLists (fields, params) {
    return this.getEdge(AbstractCrudObject, fields, params, 'publisher_block_lists')
  }

  getRateCard (fields, params) {
    return this.getEdge(RateCard, fields, params, 'ratecard')
  }

  getReachEstimate (fields, params) {
    return this.getEdge(ReachEstimate, fields, params, 'reachestimate')
  }

  getReachFrequencyPredictions (fields, params) {
    return this.getEdge(ReachFrequencyPrediction, fields, params, 'reachfrequencypredictions')
  }

  getRoas (fields, params) {
    return this.getEdge(AdAccountRoas, fields, params, 'roas')
  }

  getTargetingBrowse (fields, params) {
    return this.getEdge(AdAccountTargetingUnified, fields, params, 'targetingbrowse')
  }

  getTargetingSearch (fields, params) {
    return this.getEdge(AdAccountTargetingUnified, fields, params, 'targetingsearch')
  }

  getTargetingSentenceLines (fields, params) {
    return this.getEdge(TargetingSentenceLine, fields, params, 'targetingsentencelines')
  }

  getTargetingSuggestions (fields, params) {
    return this.getEdge(AdAccountTargetingUnified, fields, params, 'targetingsuggestions')
  }

  getTargetingValidation (fields, params) {
    return this.getEdge(AdAccountTargetingUnified, fields, params, 'targetingvalidation')
  }

  getTransactions (fields, params) {
    return this.getEdge(Transaction, fields, params, 'transactions')
  }

  getUsers (fields, params) {
    return this.getEdge(AdAccountUser, fields, params, 'users')
  }

}
