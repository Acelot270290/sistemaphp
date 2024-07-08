function toggleStreamelementsInputs() {
    var inputsContainer = document.getElementById("streamelementsInputs");
    inputsContainer.style.display = inputsContainer.style.display === "none" ? "block" : "none";
}

function handleStreamelementsIntegration() {
    var accountId = document.getElementById("streamelementsAccountId").value;
    var jwt = document.getElementById("streamelementsJWT").value;

    if (!userSlug || !accountId || !jwt) {
        Swal.fire({
            title: "Erro!",
            text: "Por favor, preencha todos os campos.",
            icon: "error"
        });
        return;
    }

    $('.loading-overlay').css('display', 'block');

    axios.post('api/integrations/streamelements', {
            user_slug: userSlug,
            account_id: accountId,
            jwt: jwt
        })
        .then(function(response) {
            $('.loading-overlay').css('display', 'none');
            Swal.fire({
                title: "Sucesso!",
                text: "A integração com Streamelements foi realizada com sucesso.",
                icon: "success"
            });
        })
        .catch(function(error) {
            $('.loading-overlay').css('display', 'none');
            Swal.fire({
                title: "Erro!",
                text: "Houve um problema ao realizar a integração.",
                icon: "error"
            });
        });
}

function handleIntegrationClick() {
    $('#loading').show();
    $.ajax({
        type: 'GET',
        url: 'integrations/integration-check',
        success: function(data) {
            $('#loading').hide();

            if (data.status === 'existing_account') {
                // Exibir SweetAlert para conta já integrada
                Swal.fire({
                    title: "Usuário já Integrado!",
                    text: "Você já tem esse usuário vinculado à plataforma.",
                    icon: "info"
                });
            } else if (data.status === 'new_account') {
                // Exibir SweetAlert para nova conta
                Swal.fire({
                    title: "Integração bem-sucedida!",
                    text: "A conta do Streamlabs foi vinculada com sucesso.",
                    icon: "success"
                });
            } else {
                initiateIntegration();
            }
        },
        error: function(error) {
            $('#loading').hide();
            initiateIntegration();
        }
    });
}

function initiateIntegration() {
    $('.loading-overlay').css('display', 'block');
    $.ajax({
        type: 'GET',
        url: 'api/integrations/initiate',
        success: function(response) {
            if (response.status && response.status.integration_status === 'existing_account') {
                
                Swal.fire({
                    title: "Usuário já Integrado!",
                    text: response.status.original.message,
                    icon: "info"
                }).then(() => {
                   
                    window.location.href = response.redirect_url;
                });
            } else {
                window.location.href = response.authorization_url;
            }
        },
        
        error: function(error) {
            // Trate erros conforme necessário
        }
    });
}




function removeIntegration(integrationId, service) {
    $('.loading-overlay').css('display', 'block');
    axios.post('api/integrations/delete/' + integrationId)
        .then(function(response) {
            if (response.data && response.data.success) {
                updateButton(service, true);
                $('.loading-overlay').css('display', 'none');
                Swal.fire({
                    title: "Removido!",
                    text: "A integração com " + service + " foi removida.",
                    icon: "success"
                });
                setTimeout(function() {
                    location.reload();
                }, 3000);
            } else {
                Swal.fire({
                    title: "Erro!",
                    text: "Falha ao remover a integração com " + service + ".",
                    icon: "error"
                });
            }
        })
        .catch(function(error) {
            Swal.fire({
                title: "Erro!",
                text: "Falha ao remover a integração com " + service + ".",
                icon: "error"
            });
        });
}

function confirmRemoval(integrationId, service) {
    Swal.fire({
        title: "Tem certeza?",
        text: "Você deseja remover a integração com " + service + "?",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Sim, remover!"
    }).then((result) => {
        if (result.isConfirmed) {
            removeIntegration(integrationId, service);
        }
    });
}


function updateButton(service, success) {
    var integrationContainerId = service === 'streamlabs' ? 'streamlabsIntegrationContainer' :
        'streamelementsIntegrationContainer';
    var integrationContainer = document.getElementById(integrationContainerId);

    if (integrationContainer) {
        if (success) {
            var newIntegrationBtn = document.createElement("button");
            newIntegrationBtn.className = "btn btn-primary";
            newIntegrationBtn.innerHTML = "Quero fazer integração com " + service;
            newIntegrationBtn.onclick = function() {
                handleIntegrationClick(service);
            };

            integrationContainer.innerHTML = "";
            integrationContainer.appendChild(newIntegrationBtn);
        }
    } else {
        console.error("Elemento '" + integrationContainerId + "' não encontrado!");
    }
}