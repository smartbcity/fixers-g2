import {
  AutomatedUserTable,
  User,
  OrganizationRef,
  UserTableFilters,
  UserTableBlockedFilters,
} from "@smartb/g2-i2";
import { MenuItem, Button } from "@smartb/g2-components";
import { useCallback } from "react";
import { Link, LinkProps } from "react-router-dom";
import connect from "./UserTableConnect";
import { useMemo } from "react";
import { parse } from "qs";
import { rolesOptions } from "auth";

export interface UserTablePros {
  url: string;
  jwt?: string;
  gotoUserTable: (params?: Object) => void;
  orgnaizationsRefs: Map<string, OrganizationRef>;
  gotoCreateUser: (params?: Object | undefined) => void;
  organizationId?: string;
  blockedFilters?: UserTableBlockedFilters;
}

export const UserTable = connect((props: UserTablePros) => {
  const {
    url,
    jwt,
    gotoUserTable,
    orgnaizationsRefs,
    gotoCreateUser,
    organizationId,
    blockedFilters,
  } = props;

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

  const params = useMemo((): UserTableFilters => {
    const params = parse(window.location.search, { ignoreQueryPrefix: true });
    let org = undefined;
    let search = undefined;
    let role = undefined;
    let page = undefined;
    if (typeof params.organizationId === "string") {
      org = params.organizationId;
    }
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
      organizationId: organizationId ?? org,
      search: search,
      role: role,
      page: page,
    };
  }, [organizationId]);

  const getOrganizationUrl = useCallback(
    (organizationId: string) => `/organizations/${organizationId}/edit`,
    []
  );

  const orgnaizationsRefsArray = useMemo(
    () => Array.from(orgnaizationsRefs.values()),
    [orgnaizationsRefs]
  );

  const actions = useMemo(
    () => (
      <Button
        onClick={() =>
          gotoCreateUser({
            organizationId: organizationId ?? params.organizationId,
          })
        }
      >
        Créer un utilisateur
      </Button>
    ),
    [organizationId, params.organizationId]
  );

  return (
    <AutomatedUserTable
      organizationsRefs={orgnaizationsRefsArray}
      apiUrl={url}
      jwt={jwt}
      getActions={getActions}
      getOrganizationUrl={getOrganizationUrl}
      submitted={gotoUserTable}
      tableActions={actions}
      blockedFilters={blockedFilters}
      rolesOptions={rolesOptions}
      initialFiltersValues={params}
    />
  );
});
