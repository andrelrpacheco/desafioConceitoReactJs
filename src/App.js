import React, { useState, useEffect } from 'react'
import api from './services/api'

import './styles.css'

function App() {
	const [repositorys, setRepositorys] = useState([])

	useEffect(() => {
		api.get('repositories').then((response) => {
			setRepositorys(response.data)
		})
	}, [])

	async function handleAddRepository() {
		const response = await api.post('repositories', {
			title: `Novo repositório ${Date.now()}`,
			url: 'https://github.com/andrelrpacheco/',
			techs: ['React, Node, React-Native TypeScript']
		})
		const repository = response.data
		setRepositorys([...repositorys, repository])
	}

	async function handleRemoveRepository(id) {
		const response = await api.delete(`repositories/${id}`)

		setRepositorys(repositorys.filter((repository) => repository.id !== id))
	}

	return (
		<div>
			<ul data-testid='repository-list'>
				{repositorys.map((repository) => {
					return (
						<li key={repository.id}>
							<ul>
								<li>
									<a href={repository.url} target='_blank'>
										{repository.title}
									</a>
								</li>
								<li>{repository.likes}</li>
							</ul>
							<button onClick={() => handleRemoveRepository(repository.id)}>
								Remover
							</button>
						</li>
					)
				})}
			</ul>
			<button onClick={handleAddRepository}>Adicionar</button>
		</div>
	)
}

export default App
