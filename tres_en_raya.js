const numTiles = 3;
const numPlayers = 2;
const playerSimbols = ["X","O"]

function GenerarLetrero(){
var prueba_p = document.createElement("p");
prueba_p.textContent = "Hola mundo"
prueba_p.id = "p_victoria"
document.body.appendChild(prueba_p);
console.log("hola mundo");
}
GenerarLetrero();
function GenerarTablero(){
    var table = document.createElement("table");
    var filas = [];
    for(var i = 0 ; i < numTiles ; i++ ){
        filas[i]= document.createElement("tr")
        for(var j =0; j<numTiles;j++){
            var td = document.createElement("td");
            td.textContent = "";
            if(i ===0){
                td.classList.add("filaInicio");
            }else if(i === numTiles-1){
                td.classList.add("filaFin");
            }
            if(j ===0){
                td.classList.add("columnaInicio");
            }else if(j === numTiles -1){
                td.classList.add("columnaFin");
            }
            td.id = "casilla"+i+"_"+j;
            filas[i].appendChild(td);  
        }
        table.appendChild(filas[i])

    }
    document.body.appendChild(table);
    console.log("tablero generado");
}
GenerarTablero();
class Jugador{
    constructor(playerNumber,modeAuto){
        this.id=playerNumber;
        this.simbolo = playerSimbols[playerNumber -1];
        if(playerNumber == 1){
            this.automatico = false;
        }else{
            if(modeAuto){
                this.automatico = true;
            }else{
                this.automatico = false;
            }

        }
    }
}
class Partida{
    constructor(){
        var isAuto = document.getElementById("mode_Auto").checked;
        this.tablero = new Array(numTiles);
        for(var i=0; i<numTiles;i++){
            this.tablero[i]= new Array(numTiles);
            for(var j=0; j<numTiles;j++){
                var temp = document.getElementById("casilla"+i+"_"+j);
                temp.textContent= "";
                this.tablero[i][j] = "";
            }
        }
        this.isAuto = isAuto;
        this.jugadores = [];
        for(let i = 0; i< numPlayers;i++){
        this.jugadores[i] = new Jugador(i+1,isAuto);
        }
        console.log(this.jugadores);
        this.turno = 1;
        this.juega =1;
        this.actualizar();
    }
    actualizar(){
        for(var i=0; i<numTiles;i++){
            for(var j=0; j<numTiles;j++){
                if(i == 11){
                    console.log(document.getElementById("casilla"+i+"_"+j).textContent);
                }
                var temp = document.getElementById("casilla"+i+"_"+j);
                this.tablero[i][j]= temp.textContent;
            }
        }
        console.log(this.tablero);
        document.getElementById("p_victoria").textContent = "Turno: " + this.turno;
        this.comprobarVictoria();
    }
    comprobarVictoria(){
        for(let i = 0; i<numTiles ; i++){
            let temp = this.tablero[i][0];
            let temp2 = this.tablero[0][i];
            let numIgualesF = 0;
            let numIgualesC = 0;
            let numIgualesDS = 0;
            let numIgualesDI = 0;
            for(let j = 0; j<numTiles;j++){
                if(j>0 && temp && temp.localeCompare(this.tablero[i][j]) === 0){
                    numIgualesF++;
                }
                if(i === 0 && temp && j > 0){
                    if(temp.localeCompare(this.tablero[j][j]) === 0){
                        numIgualesDS++;
                    }
                }
                if(i === numTiles-1 && temp && j >0){
                    if(temp.localeCompare(this.tablero[i-j][j]) === 0){
                        numIgualesDI++;
                    }
                }
                if(j>0 && temp2 &&temp2.localeCompare(this.tablero[j][i]) === 0){
                    numIgualesC++;
                }
            }
            if(numIgualesF === numTiles -1){
                document.getElementById("p_victoria").textContent = "Gana " + temp;
                this.turno = -1;
                return;
            }
            if(numIgualesC === numTiles -1){
                document.getElementById("p_victoria").textContent = "Gana " + temp2;
                console.log(temp2);
                this.turno = -1;
                return;
            }
            if(numIgualesDS === numTiles -1){
                document.getElementById("p_victoria").textContent = "Gana " + temp;
                this.turno = -1;
                return;
            }
            if(numIgualesDI === numTiles -1){
                document.getElementById("p_victoria").textContent = "Gana " + temp;
                this.turno = -1;
                return;
            }
        }
        for(var i = 0; i<numTiles;i++){
            for(var j = 0; i<numTiles; i++){
                if(!this.tablero[i][j]){
                    console.log("se sigue");
                    return;
                }
            }
        }
        console.log("empate");
        
    }
    ponerFicha(jugador,casilla){
        console.log(casilla.textContent);
        if(!casilla.textContent){
            if(this.turno > 0){
                casilla.textContent = this.jugadores[jugador].simbolo;
                this.turno ++;
                if(this.juega === numPlayers){
                    this.juega = 1;
                }else{
                    this.juega++;
                }
                this.actualizar();
            }
            return 0;
        }else{
            return -1;
        }
    }
}
var partida = new Partida();
let casillas = document.querySelectorAll("td");
for(var item of casillas){
    item.addEventListener("click", function(t){
        if(partida.turno > 0){
            if(partida.isAuto){
                if(partida.ponerFicha(0,t.target) !== -1){
                    for(var i=1 ; i< numPlayers; i++){
                        do{
                            var temp = partida.ponerFicha(i,casillas[Math.trunc(Math.random()*(casillas.length-1))])
                        }while(temp!=0);
                    }
                }
            }else{
                for(var i =0 ; i<numPlayers ; i++){
                    if(partida.juega === i+1){
                        partida.ponerFicha(i,t.target);
                    }
                }
                
            }
            
        }
    },true);
}

var button_jugar = document.querySelector("#button_jugar");


console.log(partida.turno);
button_jugar.addEventListener("click",function(){
    console.log(document.querySelector('input[value = automatico]').checked);
    partida = new Partida();
},true);
console.log(button_jugar);

