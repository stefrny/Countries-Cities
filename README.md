# Countries&Cities 🏙️
Projeto desenvolvido com o objetivo de consultar dados populacionais de cidades em diferentes países, permitindo buscar a população por um ano específico e visualizar a bandeira do país correspondente através da integração com uma API externa.



---

# Introdução 

A aplicação desse projeto permite que o usuário consiga determinadas informações apenas informando o nome da cidade, nome do país e ano desejado sendo eles a quantidade populacional daquela epóca e a bandeira do país pesquisado.

O projeto foi criado utilizando React Native com Expo, proporcionando uma interface mobile simples e intuitiva.

# Metodologia
Para o desenvolvimento do projeto, foi utilizada a metodologia de integração com APIs externas para consumo de dados em tempo real.

A API utilizada foi encontrada na plataforma https://www.freepublicapis.com/

Documentação de API utilizada:
https://documenter.getpostman.com/view/1134062/T1LJjU52?ref=freepublicapis.com

O fluxo da aplicação funciona da seguinte forma:

O usuário insere os dados nos campos de entrada. ->
O sistema valida se todos os campos foram preenchidos. ->
É realizada uma requisição para a API de população onde busca os dados populacionais da cidade informada. ->
É realizada uma segunda requisição para a API de bandeiras 
retornando a imagem da bandeira do país informado. ->
O sistema filtra esses dados ->
Busca a cidade exata ->
Busca o ano específico informado ->
Os resultados são exibidos na tela. 

Foi acrescentado a validação de erros (país, cidade ou ano não encontrado), validação de campos em branco, indicação de carregamento com `ActivityIndicator` e exibição condicional dos resultados.

# Estrutura principal
 
O projeto foi desenvolvido utilizando React Hooks, contendo os Hooks abaixo:

```JavaScript
useState() → gerenciamento de estados

useEffect() → importado para possíveis erros
```

Estados que foram utilizados:

```JavaScript
const [city, setCity] = useState('');
const [country, setCountry] = useState('');
const [year, setYear] = useState('');
const [result, setResult] = useState(null);
const [populationInfo, setPopulationInfo] = useState(null);
const [flag, setFlag] = useState('');
const [loading, setLoading] = useState(false);
```

- **Consumo da API de população** 

   > _A aplicação realiza uma requisição do tipo POST para buscar os dados populacionais:_
   > _https://countriesnow.space/api/v0.1/countries/population/cities/filter_
   > 
   > _Essa API retorna os dados populacionais de cidades com base no país informado._

- **Consumo da API de bandeiras** 

   > _Outra requisição POST é utilizada para buscar a bandeira do país:_
   > _https://countriesnow.space/api/v0.1/countries/flag/images_

É realizado uma busca da cidade exata digitada dentro da lista que a API retornou:

```JavaScript
const cityData = populationJson.data.find(
 item => item.city.toLowerCase() === city.toLowerCase()
);
```

# Resultado
Ao executar a aplicação, o usuário consegue realizar pesquisas de forma simples e visualizar informações completas sobre determinada cidade.

<img width="1896" height="920" alt="image" src="https://github.com/user-attachments/assets/d1687d52-8b55-4bcc-90ac-6f2e3832bac4" />

# Tecnologia
As tecnologias utilizadas para a realização do projeto foram React Native, Expo, JavaScript, API Countries Now e Fetch API.
