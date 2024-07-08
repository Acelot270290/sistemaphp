import Swal from "sweetalert2";

export const showResponseError = (error) => {
  if (error.response) {
    if (error.response.status === 500) {
      showMessage("Erro interno. Contate os administradores", "error", "Ops");
    } else if (error.response.status === 400) {
      showMessage(
        "Houve uma falha ao processar esta solicitação, tente novamente.",
        "error",
        "Ops"
      );
    } else if (error.response.status === 403) {
      showMessage("Esta acao é não autorizada.", "error", "Ops");
    } else if (error.response.status === 405) {
      showMessage(
        "Erro interno. Recurso não encontrado, contate os administradores",
        "error",
        "Ops"
      );
    } else if (error.response.status === 401) {
      Swal.fire({
        title: "Uau!",
        text: "Usuário não autenticado, por favor tente sair e entrar novamente",
        icon: "error",
        buttonsStyling: false,
        confirmButtonText: "Ok, entendi!",
        customClass: {
          confirmButton: "btn btn-primary",
        },
      });
    } else if (error.response.status === 404) {
      Swal.fire({
        title: "Uau!",
        text: "Recurso não encontrado",
        icon: "error",
        buttonsStyling: false,
        confirmButtonText: "Ok, entendi!",
        customClass: {
          confirmButton: "btn btn-primary",
        },
      });
    } else {
      if (error.response.status === 422) {
        const response = error.response.data;
        if (response.errors) {
          let errors = Object.values(response.errors);
          errors = errors.flat();
          let message = errors.join("\n");
          showMessage(message, "warning");
        }
      }
    }
  }
};

export const showMessage = (
  message,
  status = "success",
  title = "",
  timer = 3000
) => {
  if (message) {
    Swal.fire({
      title,
      text: message,
      icon: status,
      buttonsStyling: false,
      confirmButtonText: "Ok, entendi!",
      customClass: {
        confirmButton: "btn btn-primary",
      },
      timer: status !== "success" ? 0 : timer,
    });
  }
};

export const BRL_withSymbol = (digits) => {
  return new Intl.NumberFormat("pt-BR", {
    maximumFractionDigits: digits,
    minimumFractionDigits: digits,
    style: "currency",
    currency: "BRL",
    currencyDisplay: "narrowSymbol",
  });
};
