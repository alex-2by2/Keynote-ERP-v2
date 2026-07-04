// client/src/pages/inventory/Inventory.jsx

import ModulePreview from "../../components/common/ModulePreview";

const modules = [
  "Warehouses",
  "Units of Measure",
  "Item Categories",
  "Stock",
  "Goods Receipts",
  "Goods Issues",
  "Stock Transfers"
];

export default function Inventory() {
  return (
    <ModulePreview
      title="Inventory"
      description="Track stock across warehouses, receipts, issues, and transfers."
      modules={modules}
    />
  );
}
