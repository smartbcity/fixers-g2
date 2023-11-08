import { SpelExpressionEvaluator } from 'spel2js'
import { FieldValidatorFnc } from './FormComposableField'

export interface DisplayCondition {
  type: 'display'
  expression: string
}

export interface ValidatorCondition {
  type: 'validator'
  expression: string
  error: string
}

export type Condition = DisplayCondition | ValidatorCondition

export const evalCondition = (condition: Condition, locals: any): boolean => {
  console.log(
    condition.expression,
    SpelExpressionEvaluator.eval(condition.expression, null, locals)
  )
  return SpelExpressionEvaluator.eval(condition.expression, null, locals)
}

export const evalDisplayConditions = (
  conditions?: Condition[],
  value?: any,
  values?: any
): boolean => {
  if (!conditions) return true
  const locals = {
    values: values,
    value: value ?? null
  }
  const displayConditions = conditions.filter((cond) => cond.type === 'display')
  if (displayConditions.length === 0) return true
  return displayConditions.every((cond) => evalCondition(cond, locals))
}

export const validateConditions =
  (conditions: Condition[]): FieldValidatorFnc =>
  (value?: any, values?: any) => {
    const locals = {
      values: values,
      value: value ?? null
    }
    //@ts-ignore
    const validatorConditions: ValidatorCondition[] = conditions.filter(
      (cond) => cond.type === 'validator'
    )
    for (let cond of validatorConditions) {
      if (evalCondition(cond, locals)) return cond.error
    }
    return
  }
