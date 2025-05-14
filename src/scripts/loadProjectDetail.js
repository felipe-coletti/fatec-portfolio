const params = new URLSearchParams(window.location.search)
const projectId = params.get('id')

fetch('./src/data/projects.json')
	.then(response => response.json())
	.then(projects => {
		const project = projects.find(p => p.id === projectId)

		if (project) {
			document.title = project.name

			const container = document.getElementById('project-details')
			container.innerHTML = `
                <header id="header">
                    <h1 id="project-name" class="primary-title">${project.name}</h1>
                    <a class="back-link" href="index.html">← Voltar para o Portfólio</a>
                </header>
                <h2 class="secondary-title">Visão Geral do Projeto</h2>
                <p class="paragraph">${project.description}</p>
                <h2 class="secondary-title">Repositório no GitHub</h2> 
                <a class="link" href="${project.github}" target="_blank">${project.github}</a>
                <img class="project-image" src="${project.image}" alt="Screenshot de ${project.name}">
                <h2 class="secondary-title">Tecnologias Utilizadas</h2>
                <ul class="tag-group">
                  ${project.technologies.map(tech => `<li class="tag">${tech}</li>`).join('')}
                </ul>
            `
		} else {
			document.getElementById('project-details').innerHTML = '<p class="paragraph">Projeto não encontrado.</p>'
		}
	})
	.catch(error => {
		console.error('Erro ao carregar detalhes do projeto:', error)
	})
