import { api } from '../api/api';

class Service {
	protected url: string;

	constructor(url: string) {
		this.url = url;
	}

	create<T> (payload: T) {
		return api.post(this.url, payload);
	}

	delete (id: number | string) {
		return api.delete(`${this.url}/${id}`);
	}

	update<T> (id: number | string, payload: T) {
		return api.put(`${this.url}/${id}`, { ...payload, id });
	}

	findAll() {
		return api.get(this.url);
	}

	find(id: number | string) {
		return api.get(`${this.url}/${id}`);
	}
}

export { Service };