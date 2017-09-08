import { AbstractObject } from './../core'

export default class MinimumBudget extends AbstractObject {

  static get Field () {
    return Object.freeze({
      currency: 'currency',
      min_daily_budget_high_freq: 'min_daily_budget_high_freq',
      min_daily_budget_imp: 'min_daily_budget_imp',
      min_daily_budget_low_freq: 'min_daily_budget_low_freq',
      min_daily_budget_video_views: 'min_daily_budget_video_views'
    })
  }

  static getEndpoint () {
    return 'minimum_budgets'
  }

}
