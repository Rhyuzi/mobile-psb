import endPoints from './endpoints'
import {
    IAccountInfo,
    IAccountResponse,
    ISignInParams,
    ISignInResponse,
    IUpdateAccountInfo
} from './interface/account'
import { ICommonResponse, IPage, ITimezone } from './interface/common'
import { IMeetListPayload, IMeetListResponse } from './interface/dashboard'
import { IPlan } from './interface/room-resource'

import request from './request'
import requestpost from './requestpost'



export async function signIn(payload: any): Promise<any> {
    return await request(endPoints.ACCOUNT_LOGIN, 'post', payload)
}

export async function getPickup(payload: any): Promise<any> {
    return await request(endPoints.PICKUP_DATA, 'post', payload)
}