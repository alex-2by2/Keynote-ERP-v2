// client/src/hooks/useDefaultCompany.js

import { useEffect, useState } from "react";

import CompanyService from "../services/company.service";

export function useDefaultCompany() {
  const [companyId, setCompanyId] =
    useState(null);

  const [loading, setLoading] =
    useState(true);

  const [error, setError] =
    useState("");

  useEffect(() => {
    load();
  }, []);

  const load = async () => {
    try {
      setLoading(true);

      const response =
        await CompanyService.getAll();

      const firstCompany =
        (response.data || [])[0];

      if (!firstCompany) {
        setError(
          "Create a company first, under Companies."
        );

        return;
      }

      setCompanyId(firstCompany._id);
    } catch (err) {
      setError(
        "Unable to load company."
      );
    } finally {
      setLoading(false);
    }
  };

  return { companyId, loading, error };
}
