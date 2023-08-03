import { RestrictableObjectDescriptor } from '../index'

export type RestrictableObjectDescriptorResponse = {
  subjects: RestrictableObjectDescriptor[]
  nextPageToken?: string
}
