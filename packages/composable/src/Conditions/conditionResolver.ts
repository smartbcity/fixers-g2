import { SpelExpressionEvaluator } from 'spel2js'
import { FieldValidatorFnc } from '../FormComposable/type/FormComposableField'

export interface ConditionBase {
  type: string
  expression: string
}

export interface DisplayCondition extends ConditionBase {
  type: 'display'
}

export interface ValidatorCondition extends ConditionBase {
  type: 'validator'
  error: string
}

export type Condition = DisplayCondition | ValidatorCondition

export interface SectionCondition extends ConditionBase {
  type: 'info' | 'error' | 'warning'
  message: string
}

export const evalCondition = (
  condition: ConditionBase,
  locals: any
): boolean => {
  console.log(
    condition.expression,
    SpelExpressionEvaluator.eval(condition.expression, null, locals),
    locals
  )
  return SpelExpressionEvaluator.eval(condition.expression, null, locals)
}

export const evalDisplayConditions = (
  conditions?: Condition[],
  values?: any
): boolean => {
  if (!conditions) return true
  const displayConditions = conditions.filter((cond) => cond.type === 'display')
  if (displayConditions.length === 0) return true
  return displayConditions.every((cond) => evalCondition(cond, values))
}

export const validateConditions =
  (conditions: Condition[]): FieldValidatorFnc =>
  (values?: any) => {
    //@ts-ignore
    const validatorConditions: ValidatorCondition[] = conditions.filter(
      (cond) => cond.type === 'validator'
    )
    for (let cond of validatorConditions) {
      if (evalCondition(cond, values)) return cond.error
    }
    return
  }
