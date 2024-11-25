const express = require("express");
const morgan = require("morgan");
const database = require("./database");
const cors = require("cors");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { Server } = require("socket.io");
const http = require("http");
const app = express();
const nodemailer = require('nodemailer');
const verifyToken = require("./verify");
const { getconnection } = require("./database"); // Si el archivo se llama db.js
const path = require("path");



//config inicial

app.set("port", 4000);
app.listen(app.get("port"));
console.log("escuchando al puerto :) " + app.get("port"));
app.use(express.static(path.join(__dirname, "../public")))
app.use(express.static(path.join(__dirname, "../uploads")))
//multer
const multer = require("multer");
app.use(express.urlencoded({ extended: true}))


//Socket

const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: "*", // Ajusta según sea necesario
  },
});


io.on("connection", (socket) => {
  console.log("Cliente conectado al WebSocket.");

  // Puedes manejar eventos personalizados aquí si es necesario
  socket.on("disconnect", () => {
    console.log("Cliente desconectado del WebSocket.");
  });
});

// Ejemplo: Exponer la instancia de WebSocket para usarla en tus rutas


app.set("socketio", io);

//mail
const transporter = nodemailer.createTransport({
  service: "gmail",               // true for 465, false for other ports
     auth: {
          user: 're.fast.noti@gmail.com',
          pass: 'bddh ajig dswa aizg',
       },
  secure: true,
  });



// Importa y usa las rutas


// Configuración de almacenamiento con multer
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/"); // La carpeta donde se guardarán los archivos
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname)); // Usamos el timestamp para evitar conflictos de nombre
  },
});

// Crear el middleware para manejar la carga de un solo archivo
const upload = multer({ storage: storage });

//middlewares
app.use(morgan("dev"));
app.use(cors());
app.use(express.json()); // Para parsear JSON

// Middleware de autenticación y verificación de rol
function verificarAdmin(req, res, next) {
  const token = req.headers["authorization"];

  if (!token) {
    return res.status(403).send({ message: "Token no proporcionado." });
  }

  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) {
      return res.status(500).send({ message: "Error al verificar el token." });
    }

    if (decoded.role !== "admin") {
      return res
        .status(403)
        .send({
          message:
            "No autorizado. Solo los administradores pueden realizar esta acción.",
        });
    }

    req.userId = decoded.id;
    next();
  });
}

//rutas
app.get("/ping", async (req, res) => {
  const connection = await database.getconnection();
  connection.query("SELECT 1", (error, results) => {
    if (error) {
      console.error("Error al hacer ping a la base de datos:", error);
      return res
        .status(500)
        .send({ message: "Error al hacer ping a la base de datos." });
    }
    res.send({ message: "Pong!", results });
  });
});

app.get("/getUser", verifyToken, async (req, res) => {
  const token = req.header("Authorization")?.split(" ")[1];
  let algo = jwt.decode(token, "secretkey");
  res.json(algo);
});

app.get("/usuarios", async (req, res) => {
  const connection = await database.getconnection();
  connection.query("CALL sp_leer_usuarios()", (error, results) => {
    if (error) {
      console.error("Error al obtener usuarios:", error);
      return res.status(500).send({ message: "Error al obtener usuarios." });
    }
    res.send(results[0]); // Asegúrate de que esta ruta esté activa
  });
});

//PRODUCTOS

app.get("/menu", async (req, res) => {
  const connection = await database.getconnection();
  const result = await connection.query("call sp_leer_productos()");
  console.log(result);
});

/*app.get("/producto/:id", async (req, res) =>{
   const productId = req.params.id;
   const connection = await database.getconnection();
   const result = await connection.query("SELECT * from producto where id=;");
   console.log(result); 
} )*/
app.get("/productos", async (req, res) => {
  const connection = await database.getconnection();
  let categorias = []
  let productosCategorias = []

  connection.query("CALL sp_leer_productos_categorias();", (error,results)=>{
    if (error) {
      console.error("Error al obtener productos:", error);
      return res.status(500).send({ message: "Error al obtener productos." });
    }
    productosCategorias = results[0]
  })
  connection.query("CALL sp_leer_categorias();", (error,results)=>{
    if (error) {
      console.error("Error al obtener categorias:", error);
      return res.status(500).send({ message: "Error al obtener las categorias." });
    }
    categorias = results[0]
  })
  connection.query("CALL sp_leer_productos()", (error, results) => {
    if (error) {
      console.error("Error al obtener productos:", error);
      return res.status(500).send({ message: "Error al obtener productos." });
    }

    results[0].map(p=>{
      let productoC = productosCategorias.find(e => e.id_producto === p.id)
      if (!productoC){
        console.warn(`!- ${p.id} no pertenece a la tabla productos - categoria -!`)
        return p;
      }
      
      let categoria = categorias.find(e => productoC.id_categoria === e.id)
      p.id_categoria = categoria.id
      p.categoria = categoria.nombre
    })




    res.send(results[0]); // Deberías devolver los productos aquí
  });
});

app.get("/categorias", async (req, res) => {
  const connection = await database.getconnection();
  connection.query("CALL sp_leer_categorias();", (error, results) => {
    if (error) {
      console.error("Error en /categorias");
      return res.status(500).send({ message: "Error al obtener categorias." });
    }
    res.send(results[0]);
  });
});
app.get("/productos/categoria/:id", async (req, res) => {
  const categoriaId = req.params.id;
  console.log(categoriaId);
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
      res.setHeader("Cache-Control", "no-store");
      res.json(results);
    });
  } catch (error) {
    console.error("Error al obtener la conexión:", error);
    res.status(500).send("Error en la conexión con la base de datos");
  }
});
/* app.delete("/producto/:id", async (req, res) => {
  const productId = req.params.id;
  const connection = await getconnection();

  // Validamos si el ID del producto es un número válido
  if (isNaN(productId) || productId <= 0) {
    return res.status(400).send({ message: "ID del producto inválido." });
  }

  // Primero eliminamos los registros de producto_categoria que están asociados al producto
  connection.query(
    "DELETE FROM producto_categoria WHERE id_producto = ?",
    [productId],
    (error, results) => {
      if (error) {
        console.error(
          "Error al eliminar los registros de producto_categoria:",
          error
        );
        return res
          .status(500)
          .send({ message: "Error al eliminar las relaciones de categoría." });
      }

      // Ahora, eliminamos el producto
      connection.query(
        "DELETE FROM producto WHERE id = ?",
        [productId],
        (error, results) => {
          if (error) {
            console.error("Error al eliminar el producto:", error);
            return res
              .status(500)
              .send({ message: "Error al eliminar el producto." });
          }

          if (results.affectedRows === 0) {
            return res.status(404).send({ message: "Producto no encontrado." });
          }

          res.send({ message: "Producto eliminado correctamente." });
        }
      );
    }
  );
}); */

app.delete('/producto/:id', async (req, res) => {
    const productId = req.params.id;

    try {
      const connection = await getconnection();

         connection.execute('DELETE FROM pedido_producto WHERE id_producto = ?', [productId]);
         connection.execute('DELETE FROM producto WHERE id = ?', [productId]);
        res.status(200).send({ message: 'Producto eliminado correctamente' });
    } catch (error) {
        console.error('Error al eliminar el producto:', error);
        res.status(500).send({ error: 'Error al eliminar el producto' });
    }
});

app.put("/producto/:id", async (req, res) => {
  const productId = req.params.id; // Obtener el ID del producto
  const { nombre, descripcion, precio, cantidad_stock } = req.body; // Obtener los datos del cuerpo de la solicitud

  const connection = await getconnection(); // Obtener conexión a la base de datos

  // Consulta para actualizar el producto
  const query =
    "UPDATE producto SET nombre = ?, precio = ?, cantidad_stock = ?, descripcion = ? WHERE id = ?";

  // Ejecutar la consulta con los valores proporcionados
  connection.query(
    query,
    [nombre, precio, cantidad_stock, descripcion, productId],
    (error, results) => {
      if (error) {
        console.error("Error al ejecutar la consulta:", error); // Imprimir el error en consola para mayor detalle
        return res
          .status(500)
          .send({ message: "Error al actualizar el producto." });
      }

      if (results.affectedRows === 0) {
        return res.status(404).send({ message: "Producto no encontrado." });
      }

      res.send({ message: "Producto actualizado correctamente." });
    }
  );
});

app.post("/producto", upload.single("imagen"), async (req, res) => {
  console.log("Solicitud POST recibida en /producto");
  console.log("req.body:", req.body);
  console.log("req.file:", req.file);

  try {
    const { nombre, categoria_id, cantidad, precio, descripcion } = req.body;
    const imagen = req.file;

    if (
      !nombre ||
      !cantidad ||
      !precio ||
      !descripcion ||
      !imagen ||
      !categoria_id
    ) {
      return res
        .status(400)
        .json({ message: "Todos los campos son obligatorios." });
    }

    const categoria_id_num = parseInt(categoria_id);

    if (isNaN(categoria_id_num)) {
      return res.status(400).json({ message: "ID de categoría inválido." });
    }

    const cantidad_num = parseInt(cantidad);
    const precio_num = parseFloat(precio);

    if (isNaN(cantidad_num) || isNaN(precio_num)) {
      return res.status(400).json({ message: "Cantidad o precio no válidos." });
    }

    // Conectar a la base de datos
    const connection = await database.getconnection();

    // Insertar el producto en la tabla producto
    const query = `INSERT INTO producto (nombre, cantidad_stock, precio, descripcion, imagen) VALUES (?, ?, ?, ?, ?)`;
    connection.query(
      query,
      [nombre, cantidad_num, precio_num, descripcion, imagen.filename],
      (error, results) => {
        if (error) {
          console.error("Error al agregar el producto:", error);
          return res
            .status(500)
            .json({ message: "Error al agregar el producto." });
        }

        // Obtener el ID del producto insertado
        const producto_id = results.insertId;

        // Ahora, asociar el producto con la categoría en la tabla producto_categoria
        const queryCategoria = `CALL sp_crear_producto_categoria(?, ?)`;
        connection.query(
          queryCategoria,
          [producto_id, categoria_id_num],
          (error) => {
            if (error) {
              console.error(
                "Error al asociar el producto con la categoría:",
                error
              );
              return res
                .status(500)
                .json({
                  message: "Error al asociar el producto con la categoría.",
                });
            }

            res
              .status(201)
              .json({
                message:
                  "Producto agregado exitosamente y asociado a la categoría.",
                productoId: producto_id,
              });
          }
        );
      }
    );
  } catch (error) {
    console.error("Error en el servidor:", error);
    res.status(500).json({ message: "Error interno del servidor." });
  }
});

//PERFIL

app.post("/usuario", async (req, res) => {
  const { nombre, contrasena, email } = req.body;
  const idrol = 4;

  if (!nombre || !contrasena || !email) {
    return res
      .status(400)
      .send({ message: "Todos los campos son requeridos." });
  }

  try {
    console.log(contrasena);
    const hashedPassword = await bcrypt.hash(contrasena, 10); // Cifrar la contraseña96
    console.log(hashedPassword);
    const connection = await database.getconnection(); // Obtén la conexión
    const [result] = await connection
      .promise()
      .query("INSERT INTO usuario (nombre, contrasena, rol, email) VALUES(?, ?, ?, ?)", [
        nombre,
        hashedPassword,
        idrol,
        email,
      ]);
      console.log(result.insertId)
    const token = jwt.sign(
      { id: result.insertId, nombre: nombre, rol: idrol },
      "secretkey"
    );
    res.status(200).json({ token ,nombre: nombre, rol: idrol });

  } catch (error) {
    console.error("Error al crear usuario:", error);
    res.status(500).send({ message: "Error al crear el usuario." });
  }
});

app.get("/hola", async (req, res) => {
  let code = "1234";
  let hashed = await bcrypt.hash(code, 10);
  let result = await bcrypt.compare("1234", hashed);
  console.log(result);

  res.send("gai");
});

app.post("/login", async (req, res) => {
  const { email, contrasena } = req.body;
  if (!email || !contrasena) {
    return res
      .status(400)
      .send({ message: "Correo y contraseña son requeridos." });
  }

  try {
    const connection = await database.getconnection();
    const [rows] = await connection
      .promise()
      .query(
        "SELECT id, rol ,nombre, contrasena FROM usuario WHERE email = ?",
        [email]
      );

    if (rows.length === 0) {
      return res
        .status(401)
        .send({ message: "Correo o contraseña incorrectos." });
    }

    const usuario = rows[0];

    let contrasenaCorrecta = await bcrypt.compare(
      contrasena,
      usuario.contrasena
    );
    if (!contrasenaCorrecta) {
      return res
        .status(401)
        .send({ message: "Correo o contraseña incorrectos." });
    }
    const token = jwt.sign(
      { id: usuario.id, nombre: usuario.nombre, rol: usuario.rol },
      "secretkey"
    );
    console.log(usuario);

    res.status(200).json({ token, nombre: usuario.nombre, rol: usuario.rol });
  } catch (error) {
    console.error("Error al iniciar sesión:", error);
    res.status(500).send({ message: "Error en el servidor." });
  }
});

app.get("/usuario/:id", async (req, res) => {
  let connection;
  const usuarioId = req.params.id;
  try {
    connection = await database.getconnection();
    const query = "call sp_leer_usuario_por_id(?)";
    connection.query(query, [usuarioId], (error, results) => {
      if (results.length === 0) {
        return res.status(404).send({ message: "Usuario no encontrado." });
      }

      // Retornar la información del usuario
      res.status(200).send(results[0]);
    });
  } catch (error) {
    return res
      .status(500)
      .send({ message: "Error al recuperar el perfil del usuario." });
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
app.delete('/carrito/vaciar', verifyToken, async (req, res) => {
  console.log('Usuario autenticado:', req.user);

  let conn;
  try {
    conn = await database.getconnection(); // Crear la conexión en modo promesas
    await conn.execute('DELETE FROM pedido WHERE id_usuario = ?', [req.user.id]); // Usar execute en lugar de query

    res.status(200).send({ mensaje: 'Carrito vaciado correctamente.' });
  } catch (error) {
    console.error('Error al vaciar el carrito:', error);
    res.status(500).send({ mensaje: 'Error al vaciar el carrito.' });
  }
});

app.post("/pedido", async (req, res) => {
  let connection;
  const { usuario_id, precio, estadoId } = req.body;

  try {
    // Establecer conexión a la base de datos
    connection = await database.getConnection();

    // Llamar al procedimiento almacenado para crear un nuevo pedido
    const query = "CALL sp_crear_pedido(?, ?, ?)";
    connection.query(
      query,
      [usuario_id, precio, estadoId],
      (error, results) => {
        if (error) {
          console.error(error);
          return res.status(500).send({ message: "Error al crear el pedido." });
        }

        // Verificar si el procedimiento almacenado retornó un ID de pedido válido
        if (results.length === 0 || !results[0].pedido_id) {
          return res
            .status(400)
            .send({ message: "No se pudo crear el pedido." });
        }

        // Retornar la respuesta con el ID del pedido creado
        res.status(200).send({
          message: "Pedido creado exitosamente.",
          pedido_id: results[0].pedido_id,
        });
      }
    );
  } catch (error) {
    console.error(error);
    return res.status(500).send({ message: "Error al procesar la solicitud." });
  } finally {
    if (connection) connection.release();
  }
});
app.post("/pedido/confirmarPedido", async (req, res) => {
  const { usuario_id, productos } = req.body;
  let precioTotal = 0
  productos.map(p=>{
    precioTotal += p.precio*p.cantidad
  })
  console.log(precioTotal)
  
  // Validación de los datos recibidos
  if (!usuario_id || !productos || productos.length === 0) {
    return res
      .status(400)
      .send({ message: "Datos incompletos para confirmar el pedido" });
  }

  try {
    // Insertar el pedido en la tabla `pedido`
        connection = await database.getconnection();

    const queryPedido =
      "INSERT INTO pedido (id_usuario, fecha, precio_total, id_estado) VALUES (?, NOW(), ?, ?)";
    connection.query(queryPedido, [usuario_id, precioTotal, 2], (err, result) => {
      if (err) {
        console.error("Error al insertar el pedido:", err);
        return res.status(500).send({ message: "Error al guardar el pedido" });
      }

      const pedidoId = result.insertId; // ID del pedido recién insertado

      // Insertar los productos en la tabla `pedido_producto`
      const queryProductos =
        "INSERT INTO pedido_producto (id_pedido, id_producto, cantidad) VALUES ?";
      const valoresProductos = productos.map((producto) => [
        pedidoId,
        producto.id,
        producto.cantidad,
      ]);

      connection.query(queryProductos, [valoresProductos], (err) => {
        if (err) {
          console.error("Error al insertar productos en el pedido:", err);
          return res
            .status(500)
            .send({ message: "Error al guardar los productos" });
        }

        res
          .status(200)
          .send({ message: "Pedido confirmado con éxito", pedidoId });
      });
    });
  } catch (error) {
    console.error("Error inesperado:", error);
    res.status(500).send({ message: "Error al confirmar el pedido" });
  }
});
//obtener carrito
app.get("/pedidos", async (req, res) => {
  const query = `
    SELECT 
      p.id AS pedido_id,
      p.fecha, 
      p.precio_total, 
      ep.nombre AS estado_nombre,  -- Nombre del estado desde la tabla 'estado_pedido'
      pr.id AS producto_id, 
      pr.nombre AS producto_nombre, 
      pr.precio, 
      pp.cantidad
    FROM pedido p
    JOIN pedido_producto pp ON p.id = pp.id_pedido
    JOIN producto pr ON pp.id_producto = pr.id
    JOIN estado_pedido ep ON p.id_estado = ep.id;  -- Unimos con la tabla 'estado_pedido'
  `;

  try {
    const connection = await database.getconnection();
    connection.query(query, (error, results) => {
      if (error) {
        console.error("Error en la consulta SQL: ", error);
        return res.status(500).send({ message: "Error al recuperar los pedidos." });
      }

      if (results.length === 0) {
        return res.status(404).send({ message: "No hay pedidos disponibles." });
      }

      // Crear un objeto para agrupar los pedidos
      const pedidos = {};

      results.forEach((row) => {
        // Si el pedido aún no está en el objeto, lo creamos
        if (!pedidos[row.pedido_id]) {
          pedidos[row.pedido_id] = {
            pedido_id: row.pedido_id,
            fecha: row.fecha,
            precio_total: row.precio_total,
            estado_nombre: row.estado_nombre,
            productos: [],
          };
        }

        // Agregar el producto a la lista de productos del pedido
        pedidos[row.pedido_id].productos.push({
          producto_id: row.producto_id,
          producto_nombre: row.producto_nombre,
          precio: row.precio,
          cantidad: row.cantidad,
        });
      });

      // Convertir el objeto de pedidos a un array
      const pedidosArray = Object.values(pedidos);
      console.log(pedidosArray)

      res.status(200).send(pedidosArray);
    });
  } catch (err) {
    console.error("Error al obtener la conexión o ejecutar la consulta:", err);
    res.status(500).send({ message: "Error al obtener los pedidos.", error: err });
  }
});


// pedido por ID
app.get("/pedido/:id", (req, res) => {
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
      return res
        .status(500)
        .send({ message: "Error al recuperar el carrito de compras." });
    }

    if (results.length === 0) {
      return res
        .status(404)
        .send({ message: "Carrito no encontrado o está vacío." });
    }

    // Retornar los detalles del carrito y sus productos
    res.status(200).send(results);
  });
});

//agregar producto
app.post("/pedido/:id/producto", (req, res) => {
  const carritoId = req.params.id;
  const { productoId, cantidad } = req.body;

  // Primero, verifica si el producto ya está en el pedido
  const checkQuery = `
    SELECT cantidad FROM carrito_productos 
    WHERE carrito_id = ? AND producto_id = ?`;

  connection.query(checkQuery, [carritoId, productoId], (error, results) => {
    if (error) {
      return res
        .status(500)
        .send({ message: "Error al verificar el producto en el carrito." });
    }

    if (results.length > 0) {
      // Si el producto ya está en el carrito, incrementa su cantidad
      const newCantidad = results[0].cantidad + cantidad;
      const updateQuery = `
        UPDATE carrito_productos 
        SET cantidad = ? 
        WHERE carrito_id = ? AND producto_id = ?`;

      connection.query(
        updateQuery,
        [newCantidad, carritoId, productoId],
        (error) => {
          if (error) {
            return res
              .status(500)
              .send({
                message: "Error al actualizar la cantidad del producto.",
              });
          }
          return res
            .status(200)
            .send({ message: "Producto actualizado en el carrito." });
        }
      );
    } else {
      // Si el producto no está en el carrito, agrégalo
      const insertQuery = `
        INSERT INTO carrito_productos (carrito_id, producto_id, cantidad) 
        VALUES (?, ?, ?)`;

      connection.query(
        insertQuery,
        [carritoId, productoId, cantidad],
        (error) => {
          if (error) {
            return res
              .status(500)
              .send({ message: "Error al agregar el producto al carrito." });
          }
          return res
            .status(200)
            .send({ message: "Producto agregado al carrito." });
        }
      );
    }
  });
});

//eliminar producto terminar**************************************************************************
app.delete("/pedido/:id", async (req, res) => {
  const pedidoId = req.params.id;

  const connection = await database.getconnection();

  try {
    const queryUsuario = `SELECT id_usuario FROM pedido WHERE id = ?`;

    connection.query(queryUsuario, [pedidoId], (error, results) => {
      if (error) {
        console.error("Error al obtener el usuario del pedido:", error);
        return res.status(500).send({ message: "Error al obtener el usuario del pedido." });
      }

      if (results.length === 0) {
        console.error("Pedido no encontrado.");
        return res.status(404).send({ message: "Pedido no encontrado." });
      }

      const usuarioId = results[0].id_usuario;
      const queryMail = `SELECT email FROM usuario WHERE id = ?`;

      connection.query(queryMail, [usuarioId], (error, results) => {
        if (error) {
          console.error("Error al obtener el usuario del pedido:", error);
          return res.status(500).send({ message: "Error al obtener el usuario del pedido." });
        }
  
        if (results.length === 0) {
          console.error("Pedido no encontrado.");
          return res.status(404).send({ message: "Pedido no encontrado." });
        }
        const email = results[0].email;

    const query = `CALL sp_eliminar_pedido(?)`;

    connection.query(query, [pedidoId], (error, results) =>{
      if (error) {
        console.error("Error al obtener el usuario del pedido:", error);
        return res.status(500).send({ message: "Error al obtener el usuario del pedido." });
      }
  
      const htmlContent = `
      <h1>Pedido Cancelado</h1>
      <p>Tu pedido con ID <b>${pedidoId}</b> ha sido cancelado.</p>

    `;
    

    
          const mailOptions = {
            from: 're.fast.noti@gmail.com',
            to: email,
            subject: 'Pedido cancelado',
            html: htmlContent,
            
          };
          transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
              console.log(error);
            } else {
              console.log('Correo enviado: ' + info.response);
            }
          });
    
        res.status(200).send({ success: true, message: "Pedido eliminado correctamente." });
      
      });
    });
    });  } catch (error) {
    console.error("Error al eliminar el pedido:", error);
    res.status(500).send({ message: "Error al eliminar el pedido." });
  }
});


//PEDIDO

//Método Obtener pedidos

//Método obtener productos de un pedido ***********************************************************************
/* app.put("/pedido/cancelar/:id", async (req, res) => {
  const pedidoId = req.params.id;

  // Paso 1: Obtener el usuario_id del pedido
  const obtenerUsuarioQuery = "SELECT usuario_id FROM pedido WHERE id = ?";
  
  // Ejecutamos la consulta para obtener el usuario_id del pedido
  connection.query(obtenerUsuarioQuery, [pedidoId], (error, results) => {
    if (error) {
      console.error("Error al obtener el usuario del pedido:", error);
      return res.status(500).send({ message: "Error al obtener el usuario del pedido." });
    }

    if (results.length === 0) {
      return res.status(404).send({ message: "Pedido no encontrado." });
    }

    const usuarioId = results[0].usuario_id;  // Usuario asociado al pedido

    // Paso 2: Actualizar el estado del pedido a "cancelado"
    const queryActualizarEstado = "CALL sp_eliminar_estado_pedido(?, 'cancelado')";
    connection.query(queryActualizarEstado, [pedidoId], (error, results) => {
      if (error) {
        console.error("Error al actualizar el estado del pedido:", error);
        return res.status(500).send({ message: "Error al actualizar el estado del pedido." });
      }

      if (results[0][0].affectedRows > 0) {
        // Paso 3: Notificar al usuario mediante WebSockets
        const mensajeNotificacion = `Tu pedido con ID: ${pedidoId} ha sido cancelado.`;

        // Emitir la notificación al cliente usando WebSockets (socket.io)

        // Responder con éxito
        return res.status(200).send({ message: "Pedido cancelado y notificación enviada.", notificacion: mensajeNotificacion });
      } else {
        return res.status(404).send({ message: "No se pudo actualizar el estado del pedido." });
      }
    });
  });
});
   */




//obtener pedido por id **************************************************************************************************************

app.get("/pedido/:id", (req, res) => {
  const pedidoId = req.params.id;

  // Consulta para obtener el pedido por su ID
  const query = `
    SELECT id, usuario_id, estado, fecha, precio
    FROM pedidos
    WHERE id = ?`;

  connection.query(query, [pedidoId], (error, results) => {
    if (error) {
      return res.status(500).send({ message: "Error al obtener el pedido." });
    }

    if (results.length === 0) {
      return res.status(404).send({ message: "Pedido no encontrado." });
    }

    // Retornar el objeto pedido
    res.status(200).send(results[0]);
  });
});

//actualizar estado de un pedido

// Actualizar estado de un pedido (Confirmar, Completar, Cancelar)
app.put("/pedido/:id/estado", async (req, res) => {
  const pedidoId = req.params.id;
  const { estado } = req.body;
  const connection = await database.getconnection();

  const estadosValidos = ["completado", "cancelado"];
  if (!estadosValidos.includes(estado)) {
    return res.status(400).send({ message: "Estado no válido." });
  }

  try {
    // Consulta para obtener el correo del usuario directamente
    const queryCorreo = `
      SELECT u.email 
      FROM pedido p 
      JOIN usuario u ON p.id_usuario = u.id 
      WHERE p.id = ?;
    `;

    connection.query(queryCorreo, [pedidoId], (error, results) => {
      if (error) {
        console.error("Error al obtener el correo del usuario:", error);
        return res.status(500).send({ message: "Error al obtener el correo del usuario." });
      }

      if (results.length === 0) {
        console.error("Pedido no encontrado.");
        return res.status(404).send({ message: "Pedido no encontrado." });
      }

      const email = results[0].email;

      // Actualizar el estado del pedido
      const queryActualizar = `CALL sp_actualizar_estado_pedido(?, ?)`;
      connection.query(queryActualizar, [estado, pedidoId], (error) => {
        if (error) {
          console.error("Error al actualizar el estado del pedido:", error);
          return res.status(500).send({ message: "Error al actualizar el estado del pedido." });
        }

        // Enviar correo de notificación
        const htmlContent = `
          <h1>Pedido ${estado === "completado" ? "Confirmado" : "Cancelado"}</h1>
          <p>Tu pedido con ID <b>${pedidoId}</b> ha sido ${estado}.</p>
        `;
        const mailOptions = {
          from: "re.fast.noti@gmail.com",
          to: email,
          subject: `Pedido ${estado}`,
          html: htmlContent,
        };

        transporter.sendMail(mailOptions, (error, info) => {
          if (error) {
            console.error("Error al enviar el correo:", error);
          } else {
            console.log("Correo enviado: " + info.response);
          }
        });

        res.status(200).send({
          message: `Estado del pedido actualizado a ${estado}.`,
          notificacion: `Tu pedido con ID: ${pedidoId} ha sido ${estado}.`,
        });
      });
    });
  } catch (error) {
    console.error("Error:", error);
    res.status(500).send({ message: "Error interno del servidor." });
  }
});


//eliminar un pedido

//SE ELIMINO TODO MENU DEL DIA POR SER CATEGORIA,NO TABLA, INNECESARIA TABLA
