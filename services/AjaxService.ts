import axios, { AxiosResponse } from "axios";
import { Collection } from "~/models/interfaces/Collection";
import { List } from "~/models/interfaces/List";

// function saveList(list: List): Promise<AxiosResponse<string>> {
// 	if (list.characters === null) {
// 		list.characters = [];
// 	}
// 	return axios.post(host + "/saveList/" + list.id, list);
// }
export function loadList(id: string): Promise<AxiosResponse<List>> {
	return axios.get(process.env.BASE_URL + "/getList/" + id);
}

export function saveCollection(collection: Collection): Promise<AxiosResponse<string>> {
	return axios.post(process.env.BASE_URL + "/saveCollection/", collection);
}

// 	localStorage.setItem("collection", JSON.stringify(collection));
// 	localStorage.setItem("collectionId", collection.id);
// 	return axios.post(host + "/saveCollection/" + collection.id, collection);
// }
export function loadCollection(id: string): Promise<AxiosResponse<Collection>> {
	return axios.get(process.env.BASE_URL + "/loadCollection/", { params: { id } });
}
