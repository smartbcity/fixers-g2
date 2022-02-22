import React from "react";
import { AutomatedUserTable, User, OrganizationRef } from "@smartb/g2-i2";
import { MenuItem } from "@smartb/g2-components";
import { useCallback } from "react";
import { Link, LinkProps } from "react-router-dom";
import connect from "./UserTableConnect";
import { useMemo } from "react";

export interface UserTablePros {
  url: string;
  jwt?: string;
  gotoUserTable: (params?: Object) => void;
  orgnaizationsRefs: Map<string, OrganizationRef>;
}

export const UserTable = connect((props: UserTablePros) => {
  const { url, jwt, gotoUserTable, orgnaizationsRefs } = props;

  const getActions = useCallback(
    (user: User): MenuItem<LinkProps>[] => [
      {
        key: "edit",
        label: "Edit",
        component: Link,
        componentProps: {
          to: `/users/${user.id}/edit`,
        },
      },
    ],
    []
  );

  const getOrganizationUrl = useCallback(
    (organizationId: string) => `/organizations/${organizationId}/edit`,
    []
  );

  const orgnaizationsRefsArray = useMemo(
    () => Array.from(orgnaizationsRefs.values()),
    [orgnaizationsRefs]
  );

  return (
    <AutomatedUserTable
      organizationsRefs={orgnaizationsRefsArray}
      apiUrl={url}
      jwt={jwt}
      getActions={getActions}
      getOrganizationUrl={getOrganizationUrl}
      submitted={gotoUserTable}
    />
  );
});
