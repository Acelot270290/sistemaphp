import React from "react";
import IntegrationCard from "../../components/Itegrations/IntegrationCard";
import { useIntegration } from "../../hooks/pages/useIntegration";

const IntegrationPage = () => {
  const {
    loading,
    streamlabs_integration,
    handleStreamlbsIntegration,
    handleStreamlbsRemoveIntegration,
  } = useIntegration();

  return (
    <div className="container">
      <h1>Integrações</h1>
      {loading && (
        <div className="d-flex justify-content-center">
          <div className="spinner-border text-primary" role="status">
            <span className="visually-hidden">Carregando...</span>
          </div>
        </div>
      )}

      {!loading && (
        <IntegrationCard
          title="Integração com Streamlabs"
          onIntegrate={handleStreamlbsIntegration}
          onRemove={handleStreamlbsRemoveIntegration}
          streamlabs_integration={streamlabs_integration}
        />
      )}
    </div>
  );
};

export default IntegrationPage;
