import axios from "axios";
import { create } from "zustand";
import { url } from "../config/config";

export const useList = create((set, get) => ({
    data: [],
    getUser: async () => {
        try {
            let {data} = await axios.get(`${url}/api/to-dos`);
            set({data: data.data});
        } catch (error) {
            console.error(error);
        }
    },
    postUser: async (obj) => {
        try {
            await axios.post(`${url}/api/to-dos`, obj);
            get().getUser()
        } catch (error) {
            console.error(error);
        }
    },
    deleteUser: async (id) => {
        try {
            await axios.delete(`${url}/api/to-dos/?id=${id}`);
            get().getUser()
        } catch (error) {
            console.error(error);
        }
    },
    deleteImage: async (id) => {
        try {
            await axios.delete(`${url}/api/to-dos/images/${id}`);
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
        await axios.put(`${url}/api/to-dos`, obj);
        get().getUser();
      } catch (error) {
        console.error(error);
      }
    },
    check: async (el) => {
        try {
          await axios.put(`${url}/completed?id=${el.id}`, {
            name: el.name,
            id: el.id,
            description: el.description,
            isCompleted: !el.isCompleted
          });
          get().getUser();
        } catch (error) {
          console.error(error);
        }
    }
    
}))