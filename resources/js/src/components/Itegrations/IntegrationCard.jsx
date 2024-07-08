import React from "react";
import PropTypes from "prop-types";

const IntegrationCard = ({
  title,
  onIntegrate,
  onRemove,
  streamlabs_integration,
}) => {
  return (
    <div className="card mt-3">
      <div className="card-header">{title}</div>
      <div className="card-body">
        {!streamlabs_integration?.id ? (
          <button className="btn btn-primary" onClick={onIntegrate}>
            Quero fazer integração
          </button>
        ) : (
          <button className="btn btn-danger" onClick={onRemove}>
            Remover Integração
          </button>
        )}
      </div>
    </div>
  );
};

IntegrationCard.defaultProps = {
  onIntegrate: () => {},
  onRemove: () => {},
};

IntegrationCard.propTypes = {
  title: PropTypes.string.isRequired,
  streamlabs_integration: PropTypes.object,
  onIntegrate: PropTypes.func,
  onRemove: PropTypes.func,
};

export default IntegrationCard;
