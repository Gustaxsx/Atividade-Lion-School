const urlBase = 'https://lion-school-backend.onrender.com';

// Seletores
const home = document.getElementById('container-home');
const telaAlunos = document.getElementById('container-alunos');
const gridAlunos = document.getElementById('grid-alunos');
const btnVoltar = document.getElementById('btn-voltar-home');

// Função para listar alunos
async function listarAlunos(siglaCurso) {
    home.style.display = 'none';
    telaAlunos.style.display = 'flex';
    gridAlunos.innerHTML = '<p>Carregando alunos...</p>';

    try {
        const response = await fetch(`${urlBase}/alunos?curso=${siglaCurso}`);
        const data = await response.json();
        
        // A API costuma retornar um objeto. Vamos garantir que pegamos a lista certa:
        const listaAlunos = data.alunos || data; 

        gridAlunos.innerHTML = ''; // Limpa o "Carregando"

        listaAlunos.forEach(aluno => {
            const card = document.createElement('div');
            
            // Define a cor baseada no status que vem da API
            const classeStatus = aluno.status === 'Finalizado' ? 'bg-finalizado' : 'bg-cursando';
            
            card.classList.add('card-aluno', classeStatus);
            card.innerHTML = `
                <img src="${aluno.foto}" alt="Foto de ${aluno.nome}">
                <p>${aluno.nome}</p>
            `;
            gridAlunos.appendChild(card);
        });
    } catch (error) {
        gridAlunos.innerHTML = '<p>Erro ao conectar com a API.</p>';
    }
}

// Eventos nos botões de curso
document.querySelectorAll('.card-curso').forEach(btn => {
    btn.addEventListener('click', () => {
        const curso = btn.getAttribute('data-curso');
        listarAlunos(curso);
    });
});

// Evento Voltar
btnVoltar.onclick = () => {
    home.style.display = 'grid';
    telaAlunos.style.display = 'none';
};