export interface SSM {
  name: string
  transtions: SSMTransition[]
}

export interface SSMTransition {
  from: number
  to: number
  role: string
  action: string
}
