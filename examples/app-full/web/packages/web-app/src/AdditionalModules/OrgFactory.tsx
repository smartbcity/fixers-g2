import React from "react";
import { AutomatedOrgFactory, Organization } from "@smartb/g2-i2";
import { useCallback } from "react";
import { useParams } from "react-router";
import connect from "./OrgFactoryConnect";

export interface OrgFactoryPros {
  url: string;
  jwt?: string;
  update?: boolean;
  gotoEditOrganization: (organizationId: string) => void;
}

export const OrgFactory = connect((props: OrgFactoryPros) => {
  const { url, jwt, update, gotoEditOrganization } = props;
  const { organizationId } = useParams<{ organizationId?: string }>();

  const onSubmitted = useCallback(
    (organization: Organization) => {
      if (!update) {
        gotoEditOrganization(organization.id);
      }
    },
    [update]
  );

  return (
    <AutomatedOrgFactory
      apiUrl={url}
      jwt={jwt}
      update={update}
      organizationId={update ? organizationId : undefined}
      submitted={onSubmitted}
    />
  );
});
