// client/src/pages/settings/Settings.jsx

import { useEffect, useState } from "react";

import { useDefaultCompany } from "../../hooks/useDefaultCompany";
import UserService from "../../services/user.service";
import RoleService from "../../services/role.service";
import PermissionService from "../../services/permission.service";
import {
  listUserRoles,
  assignUserRole
} from "../../services/userRole.service";
import UserForm from "../../components/settings/UserForm";
import RoleForm from "../../components/settings/RoleForm";

export default function Settings() {
  const {
    companyId,
    loading: companyLoading,
    error: companyError
  } = useDefaultCompany();

  const [tab, setTab] = useState("users");

  const [users, setUsers] = useState([]);
  const [roles, setRoles] = useState([]);
  const [permissions, setPermissions] = useState([]);
  const [userRoles, setUserRoles] = useState([]);
  const [assignments, setAssignments] = useState({});

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const [savingUser, setSavingUser] = useState(false);
  const [savingRole, setSavingRole] = useState(false);
  const [savingAssignment, setSavingAssignment] = useState(null);

  const [editingUser, setEditingUser] = useState(null);
  const [editingRole, setEditingRole] = useState(null);

  useEffect(() => {
    if (companyId) {
      init(companyId);
    }
  }, [companyId]);

  const init = async company => {
    try {
      setLoading(true);

      const [
        userResponse,
        roleResponse,
        permissionResponse,
        userRoleResponse
      ] = await Promise.all([
        UserService.getAll(),
        RoleService.getAll(),
        PermissionService.getAll(),
        listUserRoles({ company })
      ]);

      const loadedUsers = userResponse.data || [];
      const loadedRoles = roleResponse.data || [];
      const loadedUserRoles = userRoleResponse.data || [];

      setUsers(loadedUsers);
      setRoles(loadedRoles);
      setPermissions(permissionResponse.data || []);
      setUserRoles(loadedUserRoles);

      const draft = {};

      loadedUsers.forEach(user => {
        const match = loadedUserRoles.find(
          userRole =>
            (userRole.user?._id || userRole.user) === user._id
        );

        draft[user._id] =
          match?.role?._id ||
          match?.role ||
          loadedRoles[0]?._id ||
          "";
      });

      setAssignments(draft);
    } catch (err) {
      setError("Unable to load settings.");
    } finally {
      setLoading(false);
    }
  };

  const loadUsers = async () => {
    const response = await UserService.getAll();

    setUsers(response.data || []);
  };

  const loadRoles = async () => {
    const response = await RoleService.getAll();

    setRoles(response.data || []);
  };

  const loadUserRoles = async () => {
    const response = await listUserRoles({
      company: companyId
    });

    setUserRoles(response.data || []);
  };

  const handleSaveUser = async data => {
    try {
      setSavingUser(true);

      if (editingUser) {
        await UserService.update(editingUser._id, data);
      } else {
        await UserService.create(data);
      }

      setEditingUser(null);

      await loadUsers();
    } catch (err) {
      setError(
        err?.response?.data?.message || "Unable to save user."
      );
    } finally {
      setSavingUser(false);
    }
  };

  const handleDeleteUser = async id => {
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
        err?.response?.data?.message || "Unable to delete user."
      );
    }
  };

  const handleSaveRole = async data => {
    try {
      setSavingRole(true);

      if (editingRole) {
        await RoleService.update(editingRole._id, data);
      } else {
        await RoleService.create(data);
      }

      setEditingRole(null);

      await loadRoles();
    } catch (err) {
      setError(
        err?.response?.data?.message || "Unable to save role."
      );
    } finally {
      setSavingRole(false);
    }
  };

  const handleDeleteRole = async id => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this role?"
    );

    if (!confirmed) {
      return;
    }

    try {
      await RoleService.delete(id);

      await loadRoles();
    } catch (err) {
      setError(
        err?.response?.data?.message || "Unable to delete role."
      );
    }
  };

  const handleAssignmentChange = (userId, roleId) => {
    setAssignments({
      ...assignments,
      [userId]: roleId
    });
  };

  const handleSaveAssignment = async userId => {
    setError("");
    setSuccess("");

    try {
      setSavingAssignment(userId);

      await assignUserRole({
        user: userId,
        role: assignments[userId],
        company: companyId
      });

      await loadUserRoles();

      setSuccess("Role assigned.");
    } catch (err) {
      setError(
        err?.response?.data?.message ||
        "Unable to assign role."
      );
    } finally {
      setSavingAssignment(null);
    }
  };

  if (companyLoading || loading) {
    return <p>Loading...</p>;
  }

  if (companyError) {
    return <p>{companyError}</p>;
  }

  if (error) {
    return <p className="error-message">{error}</p>;
  }

  return (
    <div className="page">
      <h1>Settings</h1>

      <div className="tabs">
        <button
          type="button"
          className={
            tab === "users" ? "tab-button active" : "tab-button"
          }
          onClick={() => setTab("users")}
        >
          Users
        </button>

        <button
          type="button"
          className={
            tab === "roles" ? "tab-button active" : "tab-button"
          }
          onClick={() => setTab("roles")}
        >
          Roles
        </button>

        <button
          type="button"
          className={
            tab === "assign" ? "tab-button active" : "tab-button"
          }
          onClick={() => setTab("assign")}
        >
          Assign Roles
        </button>
      </div>

      {success && <p className="success-message">{success}</p>}

      {tab === "users" && (
        <>
          <h2>Users</h2>

          <UserForm
            key={editingUser?._id || "new"}
            editing={Boolean(editingUser)}
            loading={savingUser}
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
            onSubmit={handleSaveUser}
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
                  <td>{user.isActive ? "Active" : "Inactive"}</td>
                  <td>
                    <button
                      type="button"
                      onClick={() => setEditingUser(user)}
                    >
                      Edit
                    </button>

                    <button
                      type="button"
                      onClick={() => handleDeleteUser(user._id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </>
      )}

      {tab === "roles" && (
        <>
          <h2>Roles</h2>

          <RoleForm
            key={editingRole?._id || "new-role"}
            permissions={permissions}
            loading={savingRole}
            initialValues={
              editingRole
                ? {
                    code: editingRole.code,
                    name: editingRole.name,
                    description: editingRole.description || "",
                    permissions: (editingRole.permissions || []).map(
                      permission => permission._id || permission
                    )
                  }
                : undefined
            }
            onSubmit={handleSaveRole}
          />

          <table>
            <thead>
              <tr>
                <th>Code</th>
                <th>Name</th>
                <th>Permissions</th>
                <th>Actions</th>
              </tr>
            </thead>

            <tbody>
              {roles.map(role => (
                <tr key={role._id}>
                  <td>{role.code}</td>
                  <td>{role.name}</td>
                  <td>{(role.permissions || []).length}</td>
                  <td>
                    <button
                      type="button"
                      onClick={() => setEditingRole(role)}
                    >
                      Edit
                    </button>

                    {!role.system && (
                      <button
                        type="button"
                        onClick={() => handleDeleteRole(role._id)}
                      >
                        Delete
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </>
      )}

      {tab === "assign" && (
        <>
          <h2>Assign Roles</h2>

          {roles.length === 0 ? (
            <p>Create at least one Role first.</p>
          ) : (
            <table>
              <thead>
                <tr>
                  <th>User</th>
                  <th>Role</th>
                  <th></th>
                </tr>
              </thead>

              <tbody>
                {users.map(user => (
                  <tr key={user._id}>
                    <td>
                      {user.firstName} {user.lastName}
                    </td>
                    <td>
                      <select
                        value={assignments[user._id] || ""}
                        onChange={event =>
                          handleAssignmentChange(
                            user._id,
                            event.target.value
                          )
                        }
                      >
                        {roles.map(role => (
                          <option key={role._id} value={role._id}>
                            {role.name}
                          </option>
                        ))}
                      </select>
                    </td>
                    <td>
                      <button
                        type="button"
                        disabled={savingAssignment === user._id}
                        onClick={() => handleSaveAssignment(user._id)}
                      >
                        {savingAssignment === user._id
                          ? "Saving..."
                          : "Save"}
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </>
      )}
    </div>
  );
}
