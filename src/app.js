import { fetchJSON } from './functions/api.js';
import { createElement } from './functions/dom.js';

/* on entoure la commande d'un "try / catch" pour capturer l'éventuelle erreur */
// obtenir les différents "todos" :
try {
	const todos = await fetchJSON(
		'https://jsonplaceholder.typicode.com/todos?_limit=5'
	);
	console.log(todos);
} catch (erreur) {
	// création d'une div pour afficher l'erreur:
	const alertElement = createElement('div', {
		class: 'alert alert-danger',
		role: 'alert',
	});
	alertElement.innerText = 'Impossible de charger les éléments';
	document.body.prepend(alertElement); // affiche en amont
}
