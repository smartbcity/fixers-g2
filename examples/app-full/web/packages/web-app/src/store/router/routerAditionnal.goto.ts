import { push } from "connected-react-router";
import { stringify } from "qs";

const createUser = (params?: Object) => {
  return push(
    `/users/add${stringify(params, {
      addQueryPrefix: true,
      arrayFormat: "repeat",
    })}`
  );
};

const editUser = (userId?: string) => {
  return push(`/users/${userId}/edit`);
};

const userTable = (params?: Object) => {
  return push(
    `/users${stringify(params, {
      addQueryPrefix: true,
      arrayFormat: "repeat",
    })}`
  );
};

const createOrganization = () => {
  return push(`/organiations/add`);
};

const editOrganization = (organizationId: string) => {
  return push(`/organiations/${organizationId}/edit`);
};

const organizationTable = (params?: Object) => {
  return push(
    `/organiations${stringify(params, {
      addQueryPrefix: true,
      arrayFormat: "repeat",
    })}`
  );
};

export const gotoAditionalModules = {
  createUser: createUser,
  editUser: editUser,
  userTable: userTable,
  createOrganization: createOrganization,
  editOrganization: editOrganization,
  organizationTable: organizationTable,
};
