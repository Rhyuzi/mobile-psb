import { ICommonResponse } from "./common";

export interface IArrivedItem {
  pageSize: string;
  meetingState: string;
  LocationID: string;
  DefaultAccount: string;
  DefaultCityNo: string;
  DefaultCityNo2: string;
  DefaultCityAgenNo: string;
  DefaultCityName: string;
  DefaultCompName: string;
  DefaultCompAddr1: string;
  DefaultCompAddr2: string;
  DefaultCompAddr3: string;
  DefaultCompTelp: string;
  DefaultCompEmail: string;
  DefaultCompWA: string;
  DefaultCompWAText: string;
  DefaultCompFax: string;
  DefaultCompContack: string;
  DefaultDatabaseName: string;
  DefaultMemo: string;
  DefaultStatus: string;
  DefaultCompActive: string;
  DefaultCityIN: string;
  DefaultCityOUT: string;
  DefaultCheckConnote: string;
  DefaultSaldo: string;
  CountBAGNo: string;
  CountULNo: string;
  CountDLNo: string;
  CountAFNo: string;
  CountWCNo: string;
  CountSDNo: string;
  CountRSNo: string;
  CountRANo: string;
  CountVOCNo: string;
  CountPAYNo: string;
  CountINVNo: string;
  CountRCNo: string;
  CountRHNo: string;
  CountAWBNo: string;
  CountEAWBLast: string;
  CountEAWBEnd: string;
}

export interface IConnoteAWB {
  ConnoteBaging: string;
  ConnoteBillAmount: string;
  ConnoteBillDisc: string;
  ConnoteBillInsurance: string;
  ConnoteBillOther: string;
  ConnoteBillPack: string;
  ConnoteBillTax: string;
  ConnoteContents: string;
  ConnoteCost0: string;
  ConnoteCost1: string;
  ConnoteCost2: string;
  ConnoteCost3: string;
  ConnoteCourierDeli: string;
  ConnoteCourierPickup: string;
  ConnoteCustAddr: string;
  ConnoteCustName: string;
  ConnoteCustNo: string;
  ConnoteCustReff: string;
  ConnoteCustTelp: string;
  ConnoteDate: string;
  ConnoteDateDeli: string;
  ConnoteDescDeli: string;
  ConnoteDest: string;
  ConnoteLastStatus: string;
  ConnoteLocation: string;
  ConnoteMCost0: string;
  ConnoteMCost1: string;
  ConnoteMCost2: string;
  ConnoteMemo: string;
  ConnoteNo: string;
  ConnoteNoReff: string;
  ConnoteOrderNo: string;
  ConnoteOrig: string;
  ConnotePayment: string;
  ConnotePraInv: string;
  ConnoteQty: string;
  ConnoteRecvAddr: string;
  ConnoteRecvId: string;
  ConnoteRecvName: string;
  ConnoteRecvReff: string;
  ConnoteRecvTelp: string;
  ConnoteRetur: string;
  ConnoteReturDate: string;
  ConnoteService: string;
  ConnoteSource: string;
  ConnoteStatusInvoice: string;
  ConnoteType: string;
  ConnoteValid: string;
  ConnoteVol1: string;
  ConnoteVol2: string;
  ConnoteVol3: string;
  ConnoteVolWeight: string;
  ConnoteWeight: string;
  CreateBy: string;
  CreateTime: string;
  DownLoadTime: string;
  ID: string;
  ModiBy: string;
  UpdateTime: string;
  DataFromInput: IPostAwb[]
}

export interface ICityOrigin{
  REC_ID: string,
  POST_CODE: string,
  PROPINSI: string,
  KOTA: string,
  KECAMATAN: string,
  KELURAHAN: string,
  COUNTRY_INITIAL: string,
  CITY_CODE: string,
  SERVICE_CENTER: string,
  JENIS: string,
  ZONA: string,
  GRUP: string,
  GRUP_KEY: string,
  SLA: string,
  KDPOS_M7: string,
  CITYCODE_PLIS: string,
  KDPOS_PLIS: string,
  REGION: string
}

export interface IPostAwb {
  nomor: string;
  asal: string;
  tanggalInpt: string;
  catatan: string;
  temp_key: string;
  noawb: string;
}

export interface Window {
  $cordovaBarcodeScanner: any; // Adjust the type accordingly
}