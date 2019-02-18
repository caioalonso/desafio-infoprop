# Desafio InfoProp

## Development instructions
```
git clone https://github.com/caioalonso/desafio-infoprop
cd desafio-infoprop
docker-compose -f docker-compose.yml -f docker-compose.development.yml up
```

The frontend will be available at http://localhost:3000 . The API at :3001.

## Deploy instructions
```
$(aws ecr get-login --no-include-email --region sa-east-1)
docker build -t frontend frontend
docker build -t api api
docker tag frontend:latest 390576755599.dkr.ecr.sa-east-1.amazonaws.com/desafio-infoprop/frontend:latest
docker tag api:latest 390576755599.dkr.ecr.sa-east-1.amazonaws.com/desafio-infoprop/api:latest
docker push 390576755599.dkr.ecr.sa-east-1.amazonaws.com/desafio-infoprop/frontend:latest
docker push 390576755599.dkr.ecr.sa-east-1.amazonaws.com/desafio-infoprop/api:latest
```

Then on the EC2 with the `docker-compose.*` files in place:
```
docker-compose -f docker-compose.yml -f docker-compose.production.yml up
```

### API Endpoints

- GET /v1/properties
  - returns all properties
  - optional parameters:
    - latMin, lonMin, latMax, lonMax
  - when all optional parameters are provided, will return only the properties within the rectangle defined by the (latMin,lonMin) (latMax,lonMax) points
- POST /v1/properties/csvUpload
  - receives a CSV file with the name csvFile
- POST /v1/properties/reset
  - removes all properties

### Observações

#### Arquivo CSV

O CSV fornecido possui erros de encoding (ex.: "LourenÌ¤o" para o que deduzo ser "Lourenço") que não foram tratados porque alguns caracteres UTF-8 de dois bytes estão corretos e outros não. Penso que esse bug deva ser corrigido na aplicação que criou o arquivo ao invés de aumentar a complexidade do código lidando com casos especiais de arquivos mal gerados.

O arquivo usa o caractere ; como separador e a API foi feita esperando arquivos assim, apesar de não ser o espaçador mais comum para este formato. Uma solução mais robusta faria a detecção de qual delimitador foi usado.
