// client/src/pages/settings/Settings.jsx

import { useEffect, useState } from "react";

import UserService from "../../services/user.service";
import UserForm from "../../components/settings/UserForm";

export default function Settings() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] =
    useState(true);
  const [error, setError] = useState("");
  const [saving, setSaving] = useState(false);

  const [editingUser, setEditingUser] =
    useState(null);

  useEffect(() => {
    loadUsers();
  }, []);

  const loadUsers = async () => {
    try {
      setLoading(true);

      const response =
        await UserService.getAll();

      setUsers(response.data || []);
    } catch (err) {
      setError(
        "Unable to load users."
      );
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async data => {
    try {
      setSaving(true);

      if (editingUser) {
        await UserService.update(
          editingUser._id,
          data
        );
      } else {
        await UserService.create(data);
      }

      setEditingUser(null);

      await loadUsers();
    } catch (err) {
      setError(
        err?.response?.data?.message ||
        "Unable to save user."
      );
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async id => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this user?"
    );

    if (!confirmed) {
      return;
    }

    try {
      await UserService.delete(id);

      await loadUsers();
    } catch (err) {
      setError(
        err?.response?.data?.message ||
        "Unable to delete user."
      );
    }
  };

  const handleEdit = user => {
    setEditingUser(user);
  };

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <div className="page">
      <h1>Settings</h1>

      <h2>Users</h2>

      <UserForm
        key={editingUser?._id || "new"}
        editing={Boolean(editingUser)}
        loading={saving}
        initialValues={
          editingUser
            ? {
                firstName: editingUser.firstName,
                lastName: editingUser.lastName,
                email: editingUser.email,
                password: "",
                role: editingUser.role
              }
            : undefined
        }
        onSubmit={handleSave}
      />

      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Role</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>

        <tbody>
          {users.map(user => (
            <tr key={user._id}>
              <td>
                {user.firstName} {user.lastName}
              </td>
              <td>{user.email}</td>
              <td>{user.role}</td>
              <td>
                {user.isActive
                  ? "Active"
                  : "Inactive"}
              </td>
              <td>
                <button
                  type="button"
                  onClick={() =>
                    handleEdit(user)
                  }
                >
                  Edit
                </button>

                <button
                  type="button"
                  onClick={() =>
                    handleDelete(user._id)
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
