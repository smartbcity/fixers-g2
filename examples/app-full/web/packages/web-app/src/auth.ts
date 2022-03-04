import { useAuth, KeycloackService } from "@smartb/g2-providers";

export type Roles = "admin" | "user";

export const rolesOptions = [
  {
    key: "admin",
    label: "Administrateur",
  },
  {
    key: "user",
    label: "Utilisateur",
  },
];

export type OrgRoles = "manager" | "operator";

export const orgRolesOptions = [
  {
    key: "manager",
    label: "Manager",
  },
  {
    key: "operator",
    label: "Opérateur",
  },
];

export type User = {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
};

type StaticServices = {
  isUserAdmin: { returnType: boolean };
};

const staticServices: KeycloackService<StaticServices, Roles> = {
  isUserAdmin: (keycloack) => {
    return keycloack.hasRealmRole("admin");
  },
};

export const useExtendedAuth = () =>
  useAuth<StaticServices, Roles>(staticServices);
