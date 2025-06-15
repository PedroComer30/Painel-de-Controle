function appendToDisplay(value) {
    document.getElementById('display').value += value
}

function clearDisplay() {
    document.getElementById('display').value = ''
}

document.addEventListener("DOMContentLoaded", function () {
    const input = document.getElementById("display");

    // Armazena o valor original antes de qualquer desconto
    let valorOriginal = null;

    // Função para aplicar desconto e atualizar display
    function aplicarDesconto(percentual) {
        let valorAtual = parseFloat(input.value);

        if (!isNaN(valorAtual)) {
            // Se valorOriginal ainda não foi salvo, salva agora
            if (valorOriginal === null) {
                valorOriginal = valorAtual;
            }

            let valorComDesconto = valorAtual - (valorAtual * percentual);
            input.value = valorComDesconto.toFixed(2);
        } else {
            console.warn("Valor inválido no input #display.");
        }
    }

    // Evento para botão .deb → 1,19%
    document.querySelectorAll(".deb").forEach(button => {
        button.addEventListener("click", function () {
            aplicarDesconto(0.0119);
        });
    });

    // Evento para botão .cred → 1,93%
    document.querySelectorAll(".cred").forEach(button => {
        button.addEventListener("click", function () {
            aplicarDesconto(0.0193);
        });
    });

    // Evento para botão .btn-result → mostra valor descontado
    document.querySelectorAll(".btn-result").forEach(button => {
        button.addEventListener("click", function () {
            let valorAtual = parseFloat(input.value);

            if (!isNaN(valorAtual) && valorOriginal !== null) {
                let descontoTotal = valorOriginal - valorAtual;
                input.value = descontoTotal.toFixed(2);

                // Resetar o valorOriginal após mostrar o resultado
                valorOriginal = null;
            } else {
                console.warn("Valor inválido ou nenhum desconto foi aplicado.");
            }
        });
    });
});


function back () {
    const display = document.getElementById('display')
    display.value = display.value.slice(0, -1)
}