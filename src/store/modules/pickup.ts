/* eslint-disable no-async-promise-executor */
import {  getPickup,getDetailPickup } from '@/api/conf-api/api'
import {
    IAccountResponse,
    ISignInParams,
    ISignInResponse
} from '@/api/conf-api/interface/account'
import { ICommonResponse } from '@/api/conf-api/interface/common'
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
                console.debug("data pickup", res.data);
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
        
    }
}
