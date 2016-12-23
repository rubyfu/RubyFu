# Contribution
This book is under [CC BY-NC-SA License][0] so we appreciate all kind of contributions, distribution and we reserve our contributors efforts, forever.

Note: The code in this book is tested on Ruby version > 2.2.0

## Contribution methods
There are several kind of contributions could help this book to get the best result

* Contribution by adding tricky code.
* Contribution by adding more explanation for existing code.
* Contribution by enhancing the code quality or alternatives.
* Contribution by enhancing the book quality:
    * Structure enhancements
    * Spelling, proofreading enhancements
    * Design enhancements
    * Ideas and requests
    * Any other
* Contribution by spread the book in social media and IS communities.
    * Twitter: [@Rubyfu][8] and hashtag `#Rubyfu`
    * Google+: [Rubyfu page][9]
* Contribution by adding more resources and references.
* Contribution by donation.


## How to?

### Start contributing
Please find all you need to know about GitBook and markdown editing in [References][1] section. As good start, you can refer to [how to use it from official readme][2]. You can easily use GitBook [Desktop editor][3].

1. Create a [GitHub][5] account.
2. Fork [RubyFu repository][4].
3. Clone GitHub forked RubyFu repository
   
   `git clone https://github.com/[YourGithubAccount]/RubyFu` 
4. Create a [GitBook][6] account.
4. Go to [**GitBook editor**][3] and Sign-in with your GitBook account
5. Press **Import** button to import the cloned repository. Then, you'll find it in **LOCAL LIBRARY** tab
3. Add forked RubyFu repository GitHub URL to GitBook Editor **Toolbar** >> **File** >> **Preferences** >> **GIT**.
4. Start your awesome contribution.
5. From GitBook editor, **Sync** your changes to forked repository.
6. From GitHub, send a **Pull Request(PR)** to **Master** branch.


Not sure where to start helping? Go to [TODO list](contributors/todo.md) and check the unchecked items.

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
Use triple ticks to highlight your command-line. ex. 
    ```
    ls
    ``` 

### Contributing with Translation 
To translate Rubyfu, make sure to 
- Create a new branch for your translation 
- add a sub-directory under Rubyfu's root directory with the name of the language will translate to. 
- Update `LANGS.md` file 
- Copy and paste the content of `en/` folder to your language folder, then translate it.
- Create a Pull Request (PR)

Please make sure that mark the repository as **Watch** to make your translated efforts up-to-date 

### General Contribution
General contribution might be topic requests, proofreading, spilling, book organization and style. All these contributions are welcome however has to be discussed on [Rubyfu issues][7] especially things regarding to topics and/or book organization and styling. At the same time don't hesitate to report even single word observation about the book, it's for you at the end of the day.


> **Note:** Since this book is enhanced dynamically and unordered, it's hard to make the footer notes with order series of numbers for the whole book so -until I find better solution- I'll make the number order separated for each page separately. 


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




