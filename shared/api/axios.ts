import axios from 'axios';

const instance = axios.create({
	baseURL: 'https://x8ki-letl-twmt.n7.xano.io/api:AHyLs8bc',
	headers: {
		'Content-Type': 'application/json',
	},
});

export {
	instance,
};
