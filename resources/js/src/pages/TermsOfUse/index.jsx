import React from 'react';
import { useNavigate } from 'react-router-dom';
import PageTitle from '../../components/PageTitle';
import 'bootstrap/dist/css/bootstrap.min.css';

const TermsOfUse = () => {
    const navigate = useNavigate();
    return (
        <div className="container py-4">
            <PageTitle title="Termos de Uso" />
            <div className="text-center mb-4">
                <h1 className="mb-0">Termos de Uso</h1>
                <p>Estes Termos de Uso foram atualizados em 03/06/2024.</p>
            </div>
            <div className="text-left">
                <p><strong>CONTROLADORA DOS DADOS:</strong> Smartlives LTDA (“Smartlives”), inscrita no CNPJ sob o n.º inscrita no CNPJ sob o Rua Miguel Matte, 687 - Ed. Evolution Corporate Sala 1201 - Pioneiros, Balneário Camboriú - SC, 88331-030, Brasil.</p>

                <p>Olá, bem-vindo(a)!</p>
                <p>Nós da Smartlives valorizamos a privacidade e queremos contribuir para a proteção de dados pessoais. Por essa razão, a seguir apresentamos nossa Política de Privacidade, para que você saiba como fazemos uso de seus dados pessoais.</p>

                <h2 className="text-dark font-weight-bold">DEFINIÇÃO</h2>
                <p>SMARTLIVES é uma ferramenta de monetização para criadores de conteúdo. As ofertas da SMARTLIVES abrangem a utilização da plataforma intermediação de pagamentos entre produtores de conteúdo e seu público, a fim de monetizar e otimizar sua transmissão ao vivo.</p>

                <p>O serviço aqui fornecido permite aos visualizadores enviar e receber dinheiro por meio de processadores de pagamento terceirizados.</p>

                <h2 className="text-dark font-weight-bold">VEDAÇÕES</h2>
                <p>Os serviços fornecidos pela SMARTLIVES não estão disponíveis para menores de 18 anos. Se você tiver menos de 18 anos só poderá usar os serviços sob a supervisão de um responsável legal que concorde com estes Termos de Uso.</p>
                <p>Os serviços aqui fornecidos não poderão ser utilizados para qualquer propósito ilegal ou não autorizado, ou que viole quaisquer leis em sua jurisdição (incluindo, mas não se limitando às leis de direitos autorais). Você não deve transmitir worms ou vírus ou qualquer código de natureza destrutiva. A violação de qualquer um dos Termos resultará na rescisão imediata de seus serviços.</p>
                <p>AO UTILIZAR NOSSOS SERVIÇOS VOCÊ DECLARA QUE TEM NO MÍNIMO 18 ANOS DE IDADE, OU ESTAR SOB SUPERVISÃO DE UM RESPONSÁVEL, CONCORDANDO EXPRESSAMENTE COM OS TERMOS E CONDIÇÕES DE USO AQUI ESTIPULADOS.</p>

                <h2 className="text-dark font-weight-bold">REGISTRO DE USUÁRIO</h2>
                <p>Para a utilização da plataforma, o Usuário – pessoa física ou jurídica que esteja em pleno e total gozo da capacidade civil, bem como esteja apto à prática de todo e qualquer ato necessário à validação das solicitações de serviços requeridas, nos termos da legislação aplicável – deverá realizar seu cadastro na plataforma.</p>
                <p>Ao se cadastrar, o Usuário se compromete a fornecer informações verídicas, completas e atualizadas, sob pena das consequências jurídicas e legais da apresentação de informações falsas.</p>
                <p>A SMARTLIVES se reserva no direito de solicitar quaisquer dados adicionais que considere necessários para validar a legitimidade das informações fornecidas, incluindo mas não limitado a: informações pessoais, fotos de documentos de identificação e links de redes sociais.</p>
                <p>O login e a senha criados pelo Usuário são pessoais e intransferíveis, sendo o Usuário seu único e exclusivo responsável por mantê-las em segurança e sigilo, evitando, pois, o uso não autorizado de seu Cadastro por terceiros.</p>
                <p>Para permitir retiradas e transferências de sua conta, você deve enviar informações pessoais e bancárias válidas, que serão enviadas para validação ao nosso processador de pagamentos.</p>
                <p>Em consideração ao uso do Serviço, você concorda em manter e atualizar os Dados de Registro verdadeiros, precisos, atuais e completos, ficando responsável por eventuais incorreções.</p>
                <p>Se você fornecer qualquer informação que seja falsa, imprecisa, desatualizada ou incompleta, ou se nosso processador de pagamento tiver motivos razoáveis ​​para suspeitar que tal informação seja falsa, imprecisa, desatualizada ou incompleta, nosso processador de pagamento pode suspender ou encerrar sua conta e recusar todo e qualquer uso atual ou futuro do Serviço ou de qualquer parte dele.</p>
                <p>O não envio das informações necessárias pode limitar sua capacidade de sacar e / ou transferir o saldo pendente.</p>
                <p>Para registrar sua conta e começar a receber INCENTIVOS, você deve fornecer todos os dados solicitados no campo CADASTRO, sendo certo que o não envio das informações corretas pode limitar sua capacidade de receber INCENTIVOS.</p>

                <h2 className="text-dark font-weight-bold">INTEGRIDADE DAS INFORMAÇÕES</h2>
                <p>Não somos responsáveis ​​se as informações disponibilizadas neste site através das transmissões ao vivo não forem precisas ou completas. O material neste site é fornecido apenas para informação geral e não deve ser utilizado como base única para a tomada de decisões sem antes serem consultadas fontes mais precisas e completas. Qualquer confiança no material deste site é por sua própria conta e risco.</p>

                <h2 className="text-dark font-weight-bold">DO PREÇO E FORMA DE PAGAMENTO</h2>
                <p>É reservado à SMARTLIVES o direito de, a qualquer momento, modificar ou descontinuar o Serviço (ou qualquer parte ou conteúdo dele) sem aviso prévio.</p>
                <p>A SMARTLIVES não é responsável ​​perante você ou terceiros por qualquer modificação, alteração de preço, suspensão ou descontinuação do Serviço.</p>
                <p>Os preços e / ou taxas do nosso serviço estão sujeitos a alterações sem aviso prévio.</p>
                <p>Para receber INCENTIVOS através da plataforma SMARTLIVES, você concorda que a mesma retenha 5% sobre os valores pagos a título de taxa de processamento, sendo certo que o saque do valor pago nas transmissões deverá ser levantado pelo USUÁRIO diretamente no Banco por ele previamente estabelecido, não tendo a SMARTLIVES qualquer responsabilidade sobre eventuais problemas com as transações realizadas entre os bancos.</p>
                <p>Os pagamentos aceitos na plataforma da SMARTLIVES são mediante PIX, podendo a SMARTLIVES alterar a forma de pagamento se assim entender e sem prévio aviso.</p>

                <h2 className="text-dark font-weight-bold">ENVIO E RECEBIMENTO DE INCENTIVOS</h2>
                <p>O envio de INCENTIVOS (“GORJETAS”) por meio desta plataforma é realizado através de transferências bancárias PIX ou Cartão de Crédito.</p>
                <p>A forma de pagamento poderá ser alterada a qualquer tempo pela SMARTLIVES.</p>
                <p>Do valor de cada transação a SMARTLIVES reserva o direito de reter 5% a título de taxa de processamento, além da cobrança de taxas associadas à transação bancária.</p>
                <p>Para pagamentos recebidos por Cartão de Crédito, será retido o valor de R$ 0,50 por transação para cobrir as taxas de processamento da transação.</p>
                <p>Ao enviar INCENTIVOS ao destinatário, você concorda que a transação realizada não é reembolsável, não podendo ser estornada. Você reconhece que não está recebendo produtos / serviços em troca do envio de INCENTIVOS.</p>
                <p>O USUÁRIO declara ter ciência de que apenas os 3 (três) primeiros saques de cada mês serão isentos de tarifa, sendo certo que havendo mais de 3 (três) saques no mês, haverá a cobrança de R$ 1,00 (um real) por saque.</p>
                <p>As taxas estão sujeitas a alterações sem notificação prévia; é sua responsabilidade como usuário/criador manter-se atualizado sobre as taxas e suas alterações.</p>
                <p>Você concorda que não nos responsabilizamos por quaisquer INCENTIVOS não reclamados ou não reconhecidos, sendo de responsabilidade do USUÁRIO o levantamento/saque dos valores junto ao Banco, isentando a SMARTLIVES de erro/problemas com as transações.</p>
                <p>Ao receber INCENTIVO, você é responsável por quaisquer estornos ou disputas que possam ocorrer posteriormente relativas a essas transações.</p>
                <p>A SMARTLIVES não se responsabiliza ​​por quaisquer cobranças decorrentes desses estornos ou disputas.</p>
                <p>Ao aceitar este acordo, você nos autoriza a receber os valores de cada transação, procedendo com a retenção acima estipulada, além das taxas bancárias e manter o valor em uma "carteira" até que o USUÁRIO solicite o envio do saldo para sua conta bancária.</p>
                <p>O CRIADOR DE CONTEÚDO é responsável por fornecer os dados bancários para saque do saldo da carteira, devendo manter seu cadastro atualizado.</p>
                <p>Se as informações da conta bancária para saque estiverem incorretas, você estará sujeito a um atraso na retirada e / ou exclusão da conta.</p>
                <p>Estas informações de liquidação não constituem um depósito ou outra obrigação da SMARTLIVES ou do nosso processador de pagamentos para com você.</p>
                <p>Você concorda em pagar todas as taxas avaliadas por nós a você por fornecer nossos serviços de processadores de pagamento.</p>

                <h2 className="text-dark font-weight-bold">INTEGRAÇÕES COM TERCEIROS</h2>
                <p>Como parte da funcionalidade desta plataforma, você pode conectar uma “conta de terceiro”: (1) fornecendo suas informações de login através de nossa plataforma; ou (2) permitindo-nos acessar sua conta, conforme autorizado pelos termos e condições aplicáveis que regem o uso da plataforma terceira utilizada.</p>
                <p>Você declara e garante que tem o direito de divulgar as informações de login da “conta de terceiro” utilizada para nós e/ou nos conceder acesso à ela, sem violação de qualquer um dos termos e condições que regem o uso dessa plataforma e sem nos obrigar a pagar quaisquer taxas ou nos sujeitar a quaisquer limitações de uso impostas pelo provedor de serviços terceirizado.</p>
                <p>Ao nos conceder acesso a quaisquer contas de terceiros, você entende que (1) podemos acessar, disponibilizar e armazenar (se aplicável) qualquer conteúdo que você forneceu e armazenado em sua conta de terceiros para que esteja disponível através desta plataforma digital por meio de sua conta, incluindo, sem limitação, quaisquer listas de amigos e (2) podemos enviar e receber de sua conta de terceiros informações adicionais, na medida em que você for notificado quando vinculá-la à nossa plataforma.</p>
                <p>As contas de terceiros utilizadas estão sujeitas às configurações de privacidade que você definiu em tais serviços.</p>

                <h2 className="text-dark font-weight-bold">ESTORNOS</h2>
                <p>A SMARTLIVES se reserva o direito de não realizar qualquer estorno relativo às transações realizadas neste site, sendo de responsabilidade do USUÁRIO toda e qualquer transação aqui realizada.</p>

                <h2 className="text-dark font-weight-bold">CARTEIRA E SAQUES</h2>
                <p>Ao receber um INCENTIVO através da Smartlives, o valor descontado da taxa de processamento ficará disponível como saldo em uma carteira em nossa plataforma. O USUÁRIO deverá acessar a plataforma e informar o valor e conta bancária em seu nome para solicitar um saque.</p>
                <p>A SMARTLIVES não se responsabiliza pelo levantamento dos valores sacados, devendo os mesmos serem resgatados pelo USUÁRIO diretamente no Banco competente, responsabilizando-se por eventuais problemas ocorridos entre os bancos.</p>
                <p>As carteiras SMARTLIVES possuem limite diário e mensal de saque pré-determinadas. O usuário pode solicitar o aumento do limite de saque, podendo a SMARTLIVES conceder ou não o aumento de acordo com os critérios de risco do usuário.</p>
                <p>A conta bancária deve estar em nome do mesmo titular da conta Smartlives.</p>
                <p>Se as informações da conta bancária estiverem incorretas, você estará sujeito a um atraso na retirada e / ou exclusão da conta.</p>

                <h2 className="text-dark font-weight-bold">PROCESSO DE PAGAMENTO</h2>
                <p>O processamento dos pagamentos realizados através da SMARTLIVES é realizado por um Processador de Pagamento Terceirizado. Você concorda em obedecer aos termos deste processador de pagamentos terceirizado.</p>

                <h2 className="text-dark font-weight-bold">RESTRIÇÕES DE USO, CONTEÚDO E SERVIÇOS</h2>
                <p>Você não pode usar os serviços da SMARTLIVES para qualquer finalidade diferente da permitida por este Contrato. Você não pode, no todo ou em parte, copiar, fotocopiar, reproduzir, publicar, distribuir, traduzir, fazer engenharia reversa, derivar o código-fonte, modificar, desmontar, descompilar, criar trabalhos derivados com base em, ou remover quaisquer avisos de propriedade ou rótulos do Conteúdo e Serviços ou qualquer software acessado através deste site, sem o consentimento prévio, por escrito, da SMARTLIVES.</p>
                <p>Você tem o direito de utilizar os serviços da SMARTLIVES para seu próprio uso pessoal, mas não tem o direito de: (i) vender, conceder garantia ou transferir reproduções do Conteúdo e Serviços a terceiros de nenhuma forma, nem alugar, arrendar ou licenciar o Conteúdo e os Serviços para terceiros sem o consentimento prévio por escrito da SMARTLIVES.</p>

                <h2 className="text-dark font-weight-bold">DOS LIMITES DA RESPONSABILIDADE PELOS SERVIÇOS PRESTADOS PELA SMARTLIVES</h2>
                <p>A Smartlives possui contrato com acesso à internet e servidores de terceiros para o desenvolvimento dos serviços que se dedica, motivo pelo qual o usuário reconhece que os mesmos poderão, eventualmente, estar indisponíveis em decorrência de problemas técnicos, falhas na internet ou provedor, bem como por qualquer outra razão alheia a atos de Smartlives, incluindo, eventos de caso fortuito ou de força maior. Desse modo, a Smartlives não garante a disponibilidade, de forma contínua e ininterrupta, do funcionamento dos serviços prestados.</p>
                <p>Smartlives fica isenta de qualquer responsabilidade por danos e prejuízos de qualquer natureza que sejam decorrentes, de forma direta ou indireta, da interrupção ou suspensão, falha, cessação, falta de disponibilidade ou da descontinuação do funcionamento dos serviços prestados.</p>
                <p>O usuário será o único responsável pelas informações remetidas à/ao Smartlives e pelo cumprimento das obrigações dela decorrentes.</p>
                <p>Sem prejuízo dos demais direitos previstos em lei, Smartlives tem resguardado o direito de regresso em face do usuário, em razão de quaisquer danos materiais e/ou morais que eventualmente vierem a ser demandados contra Smartlives, em juízo ou fora dele, ou, ainda, que Smartlives venha a sofrer, em decorrência do descumprimento de obrigações do usuário, resultante dos serviços disponibilizados na plataforma digital.</p>
                <p>Nós nos reservamos os direitos de, exceto quando proibido pela lei aplicável: (a) alterar partes ou todos os Serviços e sua funcionalidade; (b) suspender ou descontinuar partes ou todos os Serviços; (c) encerrar, suspender, restringir ou desabilitar seu acesso ou uso de partes ou de todos os Serviços; (d) encerrar, suspender, restringir ou desabilitar o acesso à sua Conta; e (e) alterar nossos critérios de elegibilidade para usar os Serviços (e se tais mudanças de critérios de elegibilidade forem proibidas por lei onde você mora, podemos revogar seu direito de usar os Serviços nessa jurisdição).</p>

                <h2 className="text-dark font-weight-bold">DIREITO AUTORAL</h2>
                <p>Cumprimos a lei de direitos autorais e respondemos às reclamações sobre violação de direitos autorais de acordo com nossa Política de Direitos Autorais. Respeitamos a propriedade intelectual de terceiros e pedimos que você também o faça.</p>
                <p>Nós respondemos aos avisos de suposta violação de direitos autorais se estiverem em conformidade com a lei, e tais avisos devem ser relatados por meio do processo descrito em nossa Política de Direitos Autorais, que é incorporada por referência a este Contrato.</p>
                <p>Nós nos reservamos o direito de excluir ou desativar o conteúdo alegadamente infrator e encerrar contas de infratores reincidentes sem qualquer reembolso.</p>

                <h2 className="text-dark font-weight-bold">DA PROPRIEDADE INTELECTUAL E DOS DIREITOS RESERVADOS</h2>
                <p>Todo o Conteúdo da SMARTLIVES incluído no Site e Serviço, como texto, gráficos, logotipos, ícones de botão, imagens, mídia de áudio e / ou vídeo, downloads digitais, compilações, é propriedade da SMARTLIVES e é protegido pela lei de propriedade intelectual, estando registrados ou não.</p>
                <p>Assim, o Usuário concorda em se abster de pleitear ou reclamar, a qualquer tempo, tais direitos, como se fossem de sua titularidade.</p>
                <p>Smartlives é titular de direitos sobre todos os bancos de dados, conteúdos, imagens, softwares utilizados no funcionamento do site, amparados de acordo com a legislação aplicável à propriedade intelectual e proteção de dados.</p>
                <p>Os usuários estão cientes e concordam que Smartlives é a única e exclusiva titular de todos os direitos autorais e de propriedade intelectual atinentes à plataforma digital e sobre os produtos e serviços prestados, abrangendo, neste sentido, nome de domínio, programação, banco de dados, conteúdo, arquivo, funcionalidades, design e outras características que se fazem necessárias – respectivos direitos nos são amparados por lei.</p>
                <p>A utilização do nome comercial Smartlives, bem como nossos produtos e serviços associados ao mesmo, de forma não autorizada sofrerá as consequências legais, haja vista a exclusiva titularidade que recai sobre nós.</p>
                <p>Os presentes Termos de Uso não acarretam a cessão ou transferência ao usuário de quaisquer direitos relativos ao site, ou, então, qualquer parte de seu conteúdo. Entretanto, os usuários estão aptos a navegar no site apenas nos estritos termos permitidos nos presentes Termos de Uso.</p>
                <p>É expressamente vedado ao Usuário alterar qualquer funcionalidade do site, ou ainda, acessar qualquer parte com o fito de criar produto ou serviço concorrente, inclusive que contenha características, funções e ideias semelhantes das dispostas em nosso site. É proibida, também, a utilização de dispositivo, software ou outro instrumento que permita a interferência nas atividades e operações do site ou que tenha como objetivo o acesso indevido as informações ou banco de dados deste.</p>
                <p>Reforçamos que qualquer conduta que viole as leis de propriedade intelectual bem como as normas aplicáveis e as expressas vedações inseridas nestes Termos de Uso sujeitará o agente às consequências legais, incluindo indenização por eventual dano causado.</p>
                <p>Nosso site, eventualmente, poderá expor determinados links que direcionarão para outros sites da rede mundial de computadores, o que não implica que referidos sites sejam de nossa propriedade. Assim, Smartlives não se responsabiliza pelos conteúdos, práticas e serviços ofertados nesses outros sites, tendo em vista que não possuímos controle sobre o conteúdo dos mesmos.</p>

                <h2 className="text-dark font-weight-bold">VIOLAÇÃO DE DIREITOS DE PROPRIEDADE INTELECTUAL</h2>
                <p>A SMARTLIVES implementou certos procedimentos exigidos por lei em relação a alegações de direitos autorais e outras formas de violação de propriedade intelectual que ocorrem no Site.</p>
                <p>A política da SMARTLIVES é investigar quaisquer alegações de violação de propriedade intelectual trazidas ao seu conhecimento. Se você tem evidências, sabe ou tem uma crença de boa fé que seus direitos ou os direitos de terceiros foram violados e deseja que a SMARTLIVES exclua, edite ou desative o material em questão, você deve fornecer as seguintes informações: (a) uma assinatura física ou eletrônica de uma pessoa autorizada a agir em nome do proprietário do direito exclusivo que é supostamente violado; (b) identificação do trabalho objeto que alegou ter sido violado ou, se vários trabalhos forem cobertos por uma única notificação, uma lista representativa de tais trabalhos; (c) identificação do material que supostamente foi infringido ou sujeito a atividade infratora e que deve ser removido ou cujo acesso deve ser desabilitado, e informações razoavelmente suficientes para permitir que a SMARTLIVES localize o material; (d) informações razoavelmente suficientes para permitir que a SMARTLIVES entre em contato com você, como um endereço, número de telefone e, se disponível, um endereço de correio eletrônico no qual você possa ser contatado; (e) uma declaração de que você acredita de boa fé que o uso do material da maneira reclamada não foi autorizado pelo proprietário dos direitos autorais, seu agente ou pela lei; e (f) uma declaração de que as informações na notificação são precisas e, sob pena de perjúrio, que você está autorizado a agir em nome do proprietário de um direito exclusivo que foi supostamente infringido.</p>

                <h2 className="text-dark font-weight-bold">CONDUTA PROIBIDA</h2>
                <p>Você também está proibido de se envolver nas seguintes atividades, ou ajudar outros a se envolverem nas seguintes atividades, no uso do Site ou dos Serviços:</p>
                <ul className="list-unstyled">
                    <li>ameaçar, perseguir, fraudar outra pessoa, ou incitar, assediar ou defender o assédio de outra pessoa ou de outra forma interferir no uso do Site por outro usuário;</li>
                    <li>usar o Site de maneira que possa criar um conflito de interesses, como negociar análises com outros proprietários de negócios ou escrever ou solicitar análises de mentiras;</li>
                    <li>usar o Site para promover intolerância ou discriminação;</li>
                    <li>usar o Site para solicitar informações pessoais de menores ou para prejudicar ou ameaçar causar danos a menores;</li>
                    <li>usar o site para fins comerciais ou promocionais (como a venda de produtos ou serviços) sem o consentimento prévio por escrito da SMARTLIVES.;</li>
                    <li>envolver-se em atividades criminosas ou ilícitas, incluindo, mas não se limitando a, fraude, assédio, difamação, perseguição, spam, spimming, envio de vírus ou outros arquivos prejudiciais, violação de direitos autorais ou roubo de segredos comerciais;</li>
                    <li>acessar conteúdo ou dados não destinados a você, ou fazer logon em um servidor ou conta que você não está autorizado a acessar;</li>
                    <li>tentar sondar, escanear ou testar a vulnerabilidade do Site ou de qualquer sistema ou rede associado, ou violar as medidas de segurança ou autenticação sem a devida autorização, incluindo contornar ou modificar, tentar contornar ou modificar, ou encorajar ou ajudar qualquer outra pessoa em contornar ou modificar qualquer tecnologia de segurança ou software que faça parte do Site ou Serviço;</li>
                    <li>interferir ou tentar interferir no serviço a qualquer usuário, host ou rede, incluindo, sem limitação, por meio de envio de um vírus para o site, sobrecarregando, "inundação", "spamming", "bombardeio de correio" ou "travamento";</li>
                    <li>usar o Site para enviar e-mails não solicitados, incluindo, sem limitação, promoções ou anúncios de produtos ou serviços;</li>
                    <li>forjar qualquer cabeçalho de pacote TCP / IP ou qualquer parte das informações do cabeçalho em qualquer e-mail ou postagem;</li>
                    <li>tentativa de modificar, fazer engenharia reversa, descompilar, desmontar ou de outra forma reduzir ou tentar reduzir a uma forma perceptível pelo homem qualquer código-fonte usado pela SMARTLIVES no fornecimento do Site;</li>
                    <li>usar o Site para spamming de palavras-chave ou de outra forma tentar manipular os resultados da pesquisa natural; registrar, processar ou extrair informações sobre outros usuários;</li>
                    <li>usar qualquer vírus, bots, worms ou qualquer outro código de computador, arquivos ou programas que interrompam, destruam ou limitem a funcionalidade de qualquer software ou hardware de computador ou de outra forma permita o uso não autorizado ou acesso a um computador ou rede de computadores, ou usar qualquer outro sistema automatizado para coletar endereços de e-mail ou outros dados do Site ou Serviço para fins de envio de material não solicitado ou não autorizado;</li>
                    <li>modificar, copiar, distribuir, baixar, extrair ou transmitir de qualquer forma ou por qualquer meio, no todo ou em parte, qualquer Conteúdo dos Serviços da SMARTLIVES que não seja o Conteúdo do Usuário que você legalmente postar, por meio ou em conexão com o uso de o site;</li>
                    <li>fornecer ou usar "rastreamento" ou funcionalidade de monitoramento em conexão com o Site ou Serviço, incluindo, sem limitação, para identificar as visualizações, ações ou outras atividades de outros Usuários no Site;</li>
                    <li>interferir, interromper ou criar uma carga indevida no site da SMARTLIVES ou nas redes ou serviços conectados;</li>
                    <li>personificar ou tentar se passar pela SMARTLIVES ou um funcionário, administrador ou moderador da SMARTLIVES, outro usuário ou pessoa ou entidade (incluindo, sem limitação, o uso de endereços de e-mail associados com ou de qualquer um dos anteriores);</li>
                    <li>usar ou distribuir qualquer informação obtida do site da SMARTLIVES para assediar, abusar ou prejudicar outra pessoa ou entidade, ou tentar fazer o mesmo;</li>
                    <li>usar cabeçalhos inválidos ou forjados para disfarçar a origem de qualquer Conteúdo transmitido para ou por meio dos sistemas de computador da SMARTLIVES ou, de outra forma, fazer declarações falsas sobre você ou a fonte de qualquer mensagem ou Conteúdo;</li>
                    <li>envolver-se, direta ou indiretamente, ou encorajar outros a se envolver em cliques gerados por qualquer maneira que possa ser razoavelmente interpretada como coerciva, incentivada, enganosa, maliciosa ou fraudulenta; ou</li>
                    <li>usar o Site de maneira inconsistente com todas e quaisquer leis e regulamentos aplicáveis.</li>
                </ul>

                <h2 className="text-dark font-weight-bold">POLÍTICA DE PRIVACIDADE</h2>
                <p>Nós reconhecemos, nos termos da Política de Privacidade e da legislação aplicável, a confidencialidade e segurança das informações prestadas pelos Usuários, empenhando-nos em resguardar o seu sigilo, salvo por força de lei ou ordem judicial.</p>
                <p>Desta forma, também contamos com uma robusta política de privacidade, que pode ser acessada pelo link: política de privacidade.</p>

                <h2 className="text-dark font-weight-bold">ERROS, IMPRECISÕES E OMISSÕES</h2>
                <p>Ocasionalmente, pode haver informações em nosso site ou no Serviço que contenham erros tipográficos, imprecisões ou omissões que podem estar relacionadas a descrições, preços, promoções, ofertas e disponibilidade. Nós nos reservamos o direito de corrigir quaisquer erros, imprecisões ou omissões e de alterar ou atualizar informações ou cancelar pedidos se qualquer informação no Serviço ou em qualquer site relacionado for imprecisa a qualquer momento sem aviso prévio (incluindo após você ter enviado seu pedido).</p>
                <p>Não assumimos nenhuma obrigação de atualizar, alterar ou esclarecer informações no Serviço ou em qualquer site relacionado, incluindo, sem limitação, informações de preços, exceto conforme exigido por lei.</p>
                <p>Nenhuma atualização ou data de atualização especificada aplicada no Serviço ou em qualquer site relacionado deve ser considerada para indicar que todas as informações no Serviço ou em qualquer site relacionado foram modificadas ou atualizadas.</p>

                <h2 className="text-dark font-weight-bold">USOS PROIBIDOS</h2>
                <p>Além de outras proibições estabelecidas nos Termos de Serviço, você está proibido de usar o site ou seu conteúdo:</p>
                <ul className="list-unstyled">
                    <li>para qualquer propósito ilegal;</li>
                    <li>solicitar a terceiros que pratiquem ou participem de quaisquer atos ilícitos;</li>
                    <li>violar quaisquer regulamentos, regras, leis ou decretos locais internacionais, federais, provinciais ou estaduais;</li>
                    <li>infringir ou violar nossos direitos de propriedade intelectual ou os direitos de propriedade intelectual de terceiros;</li>
                    <li>assediar, abusar, insultar, prejudicar, difamar, caluniar, depreciar, intimidar ou discriminar com base no gênero, orientação sexual, religião, etnia, raça, idade, nacionalidade ou deficiência;</li>
                    <li>para enviar informações falsas ou enganosas;</li>
                    <li>para fazer upload ou transmitir vírus ou qualquer outro tipo de código malicioso que será ou poderá ser usado de qualquer forma que afete a funcionalidade ou operação do Serviço ou de qualquer site relacionado, outros sites ou a Internet;</li>
                    <li>para coletar ou rastrear as informações pessoais de terceiros;</li>
                    <li>para enviar spam, phish, pharm, pretexto, spider, crawl ou scrape;</li>
                    <li>para qualquer propósito obsceno ou imoral; ou</li>
                    <li>para interferir ou contornar os recursos de segurança do Serviço ou qualquer site relacionado, outros sites ou a Internet.</li>
                    <li>para qualquer campanha da qual você participa como editor, nos reservamos o direito de revisar a campanha, seu conteúdo, seus materiais em conexão com a campanha e nos reservamos o direito de removê-lo de tal campanha a nosso exclusivo critério.</li>
                    <li>para viewbotting em conexão com uma campanha, se determinarmos ou assumirmos que sua conta participou do viewbotting, seja por terceiros ou por você mesmo, nos reservamos o direito de banir sua conta e remover seus ganhos a nosso exclusivo critério.</li>
                </ul>
                <p>Nós nos reservamos o direito de encerrar seu uso do Serviço, Campanha ou qualquer site relacionado por violar qualquer um dos usos proibidos.</p>

                <h2 className="text-dark font-weight-bold">ISENÇÃO DE GARANTIAS; LIMITAÇÃO DE RESPONSABILIDADE</h2>
                <p>Não garantimos, representamos ou garantimos que o uso de nosso serviço será ininterrupto, oportuno, seguro ou livre de erros.</p>
                <p>Não garantimos que os resultados que podem ser obtidos com o uso do serviço sejam precisos ou confiáveis.</p>
                <p>Você concorda que, de tempos em tempos, podemos remover o serviço por períodos indefinidos ou cancelar o serviço a qualquer momento, sem aviso prévio.</p>
                <p>Você concorda expressamente que o uso ou a incapacidade de usar o serviço é por sua conta e risco.</p>
                <p>O serviço e todos os produtos e serviços fornecidos a você por meio do serviço são (exceto conforme expressamente declarado por nós) fornecidos "como estão" e "conforme disponíveis" para seu uso, sem qualquer representação, garantias ou condições de qualquer tipo, expressas ou implícita, incluindo todas as garantias ou condições implícitas de comercialização, qualidade comercializável, adequação a uma finalidade específica, durabilidade, título e não violação.</p>

                <h2 className="text-dark font-weight-bold">INDENIZAÇÃO</h2>
                <p>Você concorda em indenizar, defender e isentar de responsabilidade a SMARTLIVES e nossos pais, subsidiárias, afiliadas, parceiros, diretores, diretores, agentes, contratados, licenciadores, prestadores de serviços, subcontratados, fornecedores, estagiários e funcionários, isentos de qualquer reclamação ou demanda , incluindo honorários advocatícios razoáveis, cobrados por terceiros devido ou decorrentes da violação destes Termos de Serviço ou dos documentos que eles incorporam por referência, ou violação de qualquer lei ou dos direitos de terceiros.</p>

                <h2 className="text-dark font-weight-bold">RESCISÃO</h2>
                <p>As obrigações e responsabilidades das partes incorridas antes da data de rescisão sobreviverão à rescisão deste contrato para todos os fins.</p>
                <p>Estes Termos de Serviço são válidos a menos e até que sejam rescindidos por você ou por nós. Você pode rescindir estes Termos de Serviço a qualquer momento, notificando-nos que não deseja mais usar nossos Serviços ou quando deixar de usar nosso site.</p>
                <p>Se, em nosso julgamento exclusivo, você descumprir qualquer disposição destes Termos de Uso, também podemos rescindir este contrato a qualquer momento sem aviso prévio e você permanecerá responsável por todos os valores devidos e incluindo a data de rescisão; e / ou, portanto, pode negar-lhe acesso aos nossos Serviços (ou qualquer parte deles).</p>
                <p>O fato de nós deixarmos de exercer ou fazer cumprir qualquer direito ou disposição destes Termos de Serviço não constituirá renúncia de tal direito ou disposição.</p>
                <p>Estes Termos de Serviço e quaisquer políticas ou regras operacionais postadas por nós neste site ou em relação ao Serviço constituem todo o acordo e entendimento entre você e nós e regem seu uso do Serviço, substituindo quaisquer acordos anteriores ou contemporâneos, comunicações e propostas , seja oral ou escrita, entre você e nós (incluindo, mas não se limitando a, quaisquer versões anteriores dos Termos de Serviço).</p>

                <h2 className="text-dark font-weight-bold">DA VIGÊNCIA</h2>
                <p>Os presentes Termos de Uso permanecerão vigentes desde o início do acesso, utilização ou cadastro do usuário em nosso site, a sua respectiva utilização, perdurando enquanto tivermos relação comercial com você.</p>

                <h2 className="text-dark font-weight-bold">CONSIDERAÇÕES FINAIS</h2>
                <p>O descumprimento total ou parcial de qualquer item destes Termos de Uso pode levar a suspensão ou bloqueio da sua conta.</p>
                <p>A nulidade total ou parcial de qualquer item destes Termos de Uso não afastará o cumprimento da obrigação contida nos demais itens aqui presentes. Qualquer omissão ou tolerância de Smartlives em relação às disposições desses Termos e Condições não importará em renúncia, novação ou modificação das obrigações do Usuário.</p>
                <p>Quaisquer ambiguidades na interpretação destes Termos de Serviço não devem ser interpretadas contra a parte que os redigiu.</p>
                <p>Os presentes Termos de Uso, bem como a utilização da plataforma digital e dos serviços de Smartlives serão regidos pelas leis em vigência na República Federativa do Brasil, sendo estipulado, desde já, o foro da cidade de São Paulo - SP como o competente para dirimir quaisquer controvérsias ou divergências decorrentes destes Termos de Uso, utilização do site e serviços.</p>
                <p>Para dirimir qualquer questão oriunda da interpretação deste contrato, fica eleito o Foro da Comarca de São Paulo - SP, por mais privilegiado que outro seja.</p>
            </div>
            <button className="btn btn-primary mt-4" onClick={() => navigate(-1)}>Retornar</button>
        </div>
    );
};

export default TermsOfUse;
