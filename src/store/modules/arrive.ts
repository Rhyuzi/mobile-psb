/* eslint-disable no-async-promise-executor */
import {  getPickup,getDetailPickup,updateStatus,getPickupHistory, getCity, getByAWB } from '@/api/conf-api/api'
import md5 from 'crypto-js/md5'
import { State } from 'ionicons/dist/types/stencil-public-runtime'
import { Commit } from 'vuex'

interface State {
    [key: string]: any
    awb: any[]
}

const initialState: State = {
    awb: []
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
        }
    },
    getters: {
        get: (state: State) => (key: string) => state[key]
    },
    actions: {
        async getCity({ commit }: { commit: Commit }) {
            const data = {
                customer_id: localStorage.pegawai_id
            };
            try {
                const res = await getCity(data);
                // if (res.error === false) {
                //     commit("SET", ["pickupsList", res.data]);
                // }
                console.debug("data city", res.data);
                return res;
            } catch (error) {
                console.error("Error fetching pickup data:", error);
                throw error; // Re-throw the error to be handled by the caller if needed
            }
        },
        async getAWB({ commit }: { commit: Commit }, payload: any) {
            
            try {
                const res = await getByAWB(payload);
                if (res.error == false) {
                    commit('PUSH', ['awb', res.data])
                }
                console.error('data awbb',res.data)
                return res;
            } catch (error) {
                console.error("Error fetching pickup data:", error);
                throw error; // Re-throw the error to be handled by the caller if needed
            }
        },
        
    }
}
