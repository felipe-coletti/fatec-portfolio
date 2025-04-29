fetch('./data/projects.json')
    .then((response) => response.json())
    .then((projects) => {
        const container = document.getElementById('project-cards')

        projects.forEach((project) => {
            const card = document.createElement('a')
            card.className = 'project-card'
            card.href = `project.html?id=${project.id}`
            card.textContent = project.name
            container.appendChild(card)
        })
    })
    .catch((error) => {
        console.error('Erro ao carregar projetos:', error)
    })
