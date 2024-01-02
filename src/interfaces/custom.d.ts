interface Window {
  $cordovaBarcodeScanner: any; // Adjust the type accordingly
}

interface MyDatabase extends Dexie {
  version: any;
  cityOrigin: Dexie.Table<CityOrigin, number>;
}

interface CityOrigin {
  id: number;
  name: string;
  // Add any other properties you have in your CityOrigin object
}

