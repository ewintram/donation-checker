import NodeCache from "node-cache";

export interface CacheItem {
  key: string;
  val: unknown;
}

const nodeCache = new NodeCache();

export const setItems = (items: CacheItem[]) => {
  nodeCache.mset(items);
};

export const getItem = (key: string): unknown | undefined => {
  return nodeCache.get(key);
};
