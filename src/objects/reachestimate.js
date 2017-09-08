import { AbstractObject } from './../core'

export default class ReachEstimate extends AbstractObject {

  static get Field () {
    return Object.freeze({
      estimate_ready: 'estimate_ready',
      unsupported: 'unsupported',
      users: 'users'
    })
  }

  static get OptimizeFor () {
    return Object.freeze({
      app_downloads: 'APP_DOWNLOADS',
      app_installs: 'APP_INSTALLS',
      brand_awareness: 'BRAND_AWARENESS',
      clicks: 'CLICKS',
      engaged_users: 'ENGAGED_USERS',
      event_responses: 'EVENT_RESPONSES',
      impressions: 'IMPRESSIONS',
      lead_generation: 'LEAD_GENERATION',
      link_clicks: 'LINK_CLICKS',
      none: 'NONE',
      offer_claims: 'OFFER_CLAIMS',
      offsite_conversions: 'OFFSITE_CONVERSIONS',
      page_engagement: 'PAGE_ENGAGEMENT',
      page_likes: 'PAGE_LIKES',
      post_engagement: 'POST_ENGAGEMENT',
      reach: 'REACH',
      social_impressions: 'SOCIAL_IMPRESSIONS',
      video_views: 'VIDEO_VIEWS'
    })
  }

  static getEndpoint () {
    return 'reachestimate'
  }

}
