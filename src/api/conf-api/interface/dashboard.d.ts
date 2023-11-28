import { ICommonResponse } from "./common";

export interface IMeetListPayload {
  pageSize: string;
  meetingState: string;
}

export interface IMResponse {
  data: Array;
  pageIndex: string;
  pageSize: string;
  totalCount: string;
  totalPageCount: string;
}

export interface IMeetListResponse extends ICommonResponse {
  data: IMResponse;
}

export interface IPickupItem {
  POReff: string;
  POrderAss: string;
  POrderCSO: string;
  POrderCustAddr: string;
  POrderCustName: string;
  POrderCustNo: string;
  POrderCustPerson: string;
  POrderDEO: string;
  POrderDate: string;
  POrderDateB: string;
  POrderDateM: string;
  POrderDest: string;
  POrderFinalDate: string;
  POrderIsi: string;
  POrderKurir: string;
  POrderKurirAwal: string;
  POrderKurirId: string;
  POrderKurirMemo: string;
  POrderLocation: string;
  POrderMemo: string;
  POrderModa: string;
  POrderNo: string;
  POrderOrig: string;
  POrderPack: string;
  POrderPickupDate: string;
  POrderQty: string;
  POrderRecvAddr: string;
  POrderRecvName: string;
  POrderRecvPerson: string;
  POrderRecvTelp: string;
  POrderResiCreate: string;
  POrderResiNo: string;
  POrderService: string;
  POrderStatus: string;
  POrderVol: string;
  POrderWeight: string;
  ip_address: string;
}
