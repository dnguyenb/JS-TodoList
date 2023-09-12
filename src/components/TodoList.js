import { createElement } from '../functions/dom.js';

/** Définition d'une "todo" :
 * @typedef {object} Todo
 * @property {number} id
 * @property {string} title
 * @property {boolean} completed
 */

export class TodoList {
	// création des variables #todos et #listElement qui seront par défaut des tableaux vides :

	/**
	 * @type {Todo []}
	 */
	#todos = [];

	/**
	 * @type {HTMLElement}
	 */
	#listElement = [];

	/**
	 *
	 * @param {Todo []} todos
	 */

	constructor(todos) {
		// initialisation des propriétés :

		this.#todos = todos;
	}

	/**
	 *
	 * @param {HTMLElement} element
	 */
	appendTo(element) {
		element.innerHTML = `<form class="d-flex pb-4">
				<input
					required=""
					class="form-control"
					type="text"
					placeholder="Acheter des patates..."
					name="title"
					data-com.bitwarden.browser.user-edited="yes"
				/>
				<button class="btn btn-primary">Ajouter</button>
			</form>
			<main>
				<div class="btn-group mb-4" role="group">
					<button
						type="button"
						class="btn btn-outline-primary active"
						data-filter="all"
					>
						Toutes
					</button>
					<button
						type="button"
						class="btn btn-outline-primary"
						data-filter="todo"
					>
						A faire
					</button>
					<button
						type="button"
						class="btn btn-outline-primary"
						data-filter="done"
					>
						Faites
					</button>
				</div>

				<ul class="list-group">
				</ul>
			</main>`;
		// récupère la liste 'ul' :
		this.#listElement = element.querySelector('.list-group');

		/* boucle pour récupérer les "todos" que l'on rattache ensuite à la liste */
		for (let todo of this.#todos) {
			const t = new TodoListItem(todo);
			t.prependTo(this.#listElement);
		}
		element
			.querySelector('form')
			.addEventListener('submit', (e) => this.onSubmit(e));
	}
	/**
	 * @param {SubmitEvent} e
	 */
	onSubmit(e) {
		e.preventDefault(); // pour ne pas envoyer le formulaire tout de suite.

		// on récupère le "title" du champs :
		const title = new FormData(e.currentTarget).get('title').toString().trim(); // toString() pour s'assurer d'avoir une chaine de caractère et trim() pour retirer les espaces en début et fin.
		console.log(title);
		// est-ce que le titre n'est pas vide ?
		if (title === '') {
			return; // return ne retourne rien, il ne se passe rien.
		}

		// création de l'objet todo :
		const todo = {
			id: Date.now(), // crée une tâche avec un timestamp
			title,
			completed: false, // par défaut la tâche n'est complétée
		};
		// création d'un nouveau TodoListItem :
		const item = new TodoListItem(todo);
		// rajout de cet item à la liste d'items :
		item.prependTo(this.#listElement);
	}
}

class TodoListItem {
	#element;
	/**
	 * @type {Todo}
	 */

	constructor(todo) {
		const id = `todo-${todo.id}`;
		const li = createElement('li', {
			class: 'todo list-group-item d-flex align-items-center',
		});
		const checkbox = createElement('input', {
			type: 'checkbox',
			class: 'form-check-input',
			id: id,
			checked: todo.completed ? '' : null,
		});

		const label = createElement('label', {
			class: 'ms-2 form-check-label',
			for: id,
		});
		label.innerText = todo.title;

		const button = createElement('button', {
			class: 'ms-auto btn btn-danger btn-sm',
		});
		button.innerHTML = '<i class="bi-trash"> </i>';

		li.append(checkbox);
		li.append(label);
		li.append(button);

		button.addEventListener('click', (e) => this.remove(e));

		this.#element = li; // permet de sauvegarder l'élément "li" dans "this"
	}

	/**
	 * @param {HTMLElement} element
	 */
	prependTo(element) {
		element.prepend(this.#element);
	}

	/**
	 *
	 * @param {PointerEvent} e // car évènement de type "click"
	 */
	remove(e) {
		e.preventDefault();
		this.#element.remove();
	}
}
