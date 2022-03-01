import React, { useMemo } from "react";
import {
  AutomatedOrgTable,
  Organization,
  OrgTableFilters,
} from "@smartb/g2-i2";
import { MenuItem, Button } from "@smartb/g2-components";
import { useCallback } from "react";
import { Link, LinkProps } from "react-router-dom";
import { parse, stringify } from "qs";
import connect from "./OrgTableConnect";

export interface OrgTablePros {
  url: string;
  jwt?: string;
  gotoOrganizationTable: (params?: Object) => void;
  gotoCreateOrganization: () => void;
}

export const OrgTable = connect((props: OrgTablePros) => {
  const { url, jwt, gotoOrganizationTable, gotoCreateOrganization } = props;

  const getActions = useCallback(
    (org: Organization): MenuItem<LinkProps>[] => [
      {
        key: "edit",
        label: "Edit",
        component: Link,
        componentProps: {
          to: `/organizations/${org.id}/edit`,
        },
      },
      {
        key: "createUser",
        label: "Create user",
        component: Link,
        componentProps: {
          to: `/users/add${stringify(
            { organizationId: org.id },
            { addQueryPrefix: true }
          )}`,
        },
      },
      {
        key: "viewUser",
        label: "View users",
        component: Link,
        componentProps: {
          to: `/users${stringify(
            { organizationId: org.id },
            { addQueryPrefix: true }
          )}`,
        },
      },
    ],
    []
  );

  const params = useMemo((): OrgTableFilters => {
    const params = parse(window.location.search, { ignoreQueryPrefix: true });
    let search = undefined;
    let role = undefined;
    let page = undefined;
    if (typeof params.search === "string") {
      search = params.search;
    }
    if (typeof params.role === "string") {
      role = params.role;
    }
    if (typeof params.page === "string") {
      page = Number(params.page);
    }
    return {
      search: search,
      role: role,
      page: page,
    };
  }, []);

  const actions = useMemo(
    () => (
      <Button onClick={() => gotoCreateOrganization()}>
        Créer une organisation
      </Button>
    ),
    []
  );

  return (
    <AutomatedOrgTable
      apiUrl={url}
      jwt={jwt}
      getActions={getActions}
      submitted={gotoOrganizationTable}
      TableActions={actions}
      initialFiltersValues={params}
    />
  );
});
