// client/src/pages/settings/Settings.jsx

import ModulePreview from "../../components/common/ModulePreview";

const modules = [
  "User Accounts",
  "Roles & Permissions",
  "Branches & Departments",
  "Designations & Employees"
];

export default function Settings() {
  return (
    <ModulePreview
      title="Settings"
      description="Administer users, roles, and organization structure."
      modules={modules}
    />
  );
}
