// client/src/pages/sales/Sales.jsx

import ModulePreview from "../../components/common/ModulePreview";

const modules = [
  "Sales Orders",
  "Sales Invoices",
  "Sales Returns"
];

export default function Sales() {
  return (
    <ModulePreview
      title="Sales"
      description="Manage customer sales orders, invoices, and returns."
      modules={modules}
    />
  );
}
