function generateUUID() {
  return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, function (c) {
    const r = (Math.random() * 16) | 0;
    const v = c === "x" ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });
}

$(document).ready(function () {
  $(".cpf-mask").inputmask("999.999.999-99", { removeMaskOnSubmit: true });
  $("#submitBtn").click(function () {
    $(".loading-overlay").css("display", "block");
    const formData = new FormData($("#donationForm")[0]);
    const email = formData.get("identifier");
    const cpf = formData.get("cpf");

    formData.set(
      "customer_id",
      "af52878c29d50a9bb5a04f07f9e9685b/18328865391587239470;o=1"
    );
    formData.set("document", cpf);
    formData.set("email", email);
    formData.set("currency", "BRL");
    formData.append("payment_method", "pix");
    formData.append(
      "callback",
      "https://014e-2804-13c-24e-200-b98c-d94d-97cd-c287.ngrok-free.app/api/smartfastpay/payment/notification"
    );

    const newTransactionId = generateUUID();
    formData.append("transaction[id]", newTransactionId);

    axios
      .post("/api/smartfastpay/payment/", formData)
      .then(function (paymentResponse) {
        console.log("Sucesso na segunda requisição:", paymentResponse.data);
        console.log("qrcode:", paymentResponse.data.data.pix.qrcode);

        const qrcodeContainer = $("#qrcodepix-modal");

        if (qrcodeContainer.length > 0) {
          const qrcode = new QRCode(
            qrcodeContainer[0],
            paymentResponse.data.data.pix.qrcode
          );

          $("#qrCodeModal").modal("show");
          $(".loading-overlay").css("display", "none");
        } else {
          $(".loading-overlay").css("display", "none");
          console.error('Elemento com ID "qrcodepix-modal" não encontrado.');
        }

        $(".loading-overlay").css("display", "none");
        Swal.fire({
          title: "Qrcode Gerado com Sucesso!",
          text: "Aguardando o pagamento para enviar a doação!",
          icon: "success",
        });

        var pusher = new Pusher("2c9eddc0f14322ed0e33", {
          cluster: "sa1",
        });

        var channel = pusher.subscribe("channel-callback");

        channel.bind("event-callback", function (data) {
          const eventData = JSON.parse(data.dados);
          if (eventData.data && eventData.data[0].payment_status === "paid") {
            const serializedData = $("#donationForm").serialize();
            const donationRoute = $("#donationRoute").val();

            axios
              .post(donationRoute, serializedData)
              .then(function (response) {
                $("#qrCodeModal").modal("hide");
                Swal.fire({
                  title: "Pagamento Recebido com Sucesso!",
                  text: "Obrigado pela sua doação!",
                  icon: "success",
                });
              })
              .catch(function (error) {
                $(".loading-overlay").css("display", "none");
                console.error("Erro na segunda requisição:", error);
                Swal.fire({
                  title: "Erro ao enviar doação!",
                  text: "Houve um problema ao enviar a doação. Por favor, tente novamente.",
                  icon: "error",
                });
              });
          }
        });
      });
  });
});
