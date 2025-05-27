fetch('./src/data/profile.json')
	.then(response => response.json())
	.then(profile => {
		const formatPeriod = periodStr => {
			if (!periodStr) return ''
			const [year, month] = periodStr.split('-')
			const monthNames = ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun', 'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez']
			return `${monthNames[parseInt(month, 10) - 1]}/${year}`
		}

		console.log('Perfil carregado:', profile)

		const photo = document.getElementById('profile-photo')
		console.log('Elemento profile-photo:', photo)
		photo.src = profile.avatar
		photo.alt = `Foto de ${profile.name}`

		document.getElementById('profile-name').textContent = profile.name

		if (profile.courses.length > 0) {
			const course = profile.courses[0]
			document.getElementById('profile-course').textContent = `Curso: ${course.name} - ${course.unit}`
			document.getElementById('profile-period').textContent = `Início: ${formatPeriod(
				course.start
			)} | Conclusão: ${formatPeriod(course.end)}`
		}

		const socialMediaContainer = document.getElementById('social-media')
		console.log('Elemento social-media:', socialMediaContainer)
		socialMediaContainer.innerHTML = ''
		profile.socialMedia.forEach(social => {
			const li = document.createElement('li')
			const a = document.createElement('a')
			a.href = social.src
			a.target = '_blank'
			a.rel = 'noopener noreferrer'
			a.textContent = social.name
			a.className = 'button'
			li.appendChild(a)
			socialMediaContainer.appendChild(li)
		})

		const experiencesList = document.getElementById('experiences-list')
		console.log('Elemento experiences-list:', experiencesList)
		experiencesList.innerHTML = ''
		profile.experiences.forEach(exp => {
			const li = document.createElement('li')
			li.className = 'box'
			li.innerHTML = `
				<h3 class="tertiary-title">${exp.company}</h3>
				<p class="paragraph"><strong>Período:</strong> ${formatPeriod(exp.start)} - ${formatPeriod(exp.end)}</p>
				<p class="paragraph"><strong>Cargo:</strong> ${exp.position}</p>
				<p class="paragraph"><strong>Atividades:</strong> ${exp.description}</p>
			`
			experiencesList.appendChild(li)
		})

		const extensionList = document.getElementById('extension-list')
		console.log('Elemento extension-list:', extensionList)
		extensionList.innerHTML = ''
		if (profile.extensionCourses && Object.keys(profile.extensionCourses).length) {
			Object.values(profile.extensionCourses).forEach(course => {
				const li = document.createElement('li')
				li.innerHTML = `<p class="paragraph">${course.name} - ${course.institution} (${course.start} - ${course.end})</p>`
				extensionList.appendChild(li)
			})
		} else {
			const li = document.createElement('li')
			li.innerHTML = '<p class="paragraph">Sem cursos de extensão realizados até o momento.</p>'
			extensionList.appendChild(li)
		}

		const languagesList = document.getElementById('languages-list')
		console.log('Elemento languages-list:', languagesList)
		languagesList.innerHTML = ''
		profile.languages.forEach(lang => {
			const li = document.createElement('li')
			li.innerHTML = `<p class="paragraph">${lang.name} - ${lang.level}</p>`
			languagesList.appendChild(li)
		})
	})
	.catch(err => {
		console.error('Erro ao carregar perfil:', err)
	})
