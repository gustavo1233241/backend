import fs, { realpath } from 'fs';

import chalk from 'chalk';

const regex = '\[[^[\]]*?]\(https?:\/\/[^\s?#.]*[^\s]*\)';

//const textoTeste = 'São geralmente recuperados a partir de um objeto [FileList](https://developer.mozilla.org/pt-BR/docs/Web/API/FileList) que é retornado como resultado da seleção, pelo usuário, de arquivos através do elemento [<input>](https://developer.mozilla.org/pt-BR/docs/Web/HTML/Element/Input), a partir do objeto [DataTransfer](https://developer.mozilla.org/pt-BR/docs/Web/API/DataTransfer) utilizado em operações de arrastar e soltar, ou a partir da API `mozGetAsFile()` em um [HTMLCanvasElement](https://developer.mozilla.org/pt-BR/docs/Web/API/HTMLCanvasElement). Em Gecko, códigos com privilégiios podem criar objetos File representando qualquer arquivo local sem a intereção do usuário (veja [Implementation notes](https://developer.mozilla.org/pt-BR/docs/Web/API/File#implementation_notes) para mais informações.).'

function extraiLinks(texto){
    const regex = /\[([^[\]]*?)\]\((https?:\/\/[^\s?#.]*[^\s]*)\)/gm;

    //const capturas = texto.match(regex);
    //const capturas = regex.exec(texto);
    //const capturas = texto.matchAll(regex);

    //operador de espalhamento
    const capturas =[...texto.matchAll(regex)];

   /*for(let i = 0; i < capturas.length; i++){
        console.log(capturas[i][2]);
    }*/

    const resultados = capturas.map(captura => ({[captura[1]]:captura[2]}))
    //console.log(resultados);
    return resultados.length !== 0?resultados:'Não há links no arquivo';
}

//extraiLinks(textoTeste);
/*
console.log(chalk.blue('Olá mundo'));

console.log(chalk.blue.bgWhite.bold("SENAI"));

console.log(chalk.blue('Curso',' de',' Node.JS'));

console.log(chalk.red('vermelho',chalk.underline.bgBlue('azul')));

console.log(`
CPU: ${chalk.red('90%')}
RAM: ${chalk.green('40%')}
DISK: ${chalk.yellow('70%')}
`);
*/

//2) tratamento de erros, função para tratar os errosd

function trataErro(erro){
    console.log(erro);
    throw new Error(chalk.red(erro.code,'não a arquivo no diretório'));
}
/*



//1) escrever uma function que traga arquivos .md

function pegaArquivo(caminhoDoArquivo){
    const encoding = 'utf-8';
    fs.readFile(caminhoDoArquivo, encoding, (erro, texto) => {
        if(erro){
            trataErro(erro);
        }
        console.log(chalk.green(texto));
    });
}

pegaArquivo('./arquivos/');
//callback(erro, texto)
*/

//aula sobre Promessas, inserir método assincrono no nossa código

//1) reescrevendo (refatorando)

/*
function pegaArquivo(caminhoDoArquivo){
    const enconding = 'utf-8';
    fs.promises.readFile(caminhoDoArquivo, enconding).then((texto) => console.log(chalk.yellow(texto))).catch((erro) => trataErro(erro));
}
pegaArquivo('./arquivos/');
*/

//usando outra forma de solucionar as promessas (async/await)

async function pegaArquivo(caminhoDoArquivo){
    try {
        const encoding = 'utf-8';
        const texto = await fs.promises.readFile(caminhoDoArquivo, encoding);
        //console.log(chalk.blue(texto));
        //console.log(extraiLinks(texto));
        return extraiLinks(texto);
    } catch(erro) {
        trataErro(erro);
    } finally {
        console.log(chalk.magenta('Operação concluida'));
    }
}
export default pegaArquivo;
//pegaArquivo('./arquivos/texto.md');
//pegaArquivo('./arquivos/');
