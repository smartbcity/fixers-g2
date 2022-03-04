import { request } from "utils";
import { OrganizationRef } from "@smartb/g2-i2";
import { useEffect } from "react";
import { useExtendedAuth } from "auth";

//@ts-ignore
const orgUrl = window._env_.i2OrgUrl;

const getAllOrganizationRefs = (jwt: string, url: string) =>
  request<{ organizations: OrganizationRef[] }[]>({
    url: `${url}/getAllOrganizationRefs`,
    method: "POST",
    body: "[{}]",
    jwt: jwt,
  });

export const useInitStore = (params: {
  setOrganizationsRefs: (organizationsRefs: OrganizationRef[]) => void;
}) => {
  const { setOrganizationsRefs } = params;

  const { keycloak } = useExtendedAuth();
  useEffect(() => {
    if (keycloak.authenticated && keycloak.token) {
      getAllOrganizationRefs(keycloak.token, orgUrl).then((res) => {
        if (res) {
          setOrganizationsRefs(res[0]?.organizations ?? []);
        }
      });
    }
  }, [keycloak.authenticated]);
};
