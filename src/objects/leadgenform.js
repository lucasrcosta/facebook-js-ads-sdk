import { AbstractCrudObject } from './../core'
import Lead from './lead'

export default class LeadgenForm extends AbstractCrudObject {

  static get Field () {
    return Object.freeze({
      allow_organic_lead: 'allow_organic_lead',
      context_card: 'context_card',
      continued_flow_request_method: 'continued_flow_request_method',
      created_time: 'created_time',
      creator: 'creator',
      creator_id: 'creator_id',
      cusomized_tcpa_content: 'cusomized_tcpa_content',
      expired_leads_count: 'expired_leads_count',
      follow_up_action_text: 'follow_up_action_text',
      follow_up_action_url: 'follow_up_action_url',
      id: 'id',
      is_continued_flow: 'is_continued_flow',
      leadgen_export_csv_url: 'leadgen_export_csv_url',
      leads_count: 'leads_count',
      legal_content: 'legal_content',
      locale: 'locale',
      messenger_welcome_message: 'messenger_welcome_message',
      name: 'name',
      organic_leads_count: 'organic_leads_count',
      page: 'page',
      page_id: 'page_id',
      privacy_policy_url: 'privacy_policy_url',
      qualifiers: 'qualifiers',
      questions: 'questions',
      status: 'status',
      tcpa_compliance: 'tcpa_compliance'
    })
  }

  static getEndpoint () {
    return 'leadgen_forms'
  }

  getLeads (fields, params) {
    return this.getEdge(Lead, fields, params, 'leads')
  }

}
