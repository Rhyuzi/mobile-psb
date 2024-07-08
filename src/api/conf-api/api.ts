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

export async function addTemp(payload: any): Promise<any> {
    return await request(endPoints.ADD_TEMP, 'post', payload)
}

export async function saveArrived(payload: any): Promise<any> {
    return await request(endPoints.SAVE_ARRIVED, 'post', payload)
}

export async function saveWCourier(payload: any): Promise<any> {
    return await request(endPoints.SAVE_WITH_COURIER, 'post', payload)
}

export async function getDelivery(payload: any): Promise<any> {
    return await request(endPoints.GET_DELIVERY, 'post', payload)
}
export async function getDeliveryHistory(payload: any): Promise<any> {
    return await request(endPoints.GET_DELIVERY_HISTORY, 'post', payload)
}

export async function geneCounter(payload: any): Promise<any> {
    return await request(endPoints.GENERATE_COUNTER, 'post', payload)
}

export async function cityOrig(payload: any): Promise<any> {
    return await request(endPoints.CITY_ORIG, 'post', payload)
}

export async function addShipment(payload: any): Promise<any> {
    return await request(endPoints.ADD_SHIPMENT, 'post', payload)
}
export async function getCheckPoint(payload: any): Promise<any> {
    return await request(endPoints.PICKUP_CHECKPOINT, 'post', payload)
}

// marketing
export async function getProspek(payload: any): Promise<any> {
    return await request(endPoints.GET_PROSPEK, 'post', payload)
}
export async function getKunjungan(payload: any): Promise<any> {
    return await request(endPoints.GET_KUNJUNGAN, 'post', payload)
}
export async function getKomoditi(payload: any): Promise<any> {
    return await request(endPoints.GET_KOMODITI, 'post', payload)
}
export async function saveProspek(payload: any): Promise<any> {
    return await requestpost(endPoints.SAVE_PROSPEK, 'post', payload)
}