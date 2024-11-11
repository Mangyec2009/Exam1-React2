import axios from "axios";
import { create } from "zustand";
import { url } from "../config/config";

export const useList = create((set, get) => ({
    data: [],
    getUser: async () => {
        try {
            let {data} = await axios.get(`${url}/ToDo/get-to-dos`);
            set({data: data.data});
        } catch (error) {
            console.error(error);
        }
    },
    postUser: async (obj) => {
        try {
            await axios.post(`${url}/ToDo/add-to-do`, obj);
            get().getUser()
        } catch (error) {
            console.error(error);
        }
    },
    deleteUser: async (id) => {
        try {
            await axios.delete(`${url}/ToDo/delete-to-do?id=${id}`);
            get().getUser()
        } catch (error) {
            console.error(error);
        }
    },
    deleteImage: async (id) => {
        try {
            await axios.delete(`${url}/ToDo/delete-to-do-image?imageId=${id}`);
            get().getUser()
        } catch (error) {
            console.error(error);
        }
    },
    modalEdit: false,
    setModalEdit: (status) => {set(state => ({modalEdit: status}))},
    idx: null,
    setIdx: (value) => set(state => ({idx:value})),
    name: "",
    setName: (value) => set(state => ({name:value})),
    desc: "",
    setDesc: (value) => set(state => ({desc:value})), 
    putUser: async (obj) => {
      try {
        await axios.put(`${url}/ToDo/update-to-do`, obj);
        get().getUser();
      } catch (error) {
        console.error(error);
      }
    },
    
}))