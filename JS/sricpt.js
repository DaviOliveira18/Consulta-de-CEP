function buscarEndereco() {
    const cepInput = document.getElementById('cepInput');
    const cep = cepInput.value.trim();

    if (cep === '') {
        document.getElementById('endereco').innerText = "Por favor, insira um CEP.";
        return;
    }

    const url = `https://viacep.com.br/ws/${cep}/json/`;
    
    fetch(url)
    .then(response => response.json())
    .then(data => {
        if(data.erro) {
            document.getElementById('endereco').innerText = "CEP não encontrado.";
        } else {
            const endereco = `CEP: ${data.cep}, ${data.logradouro}, ${data.bairro}, ${data.localidade}, ${data.uf}`;
            const enderecoMaps = `${data.logradouro}, ${data.bairro}, ${data.localidade}, ${data.uf}`;
            const linkMaps = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(enderecoMaps)}`;
            document.getElementById('endereco').innerHTML = `${endereco} - <a href="${linkMaps}" target="_blank">Ver no Google Maps</a>`;
        }
    })
    .catch(error => {
        console.error('Erro:', error);
        document.getElementById('endereco').innerText = "Ocorreu um erro ao buscar o CEP.";
    });
}
