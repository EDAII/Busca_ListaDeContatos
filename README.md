# Busca Lista De Contatos

Link do vídeo do Trabalho 1: https://youtu.be/v_3PuYRp-LQ

## Alunos  
| Matrícula | Nome |  
|-----------------------|---------------------|  
| 21/062446 | Renan Araújo de Souza |  
| 21/1062080 | Leandro Almeida Rocha Santos | 

## Descrição do projeto
O objetivo é comparar o tempo de busca e a quantidade de operações entre três tipos de algoritmos de busca (Sequencial, Busca Binária e Hashing). Retornando ao usuário qual é o mais eficiente para a busca feita.

## Guia de instalação

### Dependências do projeto

**Linguagem**: Typescript<br>
**Framework**: React, Nodev22

### Como executar o projeto

```
git clone https://github.com/EDAII/Busca_ListaDeContatos.git
```

```
yarn install
```

```
yarn run dev
```

## Capturas de tela

<img src="https://raw.githubusercontent.com/EDAII/Busca_ListaDeContatos/refs/heads/main/public/busca1.jpg" alt="Screenshot 01" />
<img src="https://raw.githubusercontent.com/EDAII/Busca_ListaDeContatos/refs/heads/main/public/busca2.jpg" alt="Screenshot 02" />
<img src="https://raw.githubusercontent.com/EDAII/Busca_ListaDeContatos/refs/heads/main/public/busca3.jpg" alt="Screenshot 03" />
<img src="https://raw.githubusercontent.com/EDAII/Busca_ListaDeContatos/refs/heads/main/public/busca4.jpg" alt="Screenshot 04" />

## Conclusões
O projeto permitiu observar que diferentes algoritmos de busca apresentam vantagens distintas dependendo do contexto de aplicação:
- Busca sequencial: adequada para conjuntos de dados pequenos devido à sua simplicidade. Entretanto, torna-se ineficiente em grandes volumes de dados, pois cada elemento precisa ser verificado individualmente.
- Busca binária: geralmente mais rápida que a sequencial, pois reduz o número de comparações para aproximadamente log2​n. É eficiente para grandes volumes de dados, mas depende da ordenação prévia da estrutura de dados.
- Busca por hash: potencialmente a mais rápida de todas, permitindo acesso quase direto aos elementos. No entanto, exige a criação de uma função de hash adequada e pode enfrentar colisões, além de depender de uma estrutura de dados apropriada.

De forma geral, cada algoritmo demonstrou utilidade, mas também apresentou limitações específicas, mostrando que a escolha depende do tamanho dos dados e do contexto de aplicação.

