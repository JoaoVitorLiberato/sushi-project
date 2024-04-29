interface cacheStoreInterface {
  cache: {
    [key:string]:unknown;
  };
  overdrawerMenu: boolean;
  cepValidation: string,
}

export {
  cacheStoreInterface,
}
