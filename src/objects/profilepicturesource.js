import { AbstractObject } from './../core'

export default class ProfilePictureSource extends AbstractObject {

  static get Field () {
    return Object.freeze({
      bottom: 'bottom',
      height: 'height',
      is_silhouette: 'is_silhouette',
      left: 'left',
      right: 'right',
      top: 'top',
      url: 'url',
      width: 'width'
    })
  }

  static get Type () {
    return Object.freeze({
      album: 'album',
      large: 'large',
      normal: 'normal',
      small: 'small',
      square: 'square'
    })
  }

}
