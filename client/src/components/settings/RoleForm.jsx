// client/src/components/settings/RoleForm.jsx

import { useState } from "react";

export default function RoleForm({
  permissions,
  initialValues = {
    code: "",
    name: "",
    description: "",
    permissions: []
  },
  onSubmit,
  loading
}) {
  const [form, setForm] =
    useState(initialValues);

  const [error, setError] = useState("");

  const grouped = permissions.reduce(
    (acc, permission) => {
      const module = permission.module || "Other";

      acc[module] = acc[module] || [];
      acc[module].push(permission);

      return acc;
    },
    {}
  );

  const handleChange = event => {
    setForm({
      ...form,
      [event.target.name]: event.target.value
    });

    setError("");
  };

  const togglePermission = permissionId => {
    const exists =
      form.permissions.includes(permissionId);

    setForm({
      ...form,
      permissions: exists
        ? form.permissions.filter(
            id => id !== permissionId
          )
        : [...form.permissions, permissionId]
    });
  };

  const handleSubmit = event => {
    event.preventDefault();

    if (!form.code.trim()) {
      return setError(
        "Role code is required."
      );
    }

    if (!form.name.trim()) {
      return setError(
        "Role name is required."
      );
    }

    onSubmit(form);
  };

  return (
    <form onSubmit={handleSubmit}>
      {error && (
        <p className="error-message">{error}</p>
      )}

      <div>
        <label>Role Code</label>

        <input
          type="text"
          name="code"
          value={form.code}
          onChange={handleChange}
        />
      </div>

      <div>
        <label>Role Name</label>

        <input
          type="text"
          name="name"
          value={form.name}
          onChange={handleChange}
        />
      </div>

      <div>
        <label>Description</label>

        <input
          type="text"
          name="description"
          value={form.description}
          onChange={handleChange}
        />
      </div>

      <div>
        <label>Permissions</label>

        <div className="permission-groups">
          {Object.entries(grouped).map(
            ([module, modulePermissions]) => (
              <div
                key={module}
                className="permission-group"
              >
                <p className="permission-group-title">
                  {module}
                </p>

                {modulePermissions.map(permission => (
                  <div
                    key={permission._id}
                    className="checkbox-field"
                  >
                    <input
                      type="checkbox"
                      id={`perm-${permission._id}`}
                      checked={form.permissions.includes(
                        permission._id
                      )}
                      onChange={() =>
                        togglePermission(permission._id)
                      }
                    />

                    <label
                      htmlFor={`perm-${permission._id}`}
                    >
                      {permission.name}
                    </label>
                  </div>
                ))}
              </div>
            )
          )}
        </div>
      </div>

      <button
        type="submit"
        disabled={loading}
      >
        {loading
          ? "Saving..."
          : "Save Role"}
      </button>
    </form>
  );
}
