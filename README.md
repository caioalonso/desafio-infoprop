# Desafio InfoProp

## Instruções para desenvolvimento
```
git clone https://github.com/caioalonso/desafio-infoprop
cd desafio-infoprop
docker-compose -f docker-compose.yml -f docker-compose.development.yml up
```

### Observações

#### Arquivo CSV

O CSV fornecido possui erros de encoding (ex.: "LourenÌ¤o" para o que deduzo ser "Lourenço") que não foram tratados porque alguns caracteres UTF-8 de dois bytes estão corretos e outros não. Penso que esse bug deva ser corrigido na aplicação que criou o arquivo ao invés de aumentar a complexidade do código lidando com casos especiais de arquivos mal gerados.

O arquivo usa o caractere ; como separador e a API foi feita esperando arquivos assim, apesar de não ser o espaçador mais comum para este formato. Uma solução mais robusta faria a detecção de qual delimitador foi usado.
