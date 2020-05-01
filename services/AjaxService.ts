import axios, { AxiosResponse } from "axios";
import { Collection } from "@/models/Collection";
import { List } from "@/models/List";

let host: string;

if (process.env.NODE_ENV && process.env.NODE_ENV === "production") {
	host = "http://92.60.39.47:8081";
} else {
	host = "http://localhost:8081";
}
function saveList(list: List): Promise<AxiosResponse<string>> {
	if (list.characters === null) {
		list.characters = [];
	}
	return axios.post(host + "/saveList/" + list.id, list);
}
export function loadList(id: string): Promise<AxiosResponse<List>> {
	return axios.get(host + "/getList/" + id);
}

export function saveCollection(collection: Collection): Promise<AxiosResponse<string>> {
	collection.lists.forEach((list) => {
		if (list.characters === null) {
			list.characters = [];
		}
		saveList(list);
	});

	localStorage.setItem("collection", JSON.stringify(collection));
	localStorage.setItem("collectionId", collection.id);
	return axios.post(host + "/saveCollection/" + collection.id, collection);
}
export function loadCollection(id: string): Promise<AxiosResponse<Collection>> {
	return axios.get(host + "/getCollection/" + id);
}
