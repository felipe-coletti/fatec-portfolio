const params = new URLSearchParams(window.location.search)
const projectId = params.get('id')

fetch('./data/projects.json')
    .then((response) => response.json())
    .then((projects) => {
        const project = projects.find((p) => p.id === projectId)

        if (project) {
            document.title = project.name

            const container = document.getElementById('project-details')
            container.innerHTML = `
                <header id="header">
                    <h1 id="project-name">${project.name}</h1>
                    <a href="index.html">← Voltar para o Portfólio</a>
                </header>
                <h2>Visão Geral do Projeto</h2>
                <p>${project.description}</p>
                <h2>Repositório no GitHub</h2> 
                <p><a href="${project.github}" target="_blank">${project.github}</a></p>
                <img src="${project.image}" alt="Screenshot de ${
                project.name
            }" style="max-width:100%; margin-top:1rem;">
                <h2>Tecnologias Utilizadas</h2>
                <ul>
                  ${project.technologies.map((tech) => `<li>${tech}</li>`).join('')}
                </ul>
            `
        } else {
            document.getElementById('project-details').innerHTML = '<p>Projeto não encontrado.</p>'
        }
    })
    .catch((error) => {
        console.error('Erro ao carregar detalhes do projeto:', error)
    })
