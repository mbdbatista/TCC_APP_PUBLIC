export interface BaseResponse<T> { 
  data: T
  error?: BaseError
}

type BaseError = {
  code: string
}