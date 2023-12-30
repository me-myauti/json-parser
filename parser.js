const tokens = require('./tokens')
const Lexer = require('./lexer')
const fs = require('fs')


class Parser{
    pointerPos = 0
    //input will be tokens
    constructor(input){
        this.input = input;
    }

    next = () =>{
        this.pointerPos+=1
        return this.input[this.pointerPos-1]
    }

    parseObject = () =>{
        let parsedObjectArr = []

        while(true){
            let token = this.next();

            if(token){
                switch (token[0]){
                    case tokens.CloseBrace:
                        return parsedObjectArr
                        break;
                    case tokens.String:
                        let nextTokenValue = this.next()
                        if(nextTokenValue){
                            if(nextTokenValue[0] === tokens.Colon){
                                let value = this.parse()
                                parsedObjectArr.push([token[1], value[1]])
        
                                let nextValue = this.next()
                                switch (nextValue) {
                                    case nextValue[0] === tokens.CloseBrace:
                                        return parsedObjectArr;
        
                                    case nextValue[0] === tokens.Comma:
                                        continue;
                                
                                    default:
                                        break;
                                }
                            }
                        }else{
                            return parsedObjectArr
                        }
                        break;
                
                    default:
                        break;
                }
            }else{
                return parsedObjectArr
            }
            
        }

        return parsedObjectArr
    }

    parseArray = () =>{

    }

    parse = () =>{
        let token = this.next()
        if(token){
            switch (token[0]) {
                case tokens.Null:
                    return [jsonValue.Null, null]
                    break;
                case tokens.True:
                    return [jsonValue.Boolean, true]
                    break;
                case tokens.False:
                    return [jsonValue.Boolean, false]
                    break;
                case tokens.String:
                    return [jsonValue.String, token[1]]
                    break;
                case tokens.Number:
                    return [jsonValue.Number, token[1]]
                    break;
                case tokens.OpenBrace:
                    return this.parseObject()
                    break;
                case tokens.OpenBracket:
                    return jsonValue.Null
                    break;
                
                default:
                    break;
            }
        }     
    }
}

const jsonValue = {
    "Number": 0,
    "Array": 1,
    "String": 2,
    "Object": 3,
    "Null": 4,
    "Boolean": 5
}

fs.readFile('./sample1.json', 'utf8', (err, data)=>{
    const input = data;

    let lexer = new Lexer(input)


    const parser = new Parser(lexer.lex())

    let xpto = parser.parse()
    console.log(xpto)
})

