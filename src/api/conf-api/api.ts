import endPoints from './endpoints'
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

export async function getDetailPickup(payload: any): Promise<any> {
    return await request(endPoints.DETAIL_PICKUP_DATA, 'post', payload)
}

export async function updateStatus(payload: any): Promise<any> {
    return await request(endPoints.UPDATE_STATUS_PICKUP, 'post', payload)
}

export async function getPickupHistory(payload: any): Promise<any> {
    return await request(endPoints.PICKUP_HISTORY, 'post', payload)
}

export async function getCity(payload: any): Promise<any> {
    return await request(endPoints.GET_CITY, 'post', payload)
}

export async function getByAWB(payload: any): Promise<any> {
    return await request(endPoints.GET_AWB, 'post', payload)
}