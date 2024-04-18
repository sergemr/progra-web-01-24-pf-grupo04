const express = require("express");
const app = express();
const cors = require("cors");
const port = 3008;
const { Sequelize, DataTypes } = require("sequelize");

// JWT y bcrypt
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const secretKey = "unPasswordMegaSeguro0231948!";

app.use(express.json());
app.use(cors());

// Controlador para el browser
app.get("/api", (req, res) => {
  res.send("Servidor ACTIVO");
});

// Conecxion a Base De Datos
const sequelize = new Sequelize({
  dialect: "mysql",
  host: "localhost",
  username: "root",
  password: "516938",
  database: "proyecto_prograweb",
});

// Clase entidad para la creacion de las tablas
class Entity {
  constructor(name, fields) {
    this.name = name;
    this.model = sequelize.define(name, fields);
  }

  async sync() {
    await this.model.sync({ force: true });
    console.log(`Table for ${this.name} synchronized`);
  }
}

// Esquema para la tabla de entidad Usuario
const usuarioSchema = {
  usuario_Id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false,
  },
  usuario_Nombre: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: false,
  },
  usuario_Apellido: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: false,
  },
  usuario_Email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  usuario_Telefono: {
    type: DataTypes.INTEGER,
    allowNull: false,
    unique: true,
  },
  usuario_Password: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: false,
  },
};

// Crea la entidad Usuario
const Usuario = new Entity("Usuario", usuarioSchema);

// Sincroniza la Base de Datos
const syncronizeDB = () => {
  sequelize
    .sync()
    .then(async () => {
      await Usuario.sync();
    })
    .catch((error) => {
      console.error("Error synchronizing database:", error);
    });
};

//syncronizeDB(); /*Llama la sincronizacion con la base de datos*/

// Ruta para registrar un nuevo usuario
app.post("/register", async (req, res) => {
  try {
    const {
      usuario_Nombre,
      usuario_Apellido,
      usuario_Email,
      usuario_Telefono,
      usuario_Password,
    } = req.body;

    // Hash de la contraseña
    const hashedPassword = await bcrypt.hash(usuario_Password, 10);

    // Crea el usuario en la base de datos
    const usuario = await Usuario.model.create({
      usuario_Nombre,
      usuario_Apellido,
      usuario_Email,
      usuario_Telefono,
      usuario_Password: hashedPassword,
    });

    res.status(201).json({ message: "Usuario creado", usuario });
  } catch (error) {
    console.error("Error creando usuario:", error);
    res.status(500).json({ error: "Error interno del servidor" });
  }
});

// Ruta para iniciar sesión
app.post("/login", async (req, res) => {
  try {
    const { usuario_Email, usuario_Password } = req.body;

    // Busca el usuario por su email
    const usuario = await Usuario.model.findOne({
      where: {
        usuario_Email: usuario_Email,
      },
    });

    if (!usuario) {
      return res.status(401).json({ error: "Credenciales inválidas" });
    }

    // Comprueba la contraseña
    const isValidPassword = await bcrypt.compare(
      usuario_Password,
      usuario.usuario_Password
    );

    if (!isValidPassword) {
      return res.status(401).json({ error: "Credenciales inválidas" });
    }
    // Genera un token JWT
    const token = jwt.sign(
      { usuario_Id: usuario.usuario_Id },
      secretKey,
      { expiresIn: "1h" } // Caduca en 1 hora
    );

    res.status(200).json({ message: "Inicio de sesión exitoso", token });
  } catch (error) {
    console.error("Error autenticando usuario:", error);
    res.status(500).json({ error: "Error interno del servidor" });
  }
});

// Ruta protegida que requiere un token válido
app.get("/users", verifyToken, async (req, res) => {
  try {
    const users = await Usuario.model.findAll();
    res.status(200).json(users);
  } catch (error) {
    console.error("Error obteniendo usuarios:", error);
    res.status(500).json({ error: "Error interno del servidor" });
  }
});

// Middleware para verificar el token
function verifyToken(req, res, next) {
  const token = req.headers.authorization;

  if (!token) {
    return res.status(401).json({ error: "No se proporcionó un token" });
  }

  jwt.verify(token, secretKey, (err, decoded) => {
    if (err) {
      return res.status(401).json({ error: "Token inválido" });
    }
    req.userId = decoded.usuario_Id;
    next();
  });
}

// Escucha en el puerto configurado
app.listen(port, () => {
  console.log(`Servidor escuchando en http://localhost:${port}`);
});


//nodemon servidor.js

//node servidor.js