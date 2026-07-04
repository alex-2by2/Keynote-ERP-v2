// client/src/pages/accounts/Accounts.jsx

import ModulePreview from "../../components/common/ModulePreview";

const modules = [
  "Account Groups",
  "Account Ledgers",
  "Vouchers",
  "Journal Entries",
  "Cost Centers",
  "Financial Years",
  "Payments",
  "Receipts"
];

export default function Accounts() {
  return (
    <ModulePreview
      title="Accounts"
      description="Manage ledgers, vouchers, journal entries, and financial years."
      modules={modules}
    />
  );
}
