let card_pool = [];
let card_dealer = [];
let card_player = [];
let value_player = 0;
let value_dealer = 0;

for(let i = 1; i< 14; i++){
    let card = {
        style : '♠',
        number : i,
        value : i
    }
    card_pool.push(card);
}
for(let i = 1; i< 14; i++){
    let card = {
        style : '♦',
        number : i,
        value : i
    }
    card_pool.push(card);
}
for(let i = 1; i< 14; i++){
    let card = {
        style : '♥',
        number : i,
        value : i
    }
    card_pool.push(card);
}
for(let i = 1; i< 14; i++){
    let card = {
        style : '♣',
        number : i,
        value : i
    }
    card_pool.push(card);
}
for(let i = 0; i< 52; i++){
    if(card_pool[i].value > 10){
        card_pool[i].value = 10;
    }
}

function reset(){
    card_dealer = [];
    card_player = [];
    value_dealer = 0;
    value_player = 0;
    const dealer = document.getElementById("dealer");
    const player = document.getElementById("player");
    while (dealer.hasChildNodes()) {
        dealer.removeChild(dealer.firstChild);
    }
    while (player.hasChildNodes()) {
        player.removeChild(player.firstChild);
    }
    init();
}

function stop(){
    if(card_player.filter(function(card){return card.number == 1}).length !=0 && value_player < 12){
        value_player = value_player + 10;
    }
    if(value_dealer > 21){
        alert('you win!');
    }else if(value_player > value_dealer-1){
        alert('you win!');
    }else{
        alert('you lose!')
    }
    for(let i = 0; i < card_dealer.length; i++){
        document.getElementById(`${i+1}`).innerText =`${card_dealer[i].style} ${card_dealer[i].number}`;
    }
    document.getElementById("draw").remove();
    document.getElementById("stop").remove();
    const restart = document.createElement("button");
    restart.innerText = "재시작";
    restart.addEventListener("click",reset);
    document.getElementById("restart").appendChild(restart);

}

function draw(person, number){
    const field=document.getElementById(person);
    for(let i = 0; i < number; i++){
        const random = Math.floor(Math.random()*(card_pool.length));
        const card_data = card_pool[random];
        const card = document.createElement("div");
        card.classList.add("card");
        field.appendChild(card);
        switch(card_data.number){
            case 1:
                card.innerText = `${card_data.style} A`;
                break;
            case 11:
                card.innerText = `${card_data.style} J`;
                break;
            case 12:
                card.innerText = `${card_data.style} Q`;
                break;
            case 13:
                card.innerText = `${card_data.style} K`;
                break;  
            default:
                card.innerText = `${card_data.style} ${card_data.number}`;
        }
        card_pool.splice(random,1);
        if(person == "dealer"){
            if(card_dealer.length !== 0){
                card.innerText = "?";   
            }
            card_dealer.push(card_data);
            value_dealer = value_dealer + card_data.value;
            if(card_data.number === 1 && value_dealer < 12){
                value_dealer = value_dealer + 10;           
                if(value_dealer > 21 && card_dealer.filter(function(card){return card.number == 1}).length !== 0){
                    value_dealer = value_dealer - 10;
                }
            }
            card.id = card_dealer.length;
        }else{
            card_player.push(card_data);
            value_player = value_player + card_data.value;
            if(value_player > 21){
                alert("you lose!");
                document.getElementById("draw").remove();
                document.getElementById("stop").remove();
                for(let i = 0; i < card_dealer.length; i++){
                    document.getElementById(`${i+1}`).innerText =`${card_dealer[i].style} ${card_dealer[i].number}`;
                }
                const restart = document.createElement("button");
                restart.innerText = "재시작";
                restart.addEventListener("click",reset);
                document.getElementById("restart").appendChild(restart);
            }
        }
    }
}

function init(){
    draw("dealer", 2);
    draw("player", 2);
    event.target.remove();
    const btn_draw = document.createElement("button");
    btn_draw.innerText = '드로우';
    document.getElementById('buttons').appendChild(btn_draw);
    btn_draw.addEventListener("click", function drawing(){
        draw("player", 1);
    });
    const btn_stop = document.createElement("button");
    btn_stop.innerText = '스톱';
    document.getElementById("buttons").appendChild(btn_stop);
    btn_stop.addEventListener("click", stop);
    while(value_dealer < 17){
        draw("dealer", 1);
    }
    btn_draw.id = "draw";
    btn_stop.id = "stop";
}

document.getElementById("start").addEventListener("click", init);