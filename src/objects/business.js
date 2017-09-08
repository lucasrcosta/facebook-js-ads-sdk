import { AbstractCrudObject } from './../core'
import AdAccount from './adaccount'
import AdsPixel from './adspixel'
import BusinessAdAccountRequest from './businessadaccountrequest'
import BusinessPageRequest from './businesspagerequest'
import EventSourceGroup from './eventsourcegroup'
import LegacyBusinessAdAccountRequest from './legacybusinessadaccountrequest'
import ProductCatalog from './productcatalog'
import ProfilePictureSource from './profilepicturesource'
import ReachFrequencyPrediction from './reachfrequencyprediction'

export default class Business extends AbstractCrudObject {

  static get Field () {
    return Object.freeze({
      created_by: 'created_by',
      created_time: 'created_time',
      id: 'id',
      link: 'link',
      name: 'name',
      payment_account_id: 'payment_account_id',
      primary_page: 'primary_page',
      timezone_id: 'timezone_id',
      two_factor_type: 'two_factor_type',
      updated_by: 'updated_by',
      updated_time: 'updated_time'
    })
  }

  getAdsPixels (fields, params) {
    return this.getEdge(AdsPixel, fields, params, 'adspixels')
  }

  getAssignedAdAccounts (fields, params) {
    return this.getEdge(AdAccount, fields, params, 'assigned_ad_accounts')
  }

  getAssignedPages (fields, params) {
    return this.getEdge(AbstractCrudObject, fields, params, 'assigned_pages')
  }

  getAssignedProductCatalogs (fields, params) {
    return this.getEdge(ProductCatalog, fields, params, 'assigned_product_catalogs')
  }

  getClientAdAccountRequests (fields, params) {
    return this.getEdge(BusinessAdAccountRequest, fields, params, 'client_ad_account_requests')
  }

  getClientAdAccounts (fields, params) {
    return this.getEdge(AdAccount, fields, params, 'client_ad_accounts')
  }

  getClientPageRequests (fields, params) {
    return this.getEdge(BusinessPageRequest, fields, params, 'client_page_requests')
  }

  getClientPages (fields, params) {
    return this.getEdge(AbstractCrudObject, fields, params, 'client_pages')
  }

  getEventSourceGroups (fields, params) {
    return this.getEdge(EventSourceGroup, fields, params, 'event_source_groups')
  }

  getGrpPlans (fields, params) {
    return this.getEdge(ReachFrequencyPrediction, fields, params, 'grp_plans')
  }

  getInstagramAccounts (fields, params) {
    return this.getEdge(AbstractCrudObject, fields, params, 'instagram_accounts')
  }

  getMeasurementReports (fields, params) {
    return this.getEdge(AbstractCrudObject, fields, params, 'measurement_reports')
  }

  getOfflineConversionDataSets (fields, params) {
    return this.getEdge(AbstractCrudObject, fields, params, 'offline_conversion_data_sets')
  }

  getOwnedAdAccountRequests (fields, params) {
    return this.getEdge(LegacyBusinessAdAccountRequest, fields, params, 'owned_ad_account_requests')
  }

  getOwnedAdAccounts (fields, params) {
    return this.getEdge(AdAccount, fields, params, 'owned_ad_accounts')
  }

  getOwnedInstagramAccounts (fields, params) {
    return this.getEdge(AbstractCrudObject, fields, params, 'owned_instagram_accounts')
  }

  getOwnedPageRequests (fields, params) {
    return this.getEdge(BusinessPageRequest, fields, params, 'owned_page_requests')
  }

  getOwnedPages (fields, params) {
    return this.getEdge(AbstractCrudObject, fields, params, 'owned_pages')
  }

  getOwnedPixels (fields, params) {
    return this.getEdge(AdsPixel, fields, params, 'owned_pixels')
  }

  getPicture (fields, params) {
    return this.getEdge(ProfilePictureSource, fields, params, 'picture')
  }

  getProductCatalogs (fields, params) {
    return this.getEdge(ProductCatalog, fields, params, 'product_catalogs')
  }

  getReceivedAudiencePermissions (fields, params) {
    return this.getEdge(AbstractCrudObject, fields, params, 'received_audience_permissions')
  }

  getSharedAudiencePermissions (fields, params) {
    return this.getEdge(AbstractCrudObject, fields, params, 'shared_audience_permissions')
  }

  getSystemUsers (fields, params) {
    return this.getEdge(AbstractCrudObject, fields, params, 'system_users')
  }

}
