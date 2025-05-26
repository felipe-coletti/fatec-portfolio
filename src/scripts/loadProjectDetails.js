const params = new URLSearchParams(window.location.search)
const projectId = params.get('id')
const container = document.getElementById('project-details')

if (!projectId) {
	container.innerHTML = '<p class="paragraph">Nenhum projeto selecionado.</p>'
	throw new Error('Parâmetro "id" não encontrado na URL.')
}

container.innerHTML = '<p class="paragraph">Carregando projeto...</p>'

fetch('./src/data/projects.json')
	.then(response => response.json())
	.then(projects => {
		const project = projects.find(p => p.id === projectId)

		if (project) {
			document.title = `${project.name} - Portfólio de Felipe Coletti`
			renderProjectDetails(project)
		} else {
			container.innerHTML = '<p class="paragraph">Projeto não encontrado.</p>'
		}
	})
	.catch(error => {
		console.error('Erro ao carregar detalhes do projeto:', error)
		container.innerHTML = '<p class="paragraph">Erro ao carregar os dados do projeto.</p>'
	})

function renderProjectDetails(project) {
	container.innerHTML = `
        <header id="header">
            <h1 id="project-name" class="primary-title">${project.name}</h1>
            <a class="back-link" href="index.html">← Voltar para o Portfólio</a>
        </header>
        <h2 class="secondary-title">Visão Geral do Projeto</h2>
        <p class="paragraph">${project.description}</p>
        <h2 class="secondary-title">Repositório</h2> 
        <a class="link" href="${project.src}" target="_blank" rel="noopener noreferrer">
            ${project.src}
        </a>
        <img 
            class="project-image" 
            src="${project.image}" 
            alt="Imagem do projeto ${project.name}" 
        >
        <h2 class="secondary-title">Tecnologias Utilizadas</h2>
        <ul class="tag-group">
            ${project.technologies.map(tech => `<li class="tag">${tech}</li>`).join('')}
        </ul>
    `
}
