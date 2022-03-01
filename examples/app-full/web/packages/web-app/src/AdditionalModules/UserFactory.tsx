import React, { useMemo } from "react";
import { AutomatedUserFactory, User } from "@smartb/g2-i2";
import { useCallback } from "react";
import { useParams } from "react-router";
import { parse } from "qs";
import connect from "./UserFactoryConnect";

export interface UserFactoryPros {
  url: string;
  jwt?: string;
  update?: boolean;
  gotoEditUser: (userId?: string | undefined) => void;
  readonly?: boolean;
}

export const UserFactory = connect((props: UserFactoryPros) => {
  const { url, jwt, update, gotoEditUser, readonly = false } = props;
  const { userId } = useParams<{ userId?: string }>();

  const organizationId = useMemo(() => {
    const params = parse(window.location.search, { ignoreQueryPrefix: true });
    if (typeof params.organizationId === "string") {
      return params.organizationId;
    }
    return undefined;
  }, [userId, update]);

  const onSubmitted = useCallback(
    (user: User) => {
      if (!update) {
        gotoEditUser(user.id);
      }
    },
    [update]
  );

  return (
    <AutomatedUserFactory
      apiUrl={url}
      jwt={jwt}
      update={update}
      userId={update ? userId : undefined}
      organizationId={organizationId}
      submitted={onSubmitted}
      readonly={readonly}
    />
  );
});
