import { SpelExpressionEvaluator } from 'spel2js'
import { FieldValidatorFnc } from './FormComposableField'
import { getIn, setIn } from '@smartb/g2-utils'

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

export const evalCondition = (
  condition: Condition,
  value?: any,
  values?: any
): boolean => {
  const locals = valuesUndefinedToNull(condition.expression, {
    values: values,
    value: value ?? null
  })
  return SpelExpressionEvaluator.eval(condition.expression, null, locals)
}

export const evalDisplayConditions = (
  conditions?: Condition[],
  value?: any,
  values?: any
): boolean => {
  if (!conditions) return true

  const displayConditions = conditions.filter((cond) => cond.type === 'display')
  if (displayConditions.length === 0) return true
  return conditions.every((cond) => evalCondition(cond, value, values))
}

export const validateConditions =
  (conditions: Condition[]): FieldValidatorFnc =>
  (value?: any, values?: any) => {
    //@ts-ignore
    const validatorConditions: ValidatorCondition[] = conditions.filter(
      (cond) => cond.type === 'validator'
    )
    for (let cond of validatorConditions) {
      if (evalCondition(cond, value, values)) return cond.error
    }
    return
  }

const valuesUndefinedToNull = (expression: string, locals?: any) => {
  const values = expression
    .split(' ')
    .filter((splited) => splited.startsWith('#'))
    .map((splited) => splited.replaceAll('#', ''))
  values.forEach((val) => setIn(locals, val, getIn(locals, val) ?? null))
  return locals
}
