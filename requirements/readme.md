# Requisitos

## RF

### Eu como, USUÁRIO, posso criar uma solicitação de algum serviço, PARA registrar alguma demanda:

- [x] Uma solicitação é uma demanda de algum cliente que está precisando realizar algum serviço, que nesse contexto é movimentar algum veículo através de um guincho ou de um caminhão cegonha, como explicado no exemplo acima.
- [x] Um guincho pode carregar no máximo dois veículos simultâneos, agora uma cegonha consegue levar até 11 veículos simultâneos.
- [x] Todos os veículos serão coletados no mesmo local, porém poderão ser entregues em um único endereço ou em diversos endereços diferentes;
- [x] Ao salvar o(s) endereço(s) de entrega, deve ser salvo de uma forma ordenada de acordo com quais entregas serão feitas primeiro. Essa ordenação deve ser feita de forma otimizada, pois irá aparecer para o prestador seguir o roteiro na ordem salva, ele deve percorrer a menor distância possível, redicionando o prestador para o endereço mais próximo da entrega ou coleta anterior.

Uma solicitação deve ter pelo menos os seguintes campos:

- [x] Tipo de Serviço: Guincho, Cegonha \*No futuro poderá surgir mais serviços';
- [x] Data e hora da criação da solicitação;
- [x] Distância total em km de todo o percurso (da coleta até a última entrega);
- [x] Tempo total em minutos de todo o percurso (da coleta até a última entrega);
- [x] Distância em km de cada entrega, ou seja, do ponto anterior de entrega/coleta até a próxima entrega;
- [x] Tempo em minutos de cada entrega, ou seja, do ponto anterior de entrega/coleta até a próxima entrega;
- [x] Valor total do Serviço:O valor da solicitação deve ser criado de forma automática ao criar a solicitação, considerando a Km da corrida e o tipo de serviço. Para solicitações de Guincho será cobrado um valor fixo de R\$120,00 até 20km e R\$1,37 a mais do valor fixo para cada km excedido; Para solicitações de Cegonha deverá ser cobrado um valor fixo de R\$370,00 até 20km e R\$5,33 a mais do valor fixo para cada km excedido; A km é considerendo todo percurso percorrido da coleta do(s) veículo(s) até a entrega final do último veículo;
- [x] Endereço de coleta do(s) veículo(s) (Obs: deve ser salvo a latitude e longitude de cada endereço)
- [x] Endereço(s) de entrega do(s) veículo(s); (Obs: deve ser salvo a latitude e longitude de cada endereço)
- [x] Empresa: Empresa que solicitou o serviço;
- [x] Veículos que serão coletados (Obs: Veículo deve ter placa, modelo, marca e ano);
- [x] Veículos que serão entregues em um determinado endereço; (Obs: Veículo deve ter placa, modelo, marca e ano);

### Eu como, USUÁRIO, posso buscar uma solicitação, PARA visualizar os detalhes da mesma

- [ ] Deve ser criado um endpoint para buscar uma solicitação com todos os seus detalhes, inclusive o ponto de coleta e os pontos de entrega de cada veículo seguindo a ordeção salva para o prestador seguir a melhor rota otimizada (Obs: A rota ordenada deve ser pré-ordenado, ou seja, deve ser ordenada ao criar a solicitação);
- [ ] Essa solicitação deve ser buscada através do seu código único;

### Eu como, USUÁRIO, posso buscar a quantidade de solicitações abertas por empresa e o valor total pago dos serviços, PARA que me facilite ter uma visão geral da minha empresa;

- [ ] Deverá passar o código de uma empresa e um intervalo de datas para buscar a quantidade total de solicitações abertas e o soma do valor das solicitações no intervalo da data informada;
- [ ] Para esse endpoint é obrigatório o uso de um SQL para analisarmos seu conhecimento com SQL;
