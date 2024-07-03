/* eslint-disable no-async-promise-executor */
import { getKunjungan, getProspek } from '@/api/conf-api/api'
import md5 from 'crypto-js/md5'
import { State } from 'ionicons/dist/types/stencil-public-runtime'
import { Commit } from 'vuex'
import { reactive } from 'vue';
import { IPickupItem } from '@/api/conf-api/interface/dashboard';


interface State {
    [key: string]: any
    prospekList: any[],
    kunjunganList: any[],
}

const initialState: State = {
    prospekList: [],
    kunjunganList: [],
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
        },
        UPDATE_STATUS_SETUJUI(state: any, [key, id]: [any, string]) {
            const index = state[key].findIndex((item: any) => item.POrderID === id);
            if (index !== -1) {
                // Directly modify the property using the index and the spread operator
                state[key][index] = { ...state[key][index], POrderStatus: "2" };

                console.debug('updated', state[key][index]);
            }
        },

    },
    getters: {
        get: (state: State) => (key: string) => state[key]
    },
    actions: {
        async getProspekData({ commit }: { commit: Commit }, payload: any) {
            try {
                const user = JSON.parse(localStorage.admin)
                const data = {
                    marketing_id: user.username
                };
                const res = await getProspek(data);
                if (res.error === false) {
                    commit("SET", ["prospekList", res.data]);
                }
                // console.debug("data pickup", res);
                return res;
            } catch (error) {
                console.error("Error fetching pickup data:", error);
                throw error; // Re-throw the error to be handled by the caller if needed
            }
        },
        async getKunjungan({ commit }: { commit: Commit }, payload: any) {
            try {
                const user = JSON.parse(localStorage.admin)
                const data = {
                    marketing_id: user.username
                };
                const res = await getKunjungan(data);
                if (res.error === false) {
                    commit("SET", ["kunjunganList", res.data]);
                }
                // console.debug("data pickup", res);
                return res;
            } catch (error) {
                console.error("Error fetching pickup data:", error);
                throw error; // Re-throw the error to be handled by the caller if needed
            }
        },

    }
}
