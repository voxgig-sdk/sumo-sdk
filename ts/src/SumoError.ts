
import { Context } from './Context'


class SumoError extends Error {

  isSumoError = true

  sdk = 'Sumo'

  code: string
  ctx: Context

  constructor(code: string, msg: string, ctx: Context) {
    super(msg)
    this.code = code
    this.ctx = ctx
  }

}

export {
  SumoError
}

