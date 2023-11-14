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
  const properLocals = localsUndefinedToNull(condition.expression, locals)
  console.log(
    condition.expression,
    SpelExpressionEvaluator.eval(condition.expression, null, properLocals),
    properLocals
  )
  return SpelExpressionEvaluator.eval(condition.expression, null, properLocals)
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
  (_?: any, values?: any) => {
    //@ts-ignore
    const validatorConditions: ValidatorCondition[] = conditions.filter(
      (cond) => cond.type === 'validator'
    )
    for (let cond of validatorConditions) {
      if (evalCondition(cond, values)) return cond.error
    }
    return
  }

export const requiredFieldConditions = (
  t: (key: string) => string,
  fieldName: string
): Condition => {
  return {
    type: 'validator',
    expression: `#${fieldName} == null || #${fieldName}?.length == 0 || #${fieldName} == '' `,
    error: t('g2.fieldRequired')
  }
}

const localsUndefinedToNull = (expression: string, locals: any) => {
  const copy = {
    ...locals
  }
  const values = expression
    .split(' ')
    .filter((str) => str.includes('#') && !str.includes('.'))
    .map((value) => value.replace('#', ''))
  values.forEach((value) => {
    copy[value] = copy[value] ?? null
  })
  return copy
}
