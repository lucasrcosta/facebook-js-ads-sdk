import AbstractCrudObject from './core/abstract_crud_object'

/**
 * Business
 * @extends AbstractCrudObject
 */
export default class Business extends AbstractCrudObject {
}
Business.fields = Object.freeze({
  id: 'id',
  name: 'name',
  payment_account_id: 'payment_account_id',
  primary_page: 'primary_page'
})
