// client/src/pages/accounts/Accounts.jsx

import { useEffect, useState } from "react";

import { useDefaultCompany } from "../../hooks/useDefaultCompany";
import AccountGroupService from "../../services/accountGroup.service";
import AccountLedgerService from "../../services/accountLedger.service";
import AccountGroupForm from "../../components/masters/AccountGroupForm";
import AccountLedgerForm from "../../components/masters/AccountLedgerForm";

export default function Accounts() {
  const {
    companyId,
    loading: companyLoading,
    error: companyError
  } = useDefaultCompany();

  const [groups, setGroups] = useState([]);
  const [ledgers, setLedgers] = useState([]);

  const [loading, setLoading] =
    useState(true);
  const [error, setError] = useState("");

  const [savingGroup, setSavingGroup] =
    useState(false);
  const [savingLedger, setSavingLedger] =
    useState(false);

  const [editingGroup, setEditingGroup] =
    useState(null);
  const [editingLedger, setEditingLedger] =
    useState(null);

  useEffect(() => {
    if (companyId) {
      init(companyId);
    }
  }, [companyId]);

  const init = async company => {
    try {
      setLoading(true);

      const [groupResponse, ledgerResponse] =
        await Promise.all([
          AccountGroupService.getAll({
            company
          }),
          AccountLedgerService.getAll({
            company
          })
        ]);

      setGroups(groupResponse.data || []);
      setLedgers(ledgerResponse.data || []);
    } catch (err) {
      setError(
        "Unable to load accounts."
      );
    } finally {
      setLoading(false);
    }
  };

  const loadGroups = async () => {
    const response =
      await AccountGroupService.getAll({
        company: companyId
      });

    setGroups(response.data || []);
  };

  const loadLedgers = async () => {
    const response =
      await AccountLedgerService.getAll({
        company: companyId
      });

    setLedgers(response.data || []);
  };

  const handleSaveGroup = async data => {
    const payload = {
      ...data,
      company: companyId
    };

    try {
      setSavingGroup(true);

      if (editingGroup) {
        await AccountGroupService.update(
          editingGroup._id,
          payload
        );
      } else {
        await AccountGroupService.create(
          payload
        );
      }

      setEditingGroup(null);

      await loadGroups();
    } catch (err) {
      setError(
        err?.response?.data?.message ||
        "Unable to save account group."
      );
    } finally {
      setSavingGroup(false);
    }
  };

  const handleDeleteGroup = async id => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this account group?"
    );

    if (!confirmed) {
      return;
    }

    try {
      await AccountGroupService.delete(id);

      await loadGroups();
    } catch (err) {
      setError(
        err?.response?.data?.message ||
        "Unable to delete account group."
      );
    }
  };

  const handleSaveLedger = async data => {
    const payload = {
      ...data,
      company: companyId
    };

    try {
      setSavingLedger(true);

      if (editingLedger) {
        await AccountLedgerService.update(
          editingLedger._id,
          payload
        );
      } else {
        await AccountLedgerService.create(
          payload
        );
      }

      setEditingLedger(null);

      await loadLedgers();
    } catch (err) {
      setError(
        err?.response?.data?.message ||
        "Unable to save account ledger."
      );
    } finally {
      setSavingLedger(false);
    }
  };

  const handleDeleteLedger = async id => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this account ledger?"
    );

    if (!confirmed) {
      return;
    }

    try {
      await AccountLedgerService.delete(id);

      await loadLedgers();
    } catch (err) {
      setError(
        err?.response?.data?.message ||
        "Unable to delete account ledger."
      );
    }
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
      <h1>Accounts</h1>

      <h2>Account Groups</h2>

      <AccountGroupForm
        key={editingGroup?._id || "new-group"}
        loading={savingGroup}
        initialValues={
          editingGroup
            ? {
                code: editingGroup.code,
                name: editingGroup.name,
                nature: editingGroup.nature,
                description:
                  editingGroup.description || ""
              }
            : undefined
        }
        onSubmit={handleSaveGroup}
      />

      <table>
        <thead>
          <tr>
            <th>Code</th>
            <th>Name</th>
            <th>Nature</th>
            <th>Actions</th>
          </tr>
        </thead>

        <tbody>
          {groups.map(group => (
            <tr key={group._id}>
              <td>{group.code}</td>
              <td>{group.name}</td>
              <td>{group.nature}</td>
              <td>
                <button
                  type="button"
                  onClick={() =>
                    setEditingGroup(group)
                  }
                >
                  Edit
                </button>

                <button
                  type="button"
                  onClick={() =>
                    handleDeleteGroup(group._id)
                  }
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <h2>Account Ledgers</h2>

      {groups.length === 0 ? (
        <p>
          Create at least one Account Group above
          before adding ledgers.
        </p>
      ) : (
        <>
          <AccountLedgerForm
            key={editingLedger?._id || "new-ledger"}
            groups={groups}
            loading={savingLedger}
            initialValues={
              editingLedger
                ? {
                    code: editingLedger.code,
                    name: editingLedger.name,
                    accountGroup:
                      editingLedger.accountGroup?._id ||
                      editingLedger.accountGroup,
                    openingBalance: String(
                      editingLedger.openingBalance ?? 0
                    ),
                    openingBalanceType:
                      editingLedger.openingBalanceType,
                    phone: editingLedger.phone || "",
                    email: editingLedger.email || ""
                  }
                : undefined
            }
            onSubmit={handleSaveLedger}
          />

          <table>
            <thead>
              <tr>
                <th>Code</th>
                <th>Name</th>
                <th>Group</th>
                <th>Balance</th>
                <th>Actions</th>
              </tr>
            </thead>

            <tbody>
              {ledgers.map(ledger => (
                <tr key={ledger._id}>
                  <td>{ledger.code}</td>
                  <td>{ledger.name}</td>
                  <td>
                    {ledger.accountGroup?.name}
                  </td>
                  <td>
                    {ledger.currentBalance}{" "}
                    {ledger.balanceType}
                  </td>
                  <td>
                    <button
                      type="button"
                      onClick={() =>
                        setEditingLedger(ledger)
                      }
                    >
                      Edit
                    </button>

                    <button
                      type="button"
                      onClick={() =>
                        handleDeleteLedger(
                          ledger._id
                        )
                      }
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
    </div>
  );
}
