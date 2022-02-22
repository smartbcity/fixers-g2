import { createReducer } from "deox";
import { actions } from "./refs.actions";
import { OrganizationRef } from "@smartb/g2-i2";

export interface RefsState {
  organizationsRefs: Map<string, OrganizationRef>;
}

export const initialState: RefsState = {
  organizationsRefs: new Map(),
};

export type RefsStateTransformer = (state: RefsState) => RefsState;

const setOrganizationsRefs = (
  organizationsRefs: OrganizationRef[],
  state: RefsState
): RefsStateTransformer => {
  const map = new Map(organizationsRefs.map((ref) => [ref.id, ref]));
  return () => ({
    ...state,
    organizationsRefs: map,
  });
};

export const refsReducer = createReducer(initialState, (handleAction) => [
  handleAction(actions.setOrganizationsRefs, (state: RefsState, action) =>
    setOrganizationsRefs(action.payload.organizationsRefs, state)(state)
  ),
]);
