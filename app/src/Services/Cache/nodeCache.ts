import NodeCache from "node-cache";

export interface CacheItem {
  key: string;
  val: any;
}

const nodeCache = new NodeCache();

export const setItems = (items: CacheItem[]) => {
  nodeCache.mset(items);
};

export const getItem = (key: string): any | undefined => {
  return nodeCache.get(key);
};
