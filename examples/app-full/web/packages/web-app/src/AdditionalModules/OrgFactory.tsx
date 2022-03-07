import { AutomatedOrgFactory, Organization } from "@smartb/g2-i2";
import { useCallback } from "react";
import { useParams } from "react-router";
import connect from "./OrgFactoryConnect";
import { Box, Typography } from "@mui/material";
import { UserTable } from "./UserTable";
import { orgRolesOptions } from "auth";

export interface OrgFactoryPros {
  url: string;
  userUrl?: string;
  jwt?: string;
  update?: boolean;
  gotoEditOrganization: (organizationId: string) => void;
  readonly?: boolean;
}

export const OrgFactory = connect((props: OrgFactoryPros) => {
  const {
    url,
    jwt,
    update,
    gotoEditOrganization,
    readonly = false,
    userUrl,
  } = props;
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
    <Box>
      <Typography variant="h6">Info générale</Typography>
      <AutomatedOrgFactory
        apiUrl={url}
        jwt={jwt}
        update={update}
        organizationId={update ? organizationId : undefined}
        submitted={onSubmitted}
        readonly={readonly}
        rolesOptions={orgRolesOptions}
      />
      {userUrl && (
        <>
          <Typography variant="h6">Utilisateurs</Typography>
          <UserTable
            url={userUrl}
            jwt={jwt}
            organizationId={organizationId}
            blockedFilters={{ organizationId: true }}
          />
        </>
      )}
    </Box>
  );
});
