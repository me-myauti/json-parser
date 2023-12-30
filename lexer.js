const tokens = require('./tokens')


class Lexer {
    pointerPos = 0;
    constructor(input) {
        this.input = input;
    }

    next = () => {
        this.pointerPos+=1
        return this.input[this.pointerPos-1]
    }

    getStr = () => {
        let str = '';
        while(true){
            const char = this.next();
            if(char == '"'){
                return [tokens.String, str]
            }
            str = str+char;
        }
    }

    getNumber = () =>{
        this.pointerPos -= 1

        let str = '';
        while(true){
            const char = this.next();

            if(char != '-' && isNaN(char) && char != '.'){
                return [tokens.Number, Number(str)]
            }
            str = str+char;
        }
    }

    getKeyword = (str, token) =>{
        this.pointerPos -= 1

        for(let i=0; i<str.length; i++){
            const char = this.next();

            if(char != str[i]){
                console.log('Unexpected character')
            }
        }
        return [token, null]
    }

    lex = () => {
        
        let tokensArr = []

        while(this.pointerPos <= this.input.length){

            const char = this.next()

            switch (char) {
                case "[":
                    tokensArr.push([tokens.OpenBracket, null])
                    break;
                case "]":
                    tokensArr.push([tokens.CloseBracket, null])
                    break;
                case "{":
                    tokensArr.push([tokens.OpenBrace, null])
                    break;
                case "}":
                    tokensArr.push([tokens.CloseBrace, null])
                    break;
                case ",":
                    tokensArr.push([tokens.Comma, null])
                    break;
                case ":":
                    tokensArr.push([tokens.Colon, null])
                    break;
                case '"':
                    tokensArr.push(this.getStr())
                    break;
                case '0':
                        tokensArr.push(this.getNumber())
                        break;
                case '1':
                        tokensArr.push(this.getNumber())
                        break;
                case '2':
                        tokensArr.push(this.getNumber())
                        break;
                case '3':
                        tokensArr.push(this.getNumber())
                        break;
                case '4':
                        tokensArr.push(this.getNumber())
                        break;
                case '5':
                        tokensArr.push(this.getNumber())
                        break;
                case '6':
                        tokensArr.push(this.getNumber())
                        break;
                case '7':
                        tokensArr.push(this.getNumber())
                        break;
                case '8':
                        tokensArr.push(this.getNumber())
                        break;
                case '9':
                        tokensArr.push(this.getNumber())
                        break;
                case '-':
                    tokensArr.push(this.getNumber())
                    break;
                case 't':
                        tokensArr.push(this.getKeyword("true", tokens.True))
                        break;
                case 'f':
                        tokensArr.push(this.getKeyword("false", tokens.False))
                        break;
                case 'n':
                        tokensArr.push(this.getKeyword("null", tokens.Null))
                        break;
                
                default:
                    break;
            }
        }
        return tokensArr
    }
}

module.exports = Lexer