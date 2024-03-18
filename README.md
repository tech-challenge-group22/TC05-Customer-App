![Tech Challenge Delivery System](https://github.com/tech-challenge-group22/TC05-Customer-App/blob/main/assets/core/delivery-system_fastfood.png)

# Tech-Challenge - Delivery System

## Introdução

No coração de um bairro em crescimento, uma lanchonete local está passando por uma significativa expansão devido ao seu sucesso.<br>
Porém, com esse crescimento vem o desafio de manter a eficiência e organização no atendimento aos clientes. Sem um sistema adequado de gerenciamento de pedidos, o serviço ao cliente pode se tornar caótico e confuso. Considerando um cliente que faz um pedido de um hambúrguer personalizado com ingredientes específicos, acompanhado de batatas fritas e uma bebida. O pedido pode ser anotado à mão e passado para a cozinha, mas não há garantia de que será preparado corretamente.

A ausência de um sistema de gerenciamento de pedidos pode levar a confusão entre a equipe e a cozinha, resultando em atrasos e na preparação incorreta dos pedidos. Os pedidos podem se perder, ser mal interpretados ou esquecidos, levando à insatisfação dos clientes e potencial perda de negócios.

Para enfrentar esses desafios, a lanchonete está investindo em um sistema de autoatendimento para fast-food. 
Este sistema é composto por uma série de dispositivos e interfaces que permitem aos clientes selecionar e fazer pedidos sem a necessidade de interagir com um atendente, garantindo um serviço eficiente e eficaz ao cliente, enquanto gerencia pedidos e estoques de forma adequada, e para resolver o problema desde o design, até implementação do sistema, a lanchonete chamou os especialistas em Arquitetura de Software do <b>Grupo 22</b>.

## Funcionalidades

- **Gerenciar Clientes**: Os clientes podem se registrar com seu nome, e-mail e CPF no início de um pedido ou optar por permanecer não identificados.
- **Gerenciar Produtos**: Os produtos podem ser cadastrados com um nome, categoria, preço, descrição e imagens. As categorias de produtos incluem:
  - Lanches
  - Acompanhamentos
  - Bebidas
  - Sobremesas
- **Pagamento**: Integração com um gateway de pagamento.
- **Acompanhamento de Pedido**: Após a confirmação do pagamento, o pedido é enviado para preparo. Os clientes podem acompanhar o progresso do seu pedido através das etapas: Recebido, Em Preparação, Pronto e Concluído.

## Tecnologias

- Node.js
- TypeScript
- Express
- AWS RDS
- DynamoDB
- Docker  (AWS ECS)
- AWS S3
- AWS SQS

## Arquitetura da Solução

Link para visualização externa: <a href="https://drive.google.com/file/d/1i-Q8P7aScD1-dboFIOZlOZoH7tCIXEe7/view?usp=drive_link">Arquitetura</a> 

![Tech Challenge FASE 05](https://github.com/tech-challenge-group22/TC05-Customer-App/blob/main/assets/core/tech-challenge-FASE05-Arquitetura.png)

### Domain Driven Design

Link para visualização externa: <a href="https://miro.com/app/board/uXjVMKvnUGA=/?share_link_id=537199265716">DDD</a>
![DDD - Parte I](https://github.com/tech-challenge-group22/TC05-Customer-App/blob/main/assets/core/DDD-delivery_system.jpg)
![DDD - Parte II](https://github.com/tech-challenge-group22/TC05-Customer-App/blob/main/assets/core/DDD-delivery_system-services.jpg)

## Modelagem de Dados :floppy_disk:

Nosso projeto utiliza uma abordagem híbrida de modelagem de dados, otimizada para atender às necessidades específicas de cada domínio:


![image](https://github.com/tech-challenge-group22/TC05-Customer-App/blob/main/assets/core/modelagem_dados_relacional.png)

- **Domínio Cliente, Pagamento, Pedido e Produto:** Seguem um modelo relacional tradicional com o Amazon RDS (MySQL), aproveitando as vantagens de schemas consistentes e relações estabelecidas.

- **Domínio de Fila de Pedidos:** A fila de pedidos é gerenciada pelo Amazon DynamoDB, uma escolha estratégica que proporciona alta velocidade e flexibilidade, essenciais para o manejo eficiente dos status dos pedidos.

- **Domínio de Produtos:** Implementamos uma camada de cache usando o DynamoDB para otimizar o acesso a informações de produtos e categorias, crucial durante o cálculo do valor do pedido. Este sistema é atualizado por uma rota específica de refresh, garantindo que o cache reflita as informações mais recentes.

Este modelo híbrido garante que cada domínio seja gerenciado da forma mais eficaz, equilibrando performance e consistência de acordo com as necessidades operacionais e de negócios.

## SAGA Pattern - Coreografia :cartwheeling:

Optamos pelo padrão de Coreografia para nossa aplicação, a decisão se alinhou perfeitamente com o desenvolvimento natural do projeto ao longo do percurso e fases passadas. Ao chegarmos na Fase 05, notamos que, de forma quase intuitiva, já estávamos aplicando princípios da Coreografia em nosso trabalho. A escolha também se baseou em alguns dos benefícios chave que reconhecemos para o futuro do projeto:

### 1. Autonomia dos Serviços

Favorece a autonomia a cada serviço para que reaja a eventos de forma independente, reduzindo dependências diretas, facilitando a manutenção e escalabilidade.

### 2. Desacoplamento

Baixo acoplamento entre os serviços, facilitando futuras manutenções e escalabilidade.

### 3. Simplicidade e agilidade de desenvolvimento

Para a versão atual do nosso projeto, com menor complexidade, auxilia a simplificação do design e facilita o desenvolvimento ágil de novos serviços que apenas precisam reagir aos eventos existentes no sistema.

### 4. Flexibilidade Evolutiva

Oferece maior flexibilidade para a evolução do sistema, já que a adição de novas funcionalidades requer apenas a subscrição a eventos existentes ou a publicação de novos.

---

## Instruções para Deploy da solução :building_construction:

![Tech Challenge Delivery System](https://github.com/tech-challenge-group22/TC05-Customer-App/blob/main/assets/core/banner-version2.png)

### Iniciando a infraestrutura no ambiente do AWS lab :cloud:

Toda nossa infraestrutura está montada utilizando a AWS e Github.
Após iniciarmos o AWS Lab Academy, precisamos seguir algumas etapas para construir a infraestrutura necessária para a execução das aplicações.

1. Acessar o serviço do S3 na AWS.
    - Iremos adicionar um bucket para cada serviço.
2. Preencher o nome dos S3 buckets recém criados nas variáveis da organização no GitHub.
    - Preencher as variáveis iniciadas com `TF_VAR_TFSTATE` + nome do serviço
3. Após preencher as váriaveis de ambiente da organização, executar a action de deploy do repositório <a href="https://github.com/tech-challenge-group22/TC05-Shared-Infra">`TC05-Shared-Infra`</a>
4. Ao finalizar o deploy da action do repositório TC05-Shared-Infra, preencher as `urls das filas` nas `variáveis da organização`
5. Rodar as actions de deploy para <a href="https://github.com/tech-challenge-group22/TC05-Customer-Infra/actions">`Customer-Infra`</a> e <a href="https://github.com/tech-challenge-group22/TC05-Customer-App/actions">`Customer-app`</a>
6. Ao completar deploy do MS de Customer
    - Criar Api Gateway ligada a lambda function `validate-customer`
    - Editar variável de ambiente `DB_HOST` da lambda com a url do `RDS` de `Customer`
    - Verificar se demais variáveis correspondem ao mesmo do `MS Customer`

#### Observações de Deploy

A criação de todas as filas e da função lambda estão sendo realizadas pelo repositório <a href="https://github.com/tech-challenge-group22/TC05-Shared-Infra">TC05-Shared-Infra</a>
Todos os repositórios estão utilizando secrets e variáveis de nossa organização no Github, sendo compartilhadas entre todos os repositórios.

![banner](https://github.com/tech-challenge-group22/TC05-Customer-App/blob/main/assets/core/variaveis_organizacao.png)

Para executar o workflow para deploy da Infra AWS ou para realizar o build da imagem docker, só precisamos selecionar a action "Deploy Infrastructure" e depois executar o workflow.

![banner](https://github.com/tech-challenge-group22/TC05-Customer-App/blob/main/assets/core/workflow_example.png)

Após a execução ser finalizada, precisamos criar o API Gateway na função Lambda.

### Documentação de APIs :bookmark_tabs:

Após iniciar a aplicação para cada repositório, executar o express com o node.js e acessar o link exibido no terminal e adicionar `/api-docs` ao final da URL.
Isso iniciará o Swagger com a documentação do serviço.

![image](https://github.com/fellipySaldanha/Phase2-TC/assets/43252661/cc96d1ff-27fb-4aaa-81e2-53872a3cc51b)


## Relatórios de Segurança :lock:

### Relatórios OWASP Zap

Felizmente, em nossa análise inicial do relatório de OWASP Zap, não foi detectado nenhuma vulnerabilidade de nível alto. 
Seguem os relatórios detalhados:

- **Listar/Exibir Cardápio**: [Veja o relatório](https://drive.google.com/file/d/1mWfcgvuW_a_6O1BMkPwL6f59yzeX-H-H/view?usp=drive_link)
- **Realização de Pedido (Checkout) e Geração do Pagamento**: [Veja o relatório](https://drive.google.com/file/d/1cFa7kf88K5yWIAzoakiirdtedLTTMKPj/view?usp=drive_link) - Este relatório cobre ambas as funcionalidades. A geração do pagamento é tratada internamente através da comunicação assíncrona entre os serviços de Pedido e Pagamento, utilizando suas respectivas filas. Assim, a Geração do Pagamento é intrinsecamente parte do processo de criação do Pedido.
- **Confirmação do Pagamento (Webhook)**: [Veja o relatório](https://drive.google.com/file/d/1raaGH703ores607-r0jK3ae0qGvWSHdy/view?usp=drive_link)

### Relatório RIPD
Segue o link do <a href="https://drive.google.com/file/d/1VC8olXbryNgMLntq4r0wvYu4Hk-NNvrR/view?usp=sharing">Relatório de Impacto de Dados Pessoais</a> da nossa solução.

Estes relatórios demonstram nossa diligência em manter nossa infraestrutura segura e confiável para nossos usuários, seguindo as melhores práticas do desenvolvimento seguro.

## Demonstração :movie_camera:

- **Introdução**: [Veja o vídeo](https://www.loom.com/share/362cdbdbeea142d19a70001925066d2a?sid=e9a3a40b-8193-41a9-84d8-7578d08b92ab)
- **Infraestrutura AWS & Repositórios**: [Veja o vídeo](https://www.loom.com/share/92e4859b43a44577b7434e7ddfa7e408?sid=0c44f317-e1bf-41da-8b65-a0c1f141c1f7)
- **Infra AWS e Repositórios - parte II**: [Veja o vídeo](https://www.loom.com/share/e0b20901f415445391fcebdae99e6e98?sid=13e316c2-f760-4a77-a821-74167c5ddd5d)
- **Demonstração - Parte I**: [Veja o vídeo](https://www.loom.com/share/e801d167cd114db08d643af389ebd3e3?sid=11028dda-1c26-472a-800a-5c8f06de31b0)
- **Demonstração - Parte II**: [Veja o vídeo](https://www.loom.com/share/4688560bc5cb408aa252e37bc34af759?sid=d8ccc04c-47c2-4e99-8554-742cd0de72dd)
- **Demonstração - Parte III**: [Veja o vídeo](https://www.loom.com/share/9d6f2f23aa4b4e498bc4254db8ed7b62?sid=bd243950-1745-4892-8dc3-98cbbe0f295a)

---
## Referências :pushpin:

- **Documento Fase 3**: [Veja aqui](https://docs.google.com/document/d/1dF1EBIFeaUypjd8q5T7GGKYfnNoSGQr06fxbkmzGuwc/edit#heading=h.daycl68w2p0r)

- **Repositórios**: [Veja aqui](https://github.com/orgs/tech-challenge-group22/repositories)

### Shared Infrastructure
- [TC05-Shared-Infra](https://github.com/tech-challenge-group22/TC05-Shared-Infra)

### Domínio de Clientes
- [TC05-Customer-Infra](https://github.com/tech-challenge-group22/TC05-Customer-Infra)
- [TC05-Customer-App](https://github.com/tech-challenge-group22/TC05-Customer-App)

### Domínio de Pedido
- [TC05-Order-Infra](https://github.com/tech-challenge-group22/TC05-Order-Infra)
- [TC05-Order-App](https://github.com/tech-challenge-group22/TC05-Order-App)

### Domínio de Pagamento
- [TC05-Payment-Infra](https://github.com/tech-challenge-group22/TC05-Payment-Infra)
- [TC05-Payment-App](https://github.com/tech-challenge-group22/TC05-Payment-App)

### Domínio de Fila de pedidos
- [TC05-Queue-Infra](https://github.com/tech-challenge-group22/TC05-Queue-Infra)
- [TC05-Queue-App](https://github.com/tech-challenge-group22/TC05-Queue-App)

---
## Agradecimentos ♥️

À medida que concluímos este projeto da Pos-Tech na FIAP, gostaríamos de expressar nossa profunda gratidão aos professores que foram pilares do nosso aprendizado e desenvolvimento:
Professora Nathália, Professor Rubens e Professor Zenha. Sua orientação, conhecimento e apoio foram cruciais para o nosso sucesso.

Um agradecimento especial para os colegas de grupo - Fabiano, Fellipy, Gabriel, Eduardo e Felipe - cuja colaboração, dedicação e criatividade tornaram este projeto não apenas possível, mas uma jornada verdadeiramente enriquecedora e inesquecível. Juntos, enfrentamos desafios, superamos obstáculos e compartilhamos momentos significativos de crescimento e aprendizado.

Obrigado a todos por fazerem parte desta etapa importante da nossa jornada acadêmica e profissional.


![banner](https://github.com/tech-challenge-group22/TC05-Customer-App/blob/main/assets/core/food_banner.png)
