import endPoints from './endpoints'
import { ICommonResponse, IPage, ITimezone } from './interface/common'
import { IMeetListPayload, IMeetListResponse } from './interface/dashboard'
import { IPlan } from './interface/room-resource'

import request from './request'
import requestpost from './requestpost'



export async function createTableCity(data: any): Promise<any> {
    const request = indexedDB.open('myDatabase')

    request.onupgradeneeded = function(event) {
        const db = (event.target as IDBRequest).result
        db.createObjectStore('CityOrigin', { keyPath: 'id' });
    };
    request.onsuccess = async function(event) {
        const db = (event.target as IDBRequest).result;
        const transaction = db.transaction('CityOrigin', 'readwrite');
        const objectStore = transaction.objectStore('CityOrigin');
        
        transaction.oncomplete = function() {
          console.info('Data saved successfully.');
        };
  
        transaction.onerror = function(event: any) {
          console.error('Error saving data: ' + event.target.error.message);
        };
  
        for (const item of data) {
            

            // Use 'REC_ID' as the key for the object store
            item.id = item.REC_ID;
            objectStore.put(item);
        }
       
      };
    request.onerror = function(event) {
        console.error('Error opening database: ' + (event.target as IDBRequest));
    };
}