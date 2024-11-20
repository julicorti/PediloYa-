const express = require("express");
const morgan = require("morgan");
const database = require("./database");
const cors = require('cors');
const bcrypt = require('bcrypt');
const jwt = require("jsonwebtoken")
const verifyToken = require("./verify")
const { getconnection } = require('./database'); // Si el archivo se llama db.js


//config inicial
const app = express();
app.set("port", 4000);
app.listen(app.get("port"));
console.log("escuchando al puerto :) " + app.get("port"));



//middlewares
app.use(morgan("dev"));
app.use(cors());
app.use(express.json()); // Para parsear JSON


// Middleware de autenticación y verificación de rol
function verificarAdmin(req, res, next) {
  const token = req.headers['authorization'];

  if (!token) {
    return res.status(403).send({ message: 'Token no proporcionado.' });
  }

  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) {
      return res.status(500).send({ message: 'Error al verificar el token.' });
    }

    if (decoded.role !== 'admin') {
      return res.status(403).send({ message: 'No autorizado. Solo los administradores pueden realizar esta acción.' });
    }

    req.userId = decoded.id;
    next();
  });
}


//rutas
app.get('/ping', async (req, res) => {
  const connection = await database.getconnection();
  connection.query('SELECT 1', (error, results) => {
      if (error) {
          console.error('Error al hacer ping a la base de datos:', error);
          return res.status(500).send({ message: 'Error al hacer ping a la base de datos.' });
      }
      res.send({ message: 'Pong!', results });
  });
});

app.get('/getUser', verifyToken, async (req,res)=>{
  
  const token = req.header('Authorization')?.split(' ')[1]
  let algo = jwt.decode(token, "secretkey")
  res.json(algo);
})

app.get('/usuarios', async (req, res) => {
  const connection = await database.getconnection();
  connection.query('CALL sp_leer_usuarios()', (error, results) => {
      if (error) {
          console.error('Error al obtener usuarios:', error);
          return res.status(500).send({ message: 'Error al obtener usuarios.' });
      }
      res.send(results[0]); // Asegúrate de que esta ruta esté activa
  });
});

//PRODUCTOS

app.get("/menu", async (req, res) => {
  const connection = await database.getconnection();
  const result = await connection.query("call sp_leer_productos()");
  console.log(result);
})

/*app.get("/producto/:id", async (req, res) =>{
   const productId = req.params.id;
   const connection = await database.getconnection();
   const result = await connection.query("SELECT * from producto where id=;");
   console.log(result); 
} )*/
   app.get('/productos', async (req, res) => {
    const connection = await database.getconnection();
    connection.query('CALL sp_leer_productos()', (error, results) => {
      if (error) {
        console.error('Error al obtener productos:', error);
        return res.status(500).send({ message: 'Error al obtener productos.' });
      }
      res.send(results[0]); // Deberías devolver los productos aquí
    });
  });
   app.get('/productos/categoria/:id', async (req, res) => {
    const categoriaId = req.params.id;
    console.log(categoriaId)
    try {
        const connection = await getconnection();
        const query = `
            SELECT p.*
            FROM producto p
            JOIN producto_categoria pc ON p.id = pc.id_producto
            WHERE pc.id_categoria = ?;
        `;
        connection.execute(query, [categoriaId], (error, results) => {
            if (error) {
                console.error("Error al obtener productos por categoría:", error);
                res.status(500).send("Error al obtener productos");
                return;
            }
            
            // Evitar que los resultados sean cacheados
            res.setHeader('Cache-Control', 'no-store');
            res.json(results);
        });
    } catch (error) {
        console.error("Error al obtener la conexión:", error);
        res.status(500).send("Error en la conexión con la base de datos");
    }
});
app.delete('/producto/:id', async (req, res) => {
  const productId = req.params.id;
  const connection = await getconnection();

  // Validamos si el ID del producto es un número válido
  if (isNaN(productId) || productId <= 0) {
    return res.status(400).send({ message: 'ID del producto inválido.' });
  }

  // Primero eliminamos los registros de producto_categoria que están asociados al producto
  connection.query('DELETE FROM producto_categoria WHERE id_producto = ?', [productId], (error, results) => {
    if (error) {
      console.error('Error al eliminar los registros de producto_categoria:', error);
      return res.status(500).send({ message: 'Error al eliminar las relaciones de categoría.' });
    }

    // Ahora, eliminamos el producto
    connection.query('DELETE FROM producto WHERE id = ?', [productId], (error, results) => {
      if (error) {
        console.error('Error al eliminar el producto:', error);
        return res.status(500).send({ message: 'Error al eliminar el producto.' });
      }

      if (results.affectedRows === 0) {
        return res.status(404).send({ message: 'Producto no encontrado.' });
      }

      res.send({ message: 'Producto eliminado correctamente.' });
    });
  });
});

app.put('/producto/:id', verificarAdmin, (req, res) => {
  const productId = req.params.id;
  const { nombre, descripcion, precio, stock } = req.body;

  // Consulta para actualizar el producto
  const query = `call sp_actualizar_producto(?, ?, ?, ?, ?)`;

  connection.query(query, [productId, precio, nombre, stock, descripcion], (error, results) => {
    if (error) {
      return res.status(500).send({ message: 'Error al actualizar el producto.' });
    }

    if (results.affectedRows === 0) {
      return res.status(404).send({ message: 'Producto no encontrado.' });
    }

    res.send({ message: 'Producto actualizado correctamente.' });
  });
});

app.post('/producto', verificarAdmin, (req, res) => {
  const { nombre, fecha_ingreso, categoria, cantidad, precio, descripcion, imagen } = req.body;

  // Validar que todos los campos requeridos estén presentes
  if (!nombre || !fecha_ingreso || !categoria || !cantidad || !precio || !descripcion || !imagen) {
    return res.status(400).send({ message: 'Todos los campos son obligatorios.' });
  }

  // Consulta para insertar el nuevo producto
  const query = `call sp_crear_producto(?, ?, ?, ?, ?, ?, ?)`;

  connection.query(query, [nombre, fecha_ingreso, categoria, cantidad, precio, descripcion, imagen], (error, results) => {
    if (error) {
      return res.status(500).send({ message: 'Error al agregar el producto.' });
    }

    res.status(201).send({ message: 'Producto agregado exitosamente.', productoId: results.insertId });
  });
});

//PERFIL

app.post('/usuario', async (req, res) => {
  const { nombre, contrasena, email } = req.body;
  const idrol = 4;

  if (!nombre || !contrasena || !email) {
    return res.status(400).send({ message: 'Todos los campos son requeridos.' });
  }

  try {
    console.log(contrasena)
    const hashedPassword = await bcrypt.hash(contrasena, 10); // Cifrar la contraseña96
    console.log(hashedPassword)
    const connection = await database.getconnection(); // Obtén la conexión
    const [result] = await connection.promise().query(
      'CALL sp_agregar_usuario(?, ?, ?, ?)',
      [nombre, hashedPassword, idrol, email]
    );

    const token = jwt.sign({ userId: result.insertId }, 'secretkey');


    res.status(201).send({ message: 'Usuario creado exitosamente.', usuarioId: result.insertId });
  } catch (error) {
    console.error('Error al crear usuario:', error);
    res.status(500).send({ message: 'Error al crear el usuario.' });
  }
});

app.get("/hola", async (req,res)=>{
  console.log("Voy a codificar")
  let code = "1234"
  let hashed = await bcrypt.hash(code, 10)
  let result = await bcrypt.compare("1234", hashed)
  console.log(result)

  res.send("gai")
})

app.post('/login', async (req, res) => {
  const { email, contrasena } = req.body;
  if (!email || !contrasena) {
    return res.status(400).send({ message: 'Correo y contraseña son requeridos.' });
  }
  
  try {
    const connection = await database.getconnection();
    const [rows] = await connection.promise().query(
      'SELECT id, rol ,nombre, contrasena FROM usuario WHERE email = ?',
      [email]
    );
    
    if (rows.length === 0) {
      return res.status(401).send({ message: 'Correo o contraseña incorrectos.' });
    }
    
    const usuario = rows[0];
    
    let contrasenaCorrecta = await bcrypt.compare(contrasena, usuario.contrasena)
    if (!contrasenaCorrecta) {
      return res.status(401).send({ message: 'Correo o contraseña incorrectos.' });
    }
    const token = jwt.sign({ id: usuario.id, nombre: usuario.nombre, rol: usuario.rol }, 'secretkey');
    console.log(usuario)

    res.status(200).json({ token, nombre: usuario.nombre, rol: usuario.rol});
  } catch (error) {
    console.error('Error al iniciar sesión:', error);
    res.status(500).send({ message: 'Error en el servidor.' });
  }
});



app.get('/usuario/:id', async (req, res) => {
  let connection;
  const usuarioId = req.params.id;
  try {
    connection = await database.getconnection();
    const query = 'call sp_leer_usuario_por_id(?)';
    connection.query(query, [usuarioId], (error, results) => {
  
      if (results.length === 0) {
        return res.status(404).send({ message: 'Usuario no encontrado.' });
      }
  
      // Retornar la información del usuario
      res.status(200).send(results[0]);
    });
  } catch(error){
    return res.status(500).send({ message: 'Error al recuperar el perfil del usuario.' });
  }  
  // Consulta para seleccionar el usuario por su ID
  

  
});

//obtener perfil
/*app.get('/perfil/:id', (req, res) => {
  const usuarioId = req.params.id;

  // Consulta para obtener los detalles del perfil
  const query = `SELECT id, nombre, email, fecha_registro, direccion, telefono FROM usuarios WHERE id = ?`;

  connection.query(query, [usuarioId], (error, results) => {
    if (error) {
      return res.status(500).send({ message: 'Error al obtener el perfil del usuario.' });
    }

    if (results.length === 0) {
      return res.status(404).send({ message: 'Usuario no encontrado.' });
    }

    // Devolver el perfil del usuario
    res.status(200).send(results[0]);
  });
});
*/
//


//pedido
app.post('/pedido', async (req, res) => {
  let connection;
  const { usuario_id, precio, estadoId } = req.body;

  try {
    // Establecer conexión a la base de datos
    connection = await database.getConnection();

    // Llamar al procedimiento almacenado para crear un nuevo pedido
    const query = 'CALL sp_crear_pedido(?, ?, ?)';
    connection.query(query, [usuario_id, precio, estadoId], (error, results) => {
      if (error) {
        console.error(error);
        return res.status(500).send({ message: 'Error al crear el pedido.' });
      }

      // Verificar si el procedimiento almacenado retornó un ID de pedido válido
      if (results.length === 0 || !results[0].pedido_id) {
        return res.status(400).send({ message: 'No se pudo crear el pedido.' });
      }

      // Retornar la respuesta con el ID del pedido creado
      res.status(200).send({
        message: 'Pedido creado exitosamente.',
        pedido_id: results[0].pedido_id
      });
    });
  } catch (error) {
    console.error(error);
    return res.status(500).send({ message: 'Error al procesar la solicitud.' });
  } finally {
    if (connection) connection.release();
  }
});
app.post('/pedido/confirmarPedido', async (req, res) => {
  const { usuario_id, productos } = req.body;

  // Validación de los datos recibidos
  if (!usuario_id || !productos || productos.length === 0) {
    return res.status(400).send({ message: 'Datos incompletos para confirmar el pedido' });
  }

  try {
    // Insertar el pedido en la tabla `pedido`
    const queryPedido = 'INSERT INTO pedido (usuario_id, fecha) VALUES (?, NOW())';
    db.query(queryPedido, [usuario_id], (err, result) => {
      if (err) {
        console.error('Error al insertar el pedido:', err);
        return res.status(500).send({ message: 'Error al guardar el pedido' });
      }

      const pedidoId = result.insertId;  // ID del pedido recién insertado

      // Insertar los productos en la tabla `pedido_producto`
      const queryProductos = 'INSERT INTO pedido_producto (pedido_id, producto_id, cantidad) VALUES ?';
      const valoresProductos = productos.map(producto => [pedidoId, producto.id, producto.cantidad]);

      db.query(queryProductos, [valoresProductos], (err) => {
        if (err) {
          console.error('Error al insertar productos en el pedido:', err);
          return res.status(500).send({ message: 'Error al guardar los productos' });
        }

        res.status(200).send({ message: 'Pedido confirmado con éxito', pedidoId });
      });
    });
  } catch (error) {
    console.error('Error inesperado:', error);
    res.status(500).send({ message: 'Error al confirmar el pedido' });
  }
});
//obtener carrito
app.get('/carrito/:id', (req, res) => {
  const carritoId = req.params.id;

  // Consulta para obtener los detalles del carrito, incluyendo los productos
  const query = `
    SELECT p.id, p.nombre, p.categoria, p.precio, cp.cantidad, p.descripcion, p.imagen 
    FROM carrito_productos cp
    JOIN productos p ON cp.producto_id = p.id
    WHERE cp.carrito_id = ?`;

  connection.query(query, [carritoId], (error, results) => {
    if (error) {
      return res.status(500).send({ message: 'Error al recuperar el carrito de compras.' });
    }

    if (results.length === 0) {
      return res.status(404).send({ message: 'El carrito está vacío o no existe.' });
    }

    // Retornar los productos del carrito
    res.status(200).send(results);
  });
});

// pedido por ID
app.get('/pedido/:id', (req, res) => {
  const carritoId = req.params.id;

  // Consulta para obtener los detalles del carrito específico
  const query = `
    SELECT c.id AS carrito_id, c.fecha_creacion, p.id AS producto_id, p.nombre, p.categoria, p.precio, cp.cantidad, p.descripcion, p.imagen 
    FROM carritos c
    JOIN carrito_productos cp ON c.id = cp.carrito_id
    JOIN productos p ON cp.producto_id = p.id
    WHERE c.id = ?`;

  connection.query(query, [carritoId], (error, results) => {
    if (error) {
      return res.status(500).send({ message: 'Error al recuperar el carrito de compras.' });
    }

    if (results.length === 0) {
      return res.status(404).send({ message: 'Carrito no encontrado o está vacío.' });
    }

    // Retornar los detalles del carrito y sus productos
    res.status(200).send(results);
  });
});

//agregar producto
app.post('/pedido/:id/producto', (req, res) => {
  const carritoId = req.params.id;
  const { productoId, cantidad } = req.body;

  // Primero, verifica si el producto ya está en el pedido
  const checkQuery = `
    SELECT cantidad FROM carrito_productos 
    WHERE carrito_id = ? AND producto_id = ?`;

  connection.query(checkQuery, [carritoId, productoId], (error, results) => {
    if (error) {
      return res.status(500).send({ message: 'Error al verificar el producto en el carrito.' });
    }

    if (results.length > 0) {
      // Si el producto ya está en el carrito, incrementa su cantidad
      const newCantidad = results[0].cantidad + cantidad;
      const updateQuery = `
        UPDATE carrito_productos 
        SET cantidad = ? 
        WHERE carrito_id = ? AND producto_id = ?`;

      connection.query(updateQuery, [newCantidad, carritoId, productoId], (error) => {
        if (error) {
          return res.status(500).send({ message: 'Error al actualizar la cantidad del producto.' });
        }
        return res.status(200).send({ message: 'Producto actualizado en el carrito.' });
      });
    } else {
      // Si el producto no está en el carrito, agrégalo
      const insertQuery = `
        INSERT INTO carrito_productos (carrito_id, producto_id, cantidad) 
        VALUES (?, ?, ?)`;

      connection.query(insertQuery, [carritoId, productoId, cantidad], (error) => {
        if (error) {
          return res.status(500).send({ message: 'Error al agregar el producto al carrito.' });
        }
        return res.status(200).send({ message: 'Producto agregado al carrito.' });
      });
    }
  });
});

//eliminar producto terminar**************************************************************************
app.delete('/pedido/:id/producto/:productoId', (req, res) => {
  const carritoId = req.params.id;
  const productoId = req.params.productoId;

  // Consulta para eliminar el producto del carrito
  const deleteQuery = `call sp_eliminar_pedido_producto(?)`;

  connection.query(deleteQuery, [carritoId, productoId], (error, results) => {
    if (error) {
      return res.status(500).send({ message: 'Error al eliminar el producto del carrito.' });
    }

    if (results.affectedRows === 0) {
      return res.status(404).send({ message: 'Producto no encontrado en el carrito.' });
    }

    res.status(200).send({ message: 'Producto eliminado del carrito.' });
  });
});


//PEDIDO


//Método Obtener pedidos
app.get('/pedidos', (req, res) => {
  const cantidad = req.query.cantidad ? parseInt(req.query.cantidad) : 10; // Por defecto 10
  const estado = req.query.estado; // Opcional, para filtrar por estado
  const fecha = req.query.fecha; // Opcional, para filtrar por fecha

  // Construcción de la consulta SQL con los filtros opcionales
  let query = `call sp_leer_pedidos()`;
  const queryParams = [];

  if (estado || fecha) {
    query += ` WHERE`;
    if (estado) {
      query += ` estado = ?`;
      queryParams.push(estado);
    }
    if (fecha) {
      if (estado) query += ` AND`;
      query += ` fecha = ?`;
      queryParams.push(fecha);
    }
  }

  query += ` LIMIT ?`;
  queryParams.push(cantidad);

  connection.query(query, queryParams, (error, results) => {
    if (error) {
      return res.status(500).send({ message: 'Error al obtener los pedidos.' });
    }

    res.status(200).send(results);
  });
});

//Método obtener productos de un pedido ***********************************************************************

app.get('/pedido/:id/productos', (req, res) => {
  const pedidoId = req.params.id;

  // Consulta para obtener los productos de un pedido
  const query = `call sp_leer_pedidos_productos(?)`;

  connection.query(query, [pedidoId], (error, results) => {
    if (error) {
      return res.status(500).send({ message: 'Error al obtener los productos del pedido.' });
    }

    if (results.length === 0) {
      return res.status(404).send({ message: 'No se encontraron productos para este pedido.' });
    }

    // Retornar la lista de productos
    res.status(200).send(results);
  });
});

//obtener pedido por id **************************************************************************************************************

app.get('/pedido/:id', (req, res) => {
  const pedidoId = req.params.id;

  // Consulta para obtener el pedido por su ID
  const query = `
    SELECT id, usuario_id, estado, fecha, precio
    FROM pedidos
    WHERE id = ?`;

  connection.query(query, [pedidoId], (error, results) => {
    if (error) {
      return res.status(500).send({ message: 'Error al obtener el pedido.' });
    }

    if (results.length === 0) {
      return res.status(404).send({ message: 'Pedido no encontrado.' });
    }

    // Retornar el objeto pedido
    res.status(200).send(results[0]);
  });
});

//actualizar estado de un pedido

app.put('/pedido/:id/estado', (req, res) => {
  const pedidoId = req.params.id;
  const { estado } = req.body;

  // Verificar si el estado es válido
  const estadosValidos = ['pendiente', 'completado', 'cancelado'];
  if (!estadosValidos.includes(estado)) {
    return res.status(400).send({ message: 'Estado no válido' });
  }

  // Consulta para actualizar el estado del pedido
  const query = `call sp_actualizar_estado_pedido(?, ?)`;

  connection.query(query, [estado, pedidoId], (error, results) => {
    if (error) {
      return res.status(500).send({ message: 'Error al actualizar el estado del pedido.' });
    }

    if (results.affectedRows === 0) {
      return res.status(404).send({ message: 'Pedido no encontrado.' });
    }

    // Retornar éxito de la operación
    res.status(200).send({ success: true });
  });
});

//eliminar un pedido
app.delete('/pedido/:id', (req, res) => {
  const pedidoId = req.params.id;

  // Consulta para eliminar el pedido (productos relacionados se eliminan automáticamente gracias a ON DELETE CASCADE)
  const query = `call sp_eliminar_pedido(?)`;

  connection.query(query, [pedidoId], (error, results) => {
    if (error) {
      return res.status(500).send({ message: 'Error al eliminar el pedido.' });
    }

    if (results.affectedRows === 0) {
      return res.status(404).send({ message: 'Pedido no encontrado.' });
    }

    // Retornar éxito de la operación
    res.status(200).send({ success: true });
  });
});

//SE ELIMINO TODO MENU DEL DIA POR SER CATEGORIA,NO TABLA, INNECESARIA TABLA