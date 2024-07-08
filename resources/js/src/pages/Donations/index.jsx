import React from "react";
import FormDonation from "../../components/Donations/FormDonation";
import PageTitle from "../../components/PageTitle";

function Donations() {
  return (
    <>
      <PageTitle title="Doações" />
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-md-8 mt-5">
            <FormDonation />
          </div>
        </div>
      </div>
    </>
  );
}

export default Donations;
