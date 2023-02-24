export interface SSM {
  name: string
  transitions: SSMTransition[]
  version?: string
}

export interface SSMTransition {
  from?: SSMPosition
  to: SSMPosition
  role: SSMObject
  action: SSMObject
  result?: string
}

export interface SSMPosition extends SSMObject {
  position: number
}

export interface SSMObject {
  name: string
}
