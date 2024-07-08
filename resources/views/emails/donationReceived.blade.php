<!DOCTYPE html>
<html lang="pt">

<head>
    <meta charset="UTF-8">
    <title>Doação Recebida</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            margin: 0;
            padding: 0;
            background-color: #f4f4f4;
            color: #333;
        }

        .email-container {
            background-color: #ffffff;
            width: 100%;
            max-width: 600px;
            margin: 40px auto;
            padding: 20px;
            box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
        }

        .header {
            background-color: #48BB78;
            color: #ffffff;
            padding: 10px 20px;
            text-align: center;
        }

        .content {
            padding: 20px;
            line-height: 1.6;
        }

        .footer {
            text-align: center;
            padding: 10px 20px;
            font-size: 12px;
            background-color: #eee;
        }
    </style>
</head>

<body>
    <div class="email-container">
        <div class="header">
            <h1>Doação Recebida!</h1>
        </div>
        <div class="content">
            <p>Olá, <strong>{{ $data['name'] }}</strong>,</p>
            <p>Muito obrigado por sua generosidade!</p>
            <p><strong>Valor da Doação: R$ {{ number_format($data['amount'], 2, ',', '.') }}</strong> </p>
            <p><strong>Mensagem do doador: {{ $data['message'] }}</strong> </p>
        </div>
        <div class="footer">
            Agradecemos seu apoio!
        </div>
    </div>
</body>

</html>