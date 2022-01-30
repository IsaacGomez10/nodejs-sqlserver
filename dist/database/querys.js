"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.queries = void 0;
var queries = {
  getAllProducts: 'select * from products',
  addNewProduct: 'insert into products (nombre,descripcion,cantidad) values (@nombre,@descripcion,@cantidad)',
  getProductById: 'select * from products where Id = @Id',
  deleteProduct: 'delete from products where Id = @Id',
  getTotalProducts: 'select count(*) from products',
  updateProductById: 'update products set nombre = @nombre, descripcion = @descripcion, cantidad = @cantidad where id = @id'
};
exports.queries = queries;