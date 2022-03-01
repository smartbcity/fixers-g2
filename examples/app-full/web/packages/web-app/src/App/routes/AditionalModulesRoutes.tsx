import React from "react";
import { useAuth } from "@smartb/g2-providers";
import { OrgTable, OrgFactory } from "AdditionalModules";
import { Route } from "react-router";
import { UserTable } from "AdditionalModules/UserTable";
import { UserFactory } from "AdditionalModules/UserFactory";

//@ts-ignore
const orgUrl = window._env_.i2OrgUrl;

//@ts-ignore
const userUrl = window._env_.i2UserUrl;

export const AditionalModulesRoutes = () => {
  const { keycloak } = useAuth();
  if (!keycloak.authenticated) return <></>;
  return (
    <>
      {orgUrl && (
        <>
          <Route exact path="/organizations">
            <OrgTable url={orgUrl} jwt={keycloak.token} />
          </Route>
          <Route exact path="/organizations/:organizationId/edit">
            <OrgFactory
              url={orgUrl}
              userUrl={userUrl}
              jwt={keycloak.token}
              update
            />
          </Route>
          <Route exact path="/organizations/:organizationId/view">
            <OrgFactory
              url={orgUrl}
              userUrl={userUrl}
              jwt={keycloak.token}
              readonly
            />
          </Route>
          <Route exact path="/organizations/add">
            <OrgFactory url={orgUrl} userUrl={userUrl} jwt={keycloak.token} />
          </Route>
        </>
      )}
      {userUrl && (
        <>
          <Route exact path="/users">
            <UserTable url={userUrl} jwt={keycloak.token} />
          </Route>
          <Route exact path="/users/:userId/edit">
            <UserFactory url={userUrl} jwt={keycloak.token} update />
          </Route>
          <Route exact path="/users/:userId/view">
            <UserFactory url={userUrl} jwt={keycloak.token} readonly />
          </Route>
          <Route exact path="/users/add">
            <UserFactory url={userUrl} jwt={keycloak.token} />
          </Route>
        </>
      )}
    </>
  );
};
