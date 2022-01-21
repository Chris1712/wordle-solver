# WordleSolver

## Chris' Notes

See dictionary-extraction directory for derivation of our word list, which is automatically pushed into dictionary service source code.

Base word list `dictionary-extraction/words.txt` is from collins NA scrabble dictionary.

Frequency stats `unigram_freq.csv` is from the Google Web Trillion Word Corpus, via kaggle.

### Build & run:

Uses npm, the angular CLI and python 3.9 for development, but only docker should be needed to build and run from source:

```shell
docker build -t wordle-solver:latest  .
docker run -p 80:80 wordle-solver:latest
```

To deploy under an existing nginx deployment, build with eg `ng build --base-href /wordle-solver/` and then copy `dist/wordle-solver` to `/var/www/html/wordle-solver/`

## Automatically generated Notes:

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 13.1.2.

### Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

### Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

### Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory.

### Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

### Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via a platform of your choice. To use this command, you need to first add a package that implements end-to-end testing capabilities.

### Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI Overview and Command Reference](https://angular.io/cli) page.

