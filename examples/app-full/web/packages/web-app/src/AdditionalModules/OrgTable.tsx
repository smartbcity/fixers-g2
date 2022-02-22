import React from "react";
import { AutomatedOrgTable, Organization } from "@smartb/g2-i2";
import { MenuItem } from "@smartb/g2-components";
import { useCallback } from "react";
import { Link, LinkProps } from "react-router-dom";
import { stringify } from "qs";
import connect from "./OrgTableConnect";

export interface OrgTablePros {
  url: string;
  jwt?: string;
  gotoOrganizationTable: (params?: Object) => void;
}

export const OrgTable = connect((props: OrgTablePros) => {
  const { url, jwt, gotoOrganizationTable } = props;

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

  return (
    <AutomatedOrgTable
      apiUrl={url}
      jwt={jwt}
      getActions={getActions}
      submitted={gotoOrganizationTable}
    />
  );
});
