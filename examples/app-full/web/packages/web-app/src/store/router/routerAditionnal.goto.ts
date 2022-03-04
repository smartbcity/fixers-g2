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
  return push(`/organizations/add`);
};

const editOrganization = (organizationId: string) => {
  return push(`/organizations/${organizationId}/edit`);
};

const organizationTable = (params?: Object) => {
  return push(
    `/organizations${stringify(params, {
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
