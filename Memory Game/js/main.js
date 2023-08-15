document.querySelector(".control-buttons span").onclick = function () {
    let name = prompt ("Whats Your Name (in English) ?");

    if (name == "mohamed salah" || name == "bondog" || name == "Mohamed Salah" || name == "Salah" || name == "salah" || name == "Crazy" || name == "crazy") {
        document.querySelector(".name span").innerHTML = 'Bondog';
    } else if (name == "Joker" || name == "joker" || name == "yossef" || name == "Yossef" || name == "yussef") {
        document.querySelector(".name span").innerHTML = 'JOoKeR';
    } else if (name == "Bakr" || name == "bakr" || name == "Bakr Adel" || name == "bakr adel" || name == "bebo") {
        document.querySelector(".name span").innerHTML = 'Beeboo';
    } else if (name == "Diaa" || name == "diaa") {
        document.querySelector(".name span").innerHTML = 'Eng. F#in Diaa';
    } else if (name == "mohamed refaat" || name == "mohamed refaat" || name == "refaat" || name == "Refaat" || name == "Mohamed Refaat") {
        document.querySelector(".name span").innerHTML = 'Abo Refaaaaat';
    } else if (name == "Khalifa" || name == "mostafa" || name == "Mostafa" || name == "mostafa khlifa" || name == "Mostafa Khalifa") {
        document.querySelector(".name span").innerHTML = 'Khalifaaaa';
    } else if (name == "mohamed khalid" || name == "Mohamed Khalid") {
        document.querySelector(".name span").innerHTML = name;
    } else if (name == "Kemo" || name == "kemo" || name == "Ahmed" || name == "ahmed" || name == "ahmed kamal" || name == "ahmed kamal") {
        document.querySelector(".name span").innerHTML = 'KemOoo';
    } else if (name == "hussen" || name == "Hussen" || name == "Houssen" || name == "Hossen" || name == "hossen") {
        document.querySelector(".name span").innerHTML = 'El Geed';
    } else if (name == null || name == "") {
        document.querySelector(".name span").innerHTML = 'Mother F#ker';
    } else {
        document.querySelector(".name span").innerHTML = name;
    }

    document.querySelector('.control-buttons').remove();

    setTimeout(function () {
        blocks.forEach((block) => {
            block.classList.remove('is-flipped');
        });
    }, 550)
    blocks.forEach((block) => {
        block.classList.add('is-flipped');
    });
}

let duration = 1000;

let blocksContainer = document.querySelector('.memory-game-blocks');

let blocks = Array.from(blocksContainer.children);

let orderRange = [...Array(blocks.length).keys()];

shuffle(orderRange);

blocks.forEach((block,index) => {
    block.style.order = orderRange[index];

    block.addEventListener('click', function() {
        flipBlock(block);
    });

});


function flipBlock(selectedBlock) {
    selectedBlock.classList.add('is-flipped');

    let allFlippedBlocks = blocks.filter(flippedBlock => flippedBlock.classList.contains('is-flipped'));

    if(allFlippedBlocks.length === 2) {
        stopClicking();
        
        checkMatched(allFlippedBlocks[0], allFlippedBlocks[1]);
    }
    let count =0;
    blocks.forEach((block) => {
        if (block.classList.contains('has-match'))
        {
            count++;
        }
    });
    if (count === 20)
    {
        let end,endd;
        setTimeout(() => {
             endd =document.querySelector('.ending');
            endd.style.display = "block";
             end = document.querySelector('.ending span');
            end.innerHTML = "Congratulations, You Won ya Abn Coom Shkair el Asmant";
        }, duration);
    }

}

function stopClicking () {
    blocksContainer.classList.add('no-clicking');

    setTimeout(() => {
    blocksContainer.classList.remove('no-clicking');
    }, duration - 30);
}

function checkMatched (first, second) {
    let tries = document.querySelector('.tries span');

    if(first.dataset.technology === second.dataset.technology) {
        first.classList.remove('is-flipped');
        second.classList.remove('is-flipped');

        first.classList.add('has-match');
        second.classList.add('has-match');

        document.getElementById('success').play();
    }else {
        tries.innerHTML = parseInt(tries.innerHTML) + 1;

        setTimeout(() => {
            first.classList.remove('is-flipped');
            second.classList.remove('is-flipped');
        }, duration);

        document.getElementById('fail').play();

    }
}

function shuffle (array) {
    let current = array.length,
        temp,
        random;
    
    while (current > 0) {
        random = Math.floor(Math.random()* current);

        current--;

        temp = array[current];
        array[current] = array[random];
        array[random]= temp;
    }
}




