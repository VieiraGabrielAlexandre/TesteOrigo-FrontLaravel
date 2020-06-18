import Rest from '@/services/Rest';

/**
 * @typedef {ClientService}
 */
export default class ClientService extends Rest {
  /**
   * @type {String}
   */
  static resource = '/client'
}
