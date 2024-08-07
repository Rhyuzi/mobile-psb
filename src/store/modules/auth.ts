/* eslint-disable no-async-promise-executor */
import { signIn } from '@/api/conf-api/api'
import {
    IAccountResponse,
    ISignInParams,
    ISignInResponse
} from '@/api/conf-api/interface/account'
import { ICommonResponse } from '@/api/conf-api/interface/common'
import router from '@/router'
import md5 from 'crypto-js/md5'
import { State } from 'ionicons/dist/types/stencil-public-runtime'
import { Commit } from 'vuex'

interface State {
    [key: string]: any
    accessToken: string
    account: string
    comment: string
    country: string
    email: string
    enterpriseName: string
    sipAccount: string
    sipPassword: string
    timeZoneDesc: string
    timeZoneDescription: string
    timezone: string
    timezoneOffset: string
    isAuth: boolean
}

const initialState: State = {
    accessToken: '',
    account: '',
    comment: '',
    country: '',
    email: '',
    enterpriseName: '',
    sipAccount: '',
    sipPassword: '',
    timeZoneDesc: '',
    timeZoneDescription: '',
    timezone: '',
    timezoneOffset: '',
    isAuth: false
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
        async signIn({ commit }: { commit: Commit }, payload: ISignInParams) {

            const res = await signIn(payload)
            if (res.error == false) {
                localStorage.setItem('UserCityDefault', res.data.UserCityDefault)
                localStorage.setItem('UserLocation', res.data.UserLocation)
                localStorage.setItem('customer_id', res.data.customer_id)
                localStorage.setItem('email', res.data.email)
                localStorage.setItem('group_id', res.data.group_id)
                localStorage.setItem('name', res.data.name)
                localStorage.setItem('pegawai_id', res.data.pegawai_id)
                localStorage.setItem('user_level', res.data.user_level)
                localStorage.setItem('admin', JSON.stringify(res.data))
                localStorage.setItem('user', JSON.stringify(res.data))
                commit('SET', ['isAuth', true])
                const role = res.data.group_id

                switch (role) {
                    case '6':
                        router.push("/marketing/tabs/");
                        break;
                    case '7':
                        router.push("/tabs/");
                        break;

                    default:
                        break;
                }
            }
            console.debug('sign in', res)
            return res
        },

    }
}
