import React from 'react';
import { useNavigate } from 'react-router-dom';
import PageTitle from '../../components/PageTitle';
import 'bootstrap/dist/css/bootstrap.min.css';

const PrivacyPolicy = () => {
    const navigate = useNavigate();
    return (
        <div className="container py-4">
            <PageTitle title="Política de Privacidade" />
            <div className="text-center mb-4">
                <h1 className="mb-0">Política de Privacidade</h1>
                <p>Estas Políticas foram atualizadas em 03/06/2024.</p>
            </div>
            <div className="text-left">
                <p><strong>CONTROLADORA DOS DADOS:</strong> Smartlives LTDA (“Smartlives”), inscrita no CNPJ sob o Rua Miguel Matte, 687 - Ed. Evolution Corporate Sala 1201 - Pioneiros, Balneário Camboriú - SC, 88331-030, Brasil.</p>

                <p>Olá, bem-vindo(a)!</p>
                <p>Nós da Smartlives valorizamos a privacidade e queremos contribuir para a proteção de dados pessoais. Por essa razão, a seguir apresentamos nossa Política de Privacidade, para que você saiba como fazemos uso de seus dados pessoais.</p>

                <h2 className="text-dark font-weight-bold">O que faz a Smartlives?</h2>
                <p>Atuamos principalmente na seguinte frente de negócio:</p>
                <ul className="list-unstyled pl-3">
                    <li>Intermediação de Pagamentos</li>
                    <li>Intermediação de pagamentos entre produtores de conteúdo e seu público</li>
                </ul>

                <h2 className="text-dark font-weight-bold">Como funciona o tratamento de dados por parte da Smartlives?</h2>
                <p>Como toda a empresa, para realizar nossas atividades, precisamos coletar e tratar algumas informações que são consideradas pela legislação como dados pessoais. Para deixá-lo informado acerca do modo como fazemos o tratamento desses dados, preparamos o quadro resumo a seguir, com as principais perguntas que você pode ter.</p>
                <p>Caso queira obter maiores informações sobre alguns dos tópicos, clique em Leia Mais na seção correspondente abaixo.</p>

                <h2 className="text-dark font-weight-bold">Quais Dados Pessoais Coletamos?</h2>
                <p>Em síntese, coletamos os seguintes dados pessoais, mas não restritos a:</p>
                <ul className="list-unstyled pl-3">
                    <li>Nome;</li>
                    <li>CPF;</li>
                    <li>Data de nascimento;</li>
                    <li>E-mail;</li>
                    <li>Número de telefone/celular;</li>
                    <li>Informações de pagamento;</li>
                </ul>
                <p>Para além dessas situações, poderemos utilizar seus dados pessoais de forma anonimizada (ou seja, de maneira que não leve à identificação de ninguém), com a finalidade de produzir relatórios analíticos de inteligência de negócio, a fim de melhorar nossos serviços.</p>

                <h2 className="text-dark font-weight-bold">Para que utilizamos os Dados Pessoais?</h2>
                <p>Em síntese, utilizamos os dados pessoais coletados para finalidades ligadas à prestação de nossos serviços e às empresas que nos contratam. Nesse contexto, os dados pessoais nos são úteis para:</p>
                <ul className="list-unstyled pl-3">
                    <li>Manutenção e administração de registros;</li>
                    <li>Garantir o acesso ao site;</li>
                    <li>Validar a identidade dos usuários;</li>
                    <li>Contatar os usuários;</li>
                </ul>

                <h2 className="text-dark font-weight-bold">Política de Cookie</h2>
                <h3 className="text-dark font-weight-bold">O que são cookies?</h3>
                <p>Os cookies são arquivos digitais com pequenos fragmentos de dados (e geralmente com um identificador único) que são salvos e armazenados no dispositivo do usuário de uma plataforma digital. Eles podem ser classificados como cookies temporários (sendo automaticamente apagados quando o navegador ou aplicativo é encerrado) ou cookies persistentes (que permanecem armazenados no dispositivo até uma data de expiração definida), bem como cookies originais (definidos pelo responsável que opera a plataforma) ou cookies terceiros (definidos por aplicações sob responsabilidade de terceiros).</p>

                <h3 className="text-dark font-weight-bold">Por que utilizamos Cookies?</h3>
                <p>Atualmente, a utilização de cookies é comum em qualquer plataforma digital. Seu uso não prejudica de forma alguma os dispositivos (computadores, tablets, celulares, etc.) dos usuários em que são armazenados. Eles aprimoram a experiência do usuário, tanto em termos de performance, como em termos de usabilidade, uma vez que os conteúdos disponibilizados serão direcionados às necessidades e expectativas do usuário.</p>

                <p>Os cookies permitem que uma plataforma digital memorize informações sobre a visita do usuário, o seu idioma preferido, a sua localização, a recorrência das suas sessões e outras variáveis que nós consideramos relevantes para tornar a sua experiência muito mais eficiente.</p>

                <p>Os cookies também poderão ser utilizados para compilar estatísticas anônimas e agregadas que permitem entender como os usuários utilizam a nossa plataforma, bem como para aprimorar suas estruturas e conteúdo. É importante dizer que não podemos identificá-lo pessoalmente por meio desses dados.</p>

                <h3 className="text-dark font-weight-bold">Quais tipos de cookies são utilizados?</h3>
                <h4 className="text-dark font-weight-bold">Cookies essenciais</h4>
                <p>Esses cookies são essenciais para que as nossas plataformas digitais funcionem corretamente. Eles permitem que o usuário navegue em nossos sites e use todas suas funcionalidades. Os exemplos incluem lembrar ações anteriores (por exemplo, textos inseridos) quando você volta a navegar em uma página em uma mesma sessão.</p>

                <h4 className="text-dark font-weight-bold">Cookies de Pesquisa, Análise e Desempenho</h4>
                <p>A finalidade deste tipo de cookie é ajudar a entender o desempenho das nossas plataformas digitais, medir sua audiência, verificar os hábitos de navegação dos usuários, bem como a forma pela qual chegou à página (por exemplo, através de links de outros sites, buscadores ou diretamente pelo endereço).</p>

                <h4 className="text-dark font-weight-bold">Cookies de autenticação</h4>
                <p>Servem para reconhecer um determinado usuário, possibilitando o acesso e utilização da Plataforma com conteúdo e/ou serviços restritos e proporcionando experiências de navegação mais personalizadas.</p>

                <h2 className="text-dark font-weight-bold">Como protegemos os Dados Pessoais?</h2>
                <p>Na Smartlives LTDA implementamos todas as medidas de segurança que estão ao nosso alcance para proteger os seus dados pessoais de acessos não autorizados e de situações acidentais ou ilícitas de destruição, perda, alteração, comunicação ou difusão. Como por exemplo:</p>
                <ul className="list-unstyled pl-3">
                    <li>Temos uma política interna de proteção de dados, que se aplica a todos aqueles que tratam dados pessoais em nosso nome.</li>
                    <li>Contamos com um robusto plano de resposta a incidentes em caso de ocorrência de alguma situação indesejada relacionada aos dados que tratamos.</li>
                    <li>Possuímos certificação SSL (Security Socket Layer) que garante a proteção por criptografia dos dados e chave de segurança utilizando o protocolo SSL de 128 bits.</li>
                    <li>Nos preocupamos em treinar nossos colaboradores sobre a importância do tema proteção de dados, a fim de mantê-los atualizados quanto às melhores práticas de mercado.</li>
                </ul>

                <h2 className="text-dark font-weight-bold">Por quanto tempo guardamos os Dados Pessoais?</h2>
                <p>A retenção de dados pessoais pela Smartlives LTDA respeita as seguintes diretrizes:</p>
                <ul className="list-unstyled pl-3">
                    <li>Apenas são mantidos dados pessoais estritamente necessários para o cumprimento das finalidades do tratamento. Assim, nos livramos de dados pessoais desnecessários ou excessivos.</li>
                    <li>Sem prejuízo, preservamos as informações necessárias para o cumprimento de obrigações legais e regulatórias ou o exercício de nossos direitos em demandas administrativas, judiciais ou arbitrais.</li>
                </ul>

                <h2 className="text-dark font-weight-bold">Quais são os direitos relacionados aos Dados Pessoais?</h2>
                <p>Nos orgulhamos de ser uma empresa que leva a sério os direitos dos titulares de dados pessoais. Por isso, garantimos que os direitos sobre seus dados pessoais previstos na lei (art. 18, Lei Federal n. 13.709/2018) possam ser plenamente exercidos, respeitados os limites aplicáveis.</p>
                <ul className="list-unstyled pl-3">
                    <li>Acesso aos dados: qualquer um pode requerer o acesso aos seus dados pessoais armazenados por nós, bem como informações sobre possível o compartilhamento com terceiros.</li>
                    <li>Correção: caso os dados pessoais estejam incorretos, poderá ser feita uma solicitação de correção ou atualização.</li>
                    <li>Exclusão: dados fornecidos mediante consentimento podem ser alvo de exclusão. Contudo, é possível que, mesmo após o requerimento de exclusão, alguns dados pessoais permaneçam armazenados, devido a obrigações legais ou para a proteção de interesses nossos ou de nossos clientes.</li>
                    <li>Oposição: você pode se opor ao tratamento de seus dados pessoais por parte da Smartlives LTDA.</li>
                    <li>Portabilidade: para que você possa exercer a portabilidade de seus dados pessoais, podemos providenciar a você uma cópia de seus dados pessoais em formato de leitura comum.</li>
                </ul>
            </div>
            <button className="btn btn-primary mt-4" onClick={() => navigate(-1)}>Retornar</button>
        </div>
    );
};

export default PrivacyPolicy;
