import { ProductDetail } from '../product/product.types';
import { WarehouseDetail } from '../warehouse/warehouse.types';

export interface StockDetail {
  id: number;
  product: ProductDetail;
  warehouse: WarehouseDetail;
  quantity: number;
  lastUpdatedAt: string; 
}

export interface CreateStockRequest
{
  productId: number
  warehouseId: number
  quantity: number
}

export interface UpdateStockRequest
{
  productId?: number
  warehouseId?: number
  quantity?: number
}

export interface UpdateStockBulkRequest
{
  id: number,
  productId?: number
  warehouseId?: number
  quantity?: number
}
