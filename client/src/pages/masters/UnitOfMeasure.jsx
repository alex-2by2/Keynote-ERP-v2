// client/src/pages/masters/UnitOfMeasure.jsx

import { useEffect, useState } from "react";

import { useDefaultCompany } from "../../hooks/useDefaultCompany";
import UnitOfMeasureService from "../../services/unitOfMeasure.service";
import UnitOfMeasureForm from "../../components/masters/UnitOfMeasureForm";

export default function UnitOfMeasure() {
  const {
    companyId,
    loading: companyLoading,
    error: companyError
  } = useDefaultCompany();

  const [units, setUnits] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [saving, setSaving] = useState(false);

  const [editingUnit, setEditingUnit] =
    useState(null);

  useEffect(() => {
    if (companyId) {
      loadUnits(companyId);
    }
  }, [companyId]);

  const loadUnits = async company => {
    try {
      setLoading(true);

      const response =
        await UnitOfMeasureService.getAll({
          company
        });

      setUnits(response.data || []);
    } catch (err) {
      setError(
        "Unable to load units of measure."
      );
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async data => {
    const payload = {
      ...data,
      company: companyId
    };

    try {
      setSaving(true);

      if (editingUnit) {
        await UnitOfMeasureService.update(
          editingUnit._id,
          payload
        );
      } else {
        await UnitOfMeasureService.create(
          payload
        );
      }

      setEditingUnit(null);

      await loadUnits(companyId);
    } catch (err) {
      setError(
        err?.response?.data?.message ||
        "Unable to save unit."
      );
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async id => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this unit?"
    );

    if (!confirmed) {
      return;
    }

    try {
      await UnitOfMeasureService.delete(id);

      await loadUnits(companyId);
    } catch (err) {
      setError(
        err?.response?.data?.message ||
        "Unable to delete unit."
      );
    }
  };

  const handleEdit = unit => {
    setEditingUnit(unit);
  };

  if (companyLoading || loading) {
    return <p>Loading...</p>;
  }

  if (companyError) {
    return <p>{companyError}</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <div className="page">
      <h1>Units of Measure</h1>

      <UnitOfMeasureForm
        key={editingUnit?._id || "new"}
        loading={saving}
        initialValues={
          editingUnit
            ? {
                code: editingUnit.code,
                name: editingUnit.name,
                symbol: editingUnit.symbol,
                category: editingUnit.category,
                baseUnit: editingUnit.baseUnit,
                conversionFactor: String(
                  editingUnit.conversionFactor
                )
              }
            : undefined
        }
        onSubmit={handleSave}
      />

      <table>
        <thead>
          <tr>
            <th>Code</th>
            <th>Name</th>
            <th>Symbol</th>
            <th>Category</th>
            <th>Base</th>
            <th>Factor</th>
            <th>Actions</th>
          </tr>
        </thead>

        <tbody>
          {units.map(unit => (
            <tr key={unit._id}>
              <td>{unit.code}</td>
              <td>{unit.name}</td>
              <td>{unit.symbol}</td>
              <td>{unit.category}</td>
              <td>
                {unit.baseUnit ? "Yes" : "No"}
              </td>
              <td>{unit.conversionFactor}</td>
              <td>
                <button
                  type="button"
                  onClick={() =>
                    handleEdit(unit)
                  }
                >
                  Edit
                </button>

                <button
                  type="button"
                  onClick={() =>
                    handleDelete(unit._id)
                  }
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
