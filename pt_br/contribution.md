# Contribuição
Esse livro está sob a licença [CC BY-NC-SA License][0] Nós apreciamos todo tipo de contribuição, distribuição e agradeçemos pelo empenho dos contribuidores, para sempre. 

Nota: Os códigos nesse livro são testados em versões maiores que 'Ruby 2.2.0

## Metódos de Contribuição
Existem muitos tipos de contribuição que podem ajudar a tornar esse licro cada vez melhor.

* Adicionando códigos (mostre seu kung-fu).
* Contribution by adding more explanation for existing code.
* Adicionando mais explicações para o código existente.
* Melhorando a qualidade dos códigos ou alternativas ao mesmo.
* Melhorando a qualidade do livro:
    * Estrutura 
    * Ortografia e revisão
    * Design
    * Ideias e pedidos
    * Entre outras
* Divulgando esse livro em redes sociais e comunidades.
    * Twitter: [@Rubyfu][8] e hashtag `#Rubyfu`
    * Google+: [Rubyfu page][9]
* Adicionando mais referências e recursos
* Doação.


## Como?

### Começando a Contribuir
Por favor, procure tudo que precisa saber sobre GitBook e a linguagem markdown na seção [References][1]. Um bom começo pode ser consultado em [how to use it from official              readme][2]. Você pode usar facilmente a ferramenta de edição do GitBook[Desktop_editor][3].

1. Crie uma conta no [GitHub][5].
2. Fork [RubyFu repository][4].
3. Clone o seu repositório RubyFy em sua máquina 
   
   `git clone https://github.com/[YourGithubAccount]/RubyFu` 
4. Crie uma conta no [GitBook][6].
5. Vá para  [**GitBook editor**][3] e entre com a sua conta do GitBook
6. aperte o botão  **Import**  para importar o repositório clonado. Então você vai encontrar ele na aba **LOCAL LIBRARY**
7. Adicione o repositório forkado do RubyFu no Editor GitBook **Toolbar** >> **File** >> **Preferences** >> **GIT**.
8. Inicie a sua maravilhosa contribuição
9. Do editor GitBook, **Sync** suas mudanças para o repositório forkado.
10. Do GitHub, envia um **Pull Request(PR)** para o bracnh **Master**.


Ainda não sabe por onde começar a contribuir? Vá para [TODO_list](contributors/todo.md) e cheque o itens que ainda não foram resolvidos.
### Contributing with Code

##### Ruby code
* Use the triple ticks ` ``` `  followed by `ruby` then your code in between then ` ``` ` to get ruby code highlighted. e.g.

        ```ruby
        puts "Ruby Code here"
        ```
* Explain the main idea -with some details- of the code, if you explain every line that would be great but it's not a must.
* Choose the correct Module.
* Make your title clear.
* Use Text editor/ide for code identification before pasting your code
* Mention the source, if you copied or developed a code that created by others please mention the source in the footer. e.g.

        ```ruby
        puts "Your good code"
        ```
        [Source][1]
    Then add the following to the footer

        [1]: http://TheSouceCodeURL

    Your notes should be under the footer's line. Add the following to initiate the footer if it does not yet exist

        <br><br><br>
        ---
        YOUR NOTES SHALL BE HERE

* Try to use readable code, if you have to add more tricky/skilled code then explain it well
    > **Remember!** Hacker's code **=!** Cryptic code


##### Command-line
Use triplas crases para realçar suas linhas de código. exemplo.
    ```
    ls
    ``` 

### Contribuição com Tradução 
Para traduzir RubyFu, tenha certeza de
- Criar um novo branch para sua tradução
- Adicionar um sub-diretório na pasta raiz do RubyFu com o nome do idioma para qual deseja traduzir.
- Atualizar o arquivo `Langs.md`
- Copiar e colar o conteúdo da pasta `en/`, na pasta em que acabou de criar para seus arquivos traduzidos.
- Criar um novo Pull Request (PR)

Por favor! Não esqueça de marcar o repositório como **Watch** para fazer suas traduções atualizadas!

### Contribuições Gerais
General contribution might be topic requests, proofreading, spilling, book organization and style. All these contributions are welcome however has to be discussed on [Rubyfu issues][7] especially things regarding to topics and/or book organization and styling. At the same time don't hesitate to report even single word observation about the book, it's for you at the end of the day.


> **Nota:** Como esse livro é implementado dinamicamente e sem ordem de capítulo especifica, é difícil fazer notas de rodapé de maneira ordenada com números de todo o livro, então, até que eu encotre uma solução melhor, Irei organizar por cada página separadamente.

<br><br><br>
---
[0]: https://creativecommons.org/licenses/by-nc-sa/3.0/
[1]: references/README.md
[2]: https://github.com/GitbookIO/gitbook
[3]: https://www.gitbook.com/editor
[4]: https://github.com/rubyfu/RubyFu
[5]: https://github.com
[6]: http://gitbook.com
[7]: https://github.com/rubyfu/RubyFu/issues
[8]: https://twitter.com/Rubyfu
[9]: https://plus.google.com/114358908164154763697




