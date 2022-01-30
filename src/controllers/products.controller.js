import { VarChar } from 'mssql';
import { getConnection, sql, queries } from '../database';

export const getProducts = async (req, res) => {
    try {
        const pool = await getConnection();
        const result = await pool.request().query(queries.getAllProducts);
        res.json(result.recordset);
    } catch (error) {
        res.status(500);
        res.send(error.message);
    }

};

export const createNewProduct = async (req, res) => {

    const { Nombre, Descripcion } = req.body;
    let { Cantidad } = req.body;

    if (Nombre == null || Descripcion == null) {
        return res.status(400).json({ msg: 'Bad Request. Please Fill all fields' })
    }
    if (Cantidad == null) Cantidad = 0;

    try {
        const pool = await getConnection();

        await pool
            .request()
            .input('nombre', sql.VarChar, Nombre)
            .input('descripcion', sql.Text, Descripcion)
            .input('cantidad', sql.Int, Cantidad)
            .query(queries.addNewProduct);

        res.json("nombre,descripcion,cantidad");
    } catch (error) {
        res.status(500);
        res.send(error.message);
    }
};

export const getProductById = async (req, res) => {

    const { id } = req.params

    const pool = await getConnection();
    const result = await pool.request()
        .input('id', id)
        .query(queries.getProductById);

    res.send(result.recordset[0])

};

export const deleteProductById = async (req, res) => {

    const { id } = req.params;

    const pool = await getConnection();
    const result = await pool.request()
        .input('id', id)
        .query(queries.deleteProduct);

    res.send(result);

};

export const getTotalProducts = async (req, res) => {

    const pool = await getConnection();
    const result = await pool.request()
        .query(queries.getTotalProducts);


    res.json(result.recordset[0][''])

};

export const updateProduct = async (req, res) => {
    const { Nombre, Descripcion, Cantidad } = req.body;
    const { id } = req.params;

    if ((Nombre == null || Descripcion == null, Cantidad === null)) {
        return res.status(400).json({ msg: 'Bad Request. Please Fill all fields' });
    }

    const pool = await getConnection();
    await pool
        .request()
        .input('nombre', sql.VarChar, Nombre)
        .input('descripcion', sql.Text, Descripcion)
        .input('cantidad', sql.Int, Cantidad)
        .input('id',sql.Int, id)
        .query(queries.updateProductById);

    res.json({ Nombre, Descripcion, Cantidad });
};

