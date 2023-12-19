/* eslint-disable no-async-promise-executor */
import {  getPickup,getDetailPickup,updateStatus,getPickupHistory } from '@/api/conf-api/api'
import md5 from 'crypto-js/md5'
import { State } from 'ionicons/dist/types/stencil-public-runtime'
import { Commit } from 'vuex'

interface State {
    [key: string]: any
    pickupsList: any[]
}

const initialState: State = {
    pickupsList: []
}

export default {
    namespaced: true,
    state: initialState,
    mutations: {
        SET(state: State, [key, value]: [string, any]) {
            state[key] = value
        },
        RESET(state: State) {
            Object.assign(state, initialState)
        },
        PUSH: function (state: any, [key, value]: [any, any]) {
            state[key].push(value)
        },
        DELETE_BY_ID(state: any, [key, id]: [any, string]) {
            const index = state[key].findIndex((item: any) => item.POrderID === id);
            if (index !== -1) {
              state[key].splice(index, 1);
            }
        }
    },
    getters: {
        get: (state: State) => (key: string) => state[key]
    },
    actions: {
        async getPickupData({ commit }: { commit: Commit }) {
            const data = {
                customer_id: localStorage.pegawai_id
            };
            try {
                const res = await getPickup(data);
                if (res.error === false) {
                    commit("SET", ["pickupsList", res.data]);
                }
                console.debug("data pickup", res);
                return res;
            } catch (error) {
                console.error("Error fetching pickup data:", error);
                throw error; // Re-throw the error to be handled by the caller if needed
            }
        },
        async getDetailPickup({ commit }: { commit: Commit }) {
            const data = {
                pickup_id: localStorage.idPickup
            };
            try {
                const res = await getDetailPickup(data);
                // if (res.error === false) {
                //     commit("SET", ["pickupsList", res.data]);
                // }
                // console.debug("data pickup", res.data);
                return res;
            } catch (error) {
                console.error("Error fetching pickup data:", error);
                throw error; // Re-throw the error to be handled by the caller if needed
            }
        },

        async updateStatus({ commit }: { commit: Commit }, payload: any) {
            
            try {
                const res = await updateStatus(payload);
                if (res.error == false) {
                    commit("DELETE_BY_ID", ["pickupsList", payload.pickup_id]);
                }
                // console.log('Update status')
                return res;
            } catch (error) {
                console.error("Error fetching pickup data:", error);
                throw error; // Re-throw the error to be handled by the caller if needed
            }
        },
        async pickupHistory({ commit }: { commit: Commit }, payload: any) {
            
            try {
                const res = await getPickupHistory(payload);
                return res;
            } catch (error) {
                console.error("Error fetching pickup data:", error);
                throw error; // Re-throw the error to be handled by the caller if needed
            }
        },
        
    }
}
