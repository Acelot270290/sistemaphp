import React, { useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import QRCode from "qrcode.react";
import PusherListener from "../PusherListener";
import { useDonation } from "../../hooks/pages/useDonation";
import useClipboard from "../../hooks/useClipboard";
import { Link } from "react-router-dom";

const formatCurrency = (value) => {
  return new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  }).format(value);
};

const parseCurrency = (value) => {
  return Number(value.replace(/\D/g, '')) / 100;
};

function FormDonation() {
  const {
    loading,
    showQRCode,
    qrCodeUrl,
    handleSubmit,
    validationSchema,
    userSlug,
    transactionId,
    getCallbackData,
  } = useDonation();
  const { copied, copyToClipboard } = useClipboard();
  const [messageLength, setMessageLength] = useState(50);

  if (!userSlug) return null;

  return (
    <div className="card">
      <div className="card-header">
        <h3 className="card-title">Doar</h3>
        <p className="text-muted">
          Enviar mensagem para <strong>{userSlug}</strong>
        </p>
      </div>
      <div className="card-body">
        {showQRCode && qrCodeUrl && transactionId ? (
          <>
            <div style={{ textAlign: "center", margin: "20px" }}>
              <QRCode value={qrCodeUrl} />
              <br />
              <textarea
                disabled
                className="form-control my-2"
                name="copy-paste-qrcode"
                id="copy-paste-qrcode"
              >
                {qrCodeUrl}
              </textarea>
              <button
                className={`btn btn-${copied ? "success" : "primary"}`}
                onClick={() => copyToClipboard(qrCodeUrl)}
              >
                {copied ? "Copiado!" : "Copiar Código"}
              </button>
              {copied && <p>Código copiado para a área de transferência</p>}
              <p>Utilize o QR Code para enviar o pagamento</p>
              <p>Por favor, aguarde o pagamento</p>
              <p>Se o pagamento estiver concluído, a mensagem será enviada</p>
              <p>Se o pagamento não estiver concluído, a mensagem não será enviada</p>
            </div>
            <PusherListener
              channelName={`channel-callback-${transactionId}`}
              eventName="event-callback"
              onEvent={(data) => getCallbackData(data)}
            />
          </>
        ) : (
          <Formik
            initialValues={{
              name: "",
              email: "",
              cpf: "",
              amount: "",
              message: "",
              currency: "BRL",
            }}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
          >
            {({ isSubmitting, values, handleChange, setFieldValue }) => (
              <Form>
                <div className="form-group">
                  <label htmlFor="name">Nome</label>
                  <Field
                    type="text"
                    name="name"
                    className="form-control mb-2"
                  />
                  <ErrorMessage
                    name="name"
                    component="div"
                    className="text-danger"
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="email">E-mail</label>
                  <Field
                    type="email"
                    name="email"
                    className="form-control mb-2"
                  />
                  <ErrorMessage
                    name="email"
                    component="div"
                    className="text-danger"
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="cpf">CPF</label>
                  <Field type="text" name="cpf" className="form-control mb-2" />
                  <ErrorMessage
                    name="cpf"
                    component="div"
                    className="text-danger"
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="amount">Valor da Doação</label>
                  <Field
                    type="text"
                    name="amount"
                    className="form-control mb-2"
                    value={formatCurrency(values.amount)}
                    onChange={(e) => {
                      const value = parseCurrency(e.target.value);
                      setFieldValue('amount', value);
                    }}
                  />
                  <ErrorMessage
                    name="amount"
                    component="div"
                    className="text-danger"
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="message">Mensagem (restantes: {messageLength} caracteres)</label>
                  <Field
                    as="textarea"
                    name="message"
                    className="form-control mb-2"
                    maxLength="50"
                    onChange={(e) => {
                      setMessageLength(50 - e.target.value.length);
                      handleChange(e);
                    }}
                  />
                  <ErrorMessage
                    name="message"
                    component="div"
                    className="text-danger"
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="currency">Moeda</label>
                  <Field
                    as="select"
                    name="currency"
                    className="form-control mb-2"
                  >
                    <option value="BRL">Real (BRL)</option>
                    <option value="USD">Dólar Americano (USD)</option>
                  </Field>
                  <ErrorMessage
                    name="currency"
                    component="div"
                    className="text-danger"
                  />
                </div>

                {loading || isSubmitting ? (
                  <div className="spinner-border text-primary" role="status">
                    <span className="visually-hidden">Loading...</span>
                  </div>
                ) : (
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="btn btn-primary"
                  >
                    Gerar Qrcode
                  </button>
                )}
                <p className="mt-3">
                  Ao clicar em continuar, você declara que leu e concorda com os <Link to="/institucional/termos-de-uso">Termos de Uso</Link> e a <Link to="/institucional/politica-de-privacidade">Política de Privacidade</Link>.
                </p>
              </Form>
            )}
          </Formik>
        )}
      </div>
    </div>
  );
}

export default FormDonation;
