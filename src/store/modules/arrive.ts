/* eslint-disable no-async-promise-executor */
import { getPickup, getDetailPickup, updateStatus, getPickupHistory, getDelivery, getDeliveryHistory, getCity, getByAWB, addTemp, saveArrived, geneCounter, saveWCourier, cityOrig, addShipment } from '@/api/conf-api/api'
import md5 from 'crypto-js/md5'
import { State } from 'ionicons/dist/types/stencil-public-runtime'
import { Commit } from 'vuex'
import { IPostAwb } from '@/api/conf-api/interface/arrived'
import { createTableCity } from '@/api/conf-api/database'

interface State {
    [key: string]: any
    awb: any[]
    city: any[]
    delivery: any[]
    deliveryHist: any[]
}

const initialState: State = {
    awb: [],
    city: [],
    delivery: [],
    deliveryHist: []
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
        RESET_AWB(state: State) {
            state.awb = []
        },
    },
    getters: {
        get: (state: State) => (key: string) => state[key]
    },
    actions: {
        async addTemp({ commit }: { commit: Commit }, payload: any) {
            try {
                const res = await addTemp(payload);
                console.debug("data add temp", res);
                return res;
            } catch (error) {
                console.error("Error fetching pickup data:", error);
                throw error; // Re-throw the error to be handled by the caller if needed
            }
        },

        async genCounter({ commit }: { commit: Commit }, payload: any) {
            try {
                const res = await geneCounter(payload);
                return res;
            } catch (error) {
                console.error("Error fetching pickup data:", error);
                throw error; // Re-throw the error to be handled by the caller if needed
            }
        },

        async saveArrive({ commit }: { commit: Commit }, payload: any) {
            try {
                const res = await saveArrived(payload);
                console.debug("data add temp", res);
                return res;
            } catch (error) {
                console.error("Error fetching pickup data:", error);
                throw error; // Re-throw the error to be handled by the caller if needed
            }
        },

        async saveWCourier({ commit }: { commit: Commit }, payload: any) {
            try {
                const res = await saveWCourier(payload);
                console.debug("data add temp", res);
                return res;
            } catch (error) {
                console.error("Error fetching pickup data:", error);
                throw error; // Re-throw the error to be handled by the caller if needed
            }
        },

        async getDelivery({ commit }: { commit: Commit }, payload: any) {
            try {
                const res = await getDelivery(payload);
                console.debug("data delivery", res);
                commit("SET", ["delivery", res.data]);
                return res;
            } catch (error) {
                console.error("Error fetching pickup data:", error);
                throw error; // Re-throw the error to be handled by the caller if needed
            }
        },

        async getDeliveryHistory({ commit }: { commit: Commit }, payload: any) {
            try {
                const res = await getDeliveryHistory(payload);
                console.debug("data delivery", res);
                commit("SET", ["deliveryHist", res.data]);
                return res;
            } catch (error) {
                console.error("Error fetching pickup data:", error);
                throw error; // Re-throw the error to be handled by the caller if needed
            }
        },

        async resetArrive({ commit }: { commit: Commit }) {
            commit('RESET_AWB');
        },

        async getCity({ commit }: { commit: Commit }) {
            const data = {
                customer_id: localStorage.pegawai_id
            };
            try {
                const res = await getCity(data);
                if (res.error === false) {
                    commit("SET", ["city", res.data]);
                }
                console.debug("data city", res.data);
                return res;
            } catch (error) {
                console.error("Error fetching pickup data:", error);
                throw error; // Re-throw the error to be handled by the caller if needed
            }
        },
        async getAWB({ commit }: { commit: Commit }, { param, data }: { param: any; data: any }) {

            // try {
            const res = await getByAWB(param);
            if (res.error == false) {
                const resp = res.data
                resp['DataFromInput'] = data
                commit('PUSH', ['awb', resp])
                console.error('data awbb', resp)
            }
            return res;
            // } catch (error) {
            //     console.error("Error fetching pickup data:", error);
            //     throw error; // Re-throw the error to be handled by the caller if needed
            // }
        },

        async cityOrig({ commit }: { commit: Commit }) {
            const data = {
                key: "psb75"
            };
            try {
                const res = await cityOrig(data);
                if (res.error === false) {
                    createTableCity(res.data)
                    commit("SET", ["city", res.data]);
                }
                return res;
            } catch (error) {
                console.error("Error fetching pickup data:", error);
                throw error; // Re-throw the error to be handled by the caller if needed
            }
        },

        async addShipment({ commit }: { commit: Commit }, payload: any) {

            try {
                const res = await addShipment(payload);
                console.warn("add shipmenrttt", res);
                return res;
            } catch (error) {
                console.error("Error fetching pickup data:", error);
                throw error; // Re-throw the error to be handled by the caller if needed
            }
        },

    }
}
