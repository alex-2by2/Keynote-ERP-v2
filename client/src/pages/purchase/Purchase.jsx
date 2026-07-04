// client/src/pages/purchase/Purchase.jsx

import ModulePreview from "../../components/common/ModulePreview";

const modules = [
  "Purchase Orders",
  "Purchase Invoices",
  "Purchase Returns"
];

export default function Purchase() {
  return (
    <ModulePreview
      title="Purchase"
      description="Manage vendor purchase orders, invoices, and returns."
      modules={modules}
    />
  );
}
