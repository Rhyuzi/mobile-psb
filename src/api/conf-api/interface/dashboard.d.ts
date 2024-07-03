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
length: any;
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
  POrderID: string;
}


export interface IDeliveryOrder {
  length: any;
  connotecustname: string;
  connotedate: string;
  connoteno: string;
  connoteweight: string;
  destination: string;
  dlvcarier: string;
  dlvdate: string;
  dlvno: string;
  origin: string;
  pegawainama: string;
  servicename: string;
}

export interface GuestbookData {
  length: any;
  GuestID: string;
  GuestName: string;
  GuestPass: string | null;
  GuestEmail: string | null;
  GuestTelp: string;
  GuestAddr: string;
  GuestCity: string;
  GuestMemo: string;
  GuestPicture1: string | null;
  GuestPicture2: string | null;
  GuestContactTelp1: string;
  GuestContactTelp2: string;
  GuestContactName1: string;
  GuestContactName2: string;
  GuestContactJabat1: string | null;
  GuestContactJabat2: string | null;
  GuestType: string;
  GuestPotency1: string;
  GuestPotency2: string;
  GuestPotency3: string;
  GuestKompetitor1: string;
  GuestKompetitor2: string;
  GuestKompetitor3: string;
  GuestAreaKirim: string | null;
  GuestLocation: string;
  GuestPayPeriode: string;
  GuestMap: string;
  GuestCreate: string;
  GuestCreatBy: string | null;
  GuestRespon: string;
  GuestResponBy: string;
  GuestStatus: string;
  id: string;
  CB_Nama: string;
  orgLocation: {
      DefaultCityName: string;
      DefaultCompName: string;
      DefaultCompAddr1: string;
  };
  destLocation: {
      DefaultCityName: string;
      DefaultCompName: string;
      DefaultCompAddr1: string;
  };
}

export interface VisitData {
  length: any;
  VisitID: string;
  VisitLocation: string;
  VisitGuesJenis: string;
  VisitGuestId: string;
  VisitGuestName: string;
  VisitDate: string;
  VisitSales: string;
  VisitPicName: string;
  VisitPicJabat: string;
  VisitPotency1: string;
  VisitPotency2: string;
  VisitPotency3: string;
  VisitKompetitor1: string;
  VisitKompetitor2: string;
  VisitKompetitor3: string;
  VisitAreaKirim: string;
  VisitMemo: string;
  VisitType: string;
  VisitStatus: string;
  VisitCreateTime: string;
  VisitCreateBy: string;
  id: string;
  VisitStatusName: string;
  VisitValue: string;
  VisitCode: string;
}
