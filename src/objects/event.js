import { AbstractCrudObject } from './../core'
import ProfilePictureSource from './profilepicturesource'

export default class Event extends AbstractCrudObject {

  static get Field () {
    return Object.freeze({
      attending_count: 'attending_count',
      can_guests_invite: 'can_guests_invite',
      category: 'category',
      cover: 'cover',
      declined_count: 'declined_count',
      description: 'description',
      end_time: 'end_time',
      guest_list_enabled: 'guest_list_enabled',
      id: 'id',
      interested_count: 'interested_count',
      is_canceled: 'is_canceled',
      is_page_owned: 'is_page_owned',
      is_viewer_admin: 'is_viewer_admin',
      maybe_count: 'maybe_count',
      name: 'name',
      noreply_count: 'noreply_count',
      owner: 'owner',
      parent_group: 'parent_group',
      place: 'place',
      start_time: 'start_time',
      ticket_uri: 'ticket_uri',
      timezone: 'timezone',
      type: 'type',
      updated_time: 'updated_time'
    })
  }

  static get Type () {
    return Object.freeze({
      community: 'community',
      group: 'group',
      private: 'private',
      public: 'public'
    })
  }

  getPicture (fields, params) {
    return this.getEdge(ProfilePictureSource, fields, params, 'picture')
  }

}
