// client/src/pages/setup/Setup.jsx

import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { useAuth } from "../../store/authStore";

export default function Setup() {
  const navigate = useNavigate();
  const { login } = useAuth();

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const [form, setForm] = useState({
    company: {
      code: "",
      legalName: "",
      displayName: "",
      email: "",
      phone: ""
    },

    owner: {
      firstName: "",
      lastName: "",
      email: "",
      password: ""
    },

    financialYear: {
      code: "",
      name: "",
      startDate: "",
      endDate: ""
    }
  });

  const handleChange = (section, field, value) => {
    setForm(prev => ({
      ...prev,
      [section]: {
        ...prev[section],
        [field]: value
      }
    }));
  };

  const handleSubmit = async e => {
    e.preventDefault();

    try {
      setLoading(true);
      setError("");

      const response = await fetch(
        "/api/setup/initialize",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify(form)
        }
      );

      const result = await response.json();

      if (!result.success) {
        throw new Error(
          result.message || "Setup failed."
        );
      }

      login({
        accessToken:
          result.data.accessToken,
        user: result.data.user
      });

      navigate("/app", {
        replace: true
      });

    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="setup-page">
      <h1>Keynote ERP Setup</h1>

      {error && (
        <p style={{ color: "red" }}>
          {error}
        </p>
      )}

      <form onSubmit={handleSubmit}>

        <h2>Company</h2>

        <input
          placeholder="Company Code"
          value={form.company.code}
          onChange={e =>
            handleChange(
              "company",
              "code",
              e.target.value
            )
          }
        />

        <input
          placeholder="Legal Name"
          value={form.company.legalName}
          onChange={e =>
            handleChange(
              "company",
              "legalName",
              e.target.value
            )
          }
        />

        <input
          placeholder="Display Name"
          value={form.company.displayName}
          onChange={e =>
            handleChange(
              "company",
              "displayName",
              e.target.value
            )
          }
        />

        <input
          placeholder="Email"
          value={form.company.email}
          onChange={e =>
            handleChange(
              "company",
              "email",
              e.target.value
            )
          }
        />

        <input
          placeholder="Phone"
          value={form.company.phone}
          onChange={e =>
            handleChange(
              "company",
              "phone",
              e.target.value
            )
          }
        />

        <h2>Owner</h2>

        <input
          placeholder="First Name"
          value={form.owner.firstName}
          onChange={e =>
            handleChange(
              "owner",
              "firstName",
              e.target.value
            )
          }
        />

        <input
          placeholder="Last Name"
          value={form.owner.lastName}
          onChange={e =>
            handleChange(
              "owner",
              "lastName",
              e.target.value
            )
          }
        />

        <input
          type="email"
          placeholder="Email"
          value={form.owner.email}
          onChange={e =>
            handleChange(
              "owner",
              "email",
              e.target.value
            )
          }
        />

        <input
          type="password"
          placeholder="Password"
          value={form.owner.password}
          onChange={e =>
            handleChange(
              "owner",
              "password",
              e.target.value
            )
          }
        />

        <h2>Financial Year</h2>

        <input
          placeholder="Code"
          value={form.financialYear.code}
          onChange={e =>
            handleChange(
              "financialYear",
              "code",
              e.target.value
            )
          }
        />

        <input
          placeholder="Name"
          value={form.financialYear.name}
          onChange={e =>
            handleChange(
              "financialYear",
              "name",
              e.target.value
            )
          }
        />

        <input
          type="date"
          value={form.financialYear.startDate}
          onChange={e =>
            handleChange(
              "financialYear",
              "startDate",
              e.target.value
            )
          }
        />

        <input
          type="date"
          value={form.financialYear.endDate}
          onChange={e =>
            handleChange(
              "financialYear",
              "endDate",
              e.target.value
            )
          }
        />

        <br />
        <br />

        <button
          type="submit"
          disabled={loading}
        >
          {loading
            ? "Initializing..."
            : "Initialize ERP"}
        </button>

      </form>
    </div>
  );
}
