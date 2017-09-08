import { AbstractCrudObject } from './../core'
import ProductSet from './productset'

export default class ProductItem extends AbstractCrudObject {

  static get Field () {
    return Object.freeze({
      additional_image_urls: 'additional_image_urls',
      age_group: 'age_group',
      android_app_name: 'android_app_name',
      android_class: 'android_class',
      android_package: 'android_package',
      android_url: 'android_url',
      applinks: 'applinks',
      availability: 'availability',
      brand: 'brand',
      category: 'category',
      checkout_url: 'checkout_url',
      color: 'color',
      commerce_insights: 'commerce_insights',
      condition: 'condition',
      currency: 'currency',
      custom_data: 'custom_data',
      custom_label_0: 'custom_label_0',
      custom_label_1: 'custom_label_1',
      custom_label_2: 'custom_label_2',
      custom_label_3: 'custom_label_3',
      custom_label_4: 'custom_label_4',
      description: 'description',
      expiration_date: 'expiration_date',
      gender: 'gender',
      gtin: 'gtin',
      id: 'id',
      image_url: 'image_url',
      inventory: 'inventory',
      ios_app_name: 'ios_app_name',
      ios_app_store_id: 'ios_app_store_id',
      ios_url: 'ios_url',
      ipad_app_name: 'ipad_app_name',
      ipad_app_store_id: 'ipad_app_store_id',
      ipad_url: 'ipad_url',
      iphone_app_name: 'iphone_app_name',
      iphone_app_store_id: 'iphone_app_store_id',
      iphone_url: 'iphone_url',
      manufacturer_part_number: 'manufacturer_part_number',
      material: 'material',
      name: 'name',
      ordering_index: 'ordering_index',
      pattern: 'pattern',
      price: 'price',
      product_catalog: 'product_catalog',
      product_feed: 'product_feed',
      product_group: 'product_group',
      product_type: 'product_type',
      retailer_id: 'retailer_id',
      retailer_product_group_id: 'retailer_product_group_id',
      review_rejection_reasons: 'review_rejection_reasons',
      review_status: 'review_status',
      sale_price: 'sale_price',
      sale_price_end_date: 'sale_price_end_date',
      sale_price_start_date: 'sale_price_start_date',
      shipping_weight_unit: 'shipping_weight_unit',
      shipping_weight_value: 'shipping_weight_value',
      short_description: 'short_description',
      size: 'size',
      start_date: 'start_date',
      url: 'url',
      visibility: 'visibility',
      windows_phone_app_id: 'windows_phone_app_id',
      windows_phone_app_name: 'windows_phone_app_name',
      windows_phone_url: 'windows_phone_url'
    })
  }

  static get AgeGroup () {
    return Object.freeze({
      adult: 'adult',
      infant: 'infant',
      kids: 'kids',
      newborn: 'newborn',
      toddler: 'toddler'
    })
  }

  static get Availability () {
    return Object.freeze({
      available_for_order: 'available for order',
      discontinued: 'discontinued',
      in_stock: 'in stock',
      out_of_stock: 'out of stock',
      preorder: 'preorder'
    })
  }

  static get Condition () {
    return Object.freeze({
      new: 'new',
      refurbished: 'refurbished',
      used: 'used'
    })
  }

  static get Gender () {
    return Object.freeze({
      female: 'female',
      male: 'male',
      unisex: 'unisex'
    })
  }

  static get ReviewStatus () {
    return Object.freeze({
      approved: 'approved',
      pending: 'pending',
      rejected: 'rejected'
    })
  }

  static get ShippingWeightUnit () {
    return Object.freeze({
      kg: 'kg',
      lb: 'lb',
      oz: 'oz',
      value_g: 'g'
    })
  }

  static get Visibility () {
    return Object.freeze({
      published: 'published',
      staging: 'staging'
    })
  }

  static getEndpoint () {
    return 'products'
  }

  getProductSets (fields, params) {
    return this.getEdge(ProductSet, fields, params, 'product_sets')
  }

}
