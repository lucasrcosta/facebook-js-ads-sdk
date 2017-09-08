import { AbstractCrudObject } from './../core'
import Business from './business'
import ExternalEventSource from './externaleventsource'
import Hotel from './hotel'
import ProductCatalogHotelRoomsBatch from './productcataloghotelroomsbatch'
import ProductCatalogPricingVariablesBatch from './productcatalogpricingvariablesbatch'
import ProductFeed from './productfeed'
import ProductGroup from './productgroup'
import ProductItem from './productitem'
import ProductSet from './productset'

export default class ProductCatalog extends AbstractCrudObject {

  static get Field () {
    return Object.freeze({
      business: 'business',
      da_display_settings: 'da_display_settings',
      default_image_url: 'default_image_url',
      fallback_image_url: 'fallback_image_url',
      feed_count: 'feed_count',
      id: 'id',
      image_padding_landscape: 'image_padding_landscape',
      image_padding_square: 'image_padding_square',
      name: 'name',
      product_count: 'product_count',
      vertical: 'vertical'
    })
  }

  static get Vertical () {
    return Object.freeze({
      commerce: 'commerce',
      destinations: 'destinations',
      flights: 'flights',
      hotels: 'hotels'
    })
  }

  static getEndpoint () {
    return 'product_catalogs'
  }

  getAgencies (fields, params) {
    return this.getEdge(Business, fields, params, 'agencies')
  }

  getDestinations (fields, params) {
    return this.getEdge(AbstractCrudObject, fields, params, 'destinations')
  }

  getExternalEventSources (fields, params) {
    return this.getEdge(ExternalEventSource, fields, params, 'external_event_sources')
  }

  getFlights (fields, params) {
    return this.getEdge(AbstractCrudObject, fields, params, 'flights')
  }

  getHotelRoomsBatch (fields, params) {
    return this.getEdge(ProductCatalogHotelRoomsBatch, fields, params, 'hotel_rooms_batch')
  }

  getHotels (fields, params) {
    return this.getEdge(Hotel, fields, params, 'hotels')
  }

  getPricingVariablesBatch (fields, params) {
    return this.getEdge(ProductCatalogPricingVariablesBatch, fields, params, 'pricing_variables_batch')
  }

  getProductFeeds (fields, params) {
    return this.getEdge(ProductFeed, fields, params, 'product_feeds')
  }

  getProductGroups (fields, params) {
    return this.getEdge(ProductGroup, fields, params, 'product_groups')
  }

  getProductSets (fields, params) {
    return this.getEdge(ProductSet, fields, params, 'product_sets')
  }

  getProductSetsBatch (fields, params) {
    return this.getEdge(AbstractCrudObject, fields, params, 'product_sets_batch')
  }

  getProducts (fields, params) {
    return this.getEdge(ProductItem, fields, params, 'products')
  }

}
