const express = require("express");
const cors = require("cors");
const multer = require("multer");
const mysql = require("mysql2/promise");
const app = express();
const PORT = 5005;

app.use(cors());
app.use(express.json());

const storage = multer.memoryStorage();
const upload = multer({ storage });

const dbConfig = {
  host: "localhost",
  user: "root",
  password: "test@123",
  database: "Project",
};

let connection;
mysql
  .createConnection(dbConfig)
  .then((conn) => {
    connection = conn;
    console.log(" Connected to MySQL");
  })
  .catch((err) => {
    console.error(" MySQL Connection Error:", err);
  });

app.post("/upload", upload.single("image"), async (req, res) => {
  const { name, employeeId, department, designation, project, type, status } =
    req.body;
  const image = req.file ? req.file.buffer : null;

  try {
    const [result] = await connection.execute(
      `INSERT INTO Task (name, employeeId, department, designation, project, type, status, image)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
      [name, employeeId, department, designation, project, type, status, image]
    );
    res.status(200).json({ message: "Upload successful", id: result.insertId });
  } catch (err) {
    console.error(" Insert Error:", err);
    res.status(500).json({ message: "Failed to save data" });
  }
});

app.get("/employees", async (req, res) => {
  try {
    const [rows] = await connection.execute("SELECT * FROM Task");
    const formatted = rows.map((emp) => ({
      ...emp,
      image: emp.image
        ? `data:image/jpeg;base64,${emp.image.toString("base64")}`
        : null,
    }));
    res.status(200).json(formatted);
  } catch (err) {
    console.error(" List Error:", err);
    res.status(500).json({ message: "Listing Error" });
  }
});

app.get("/employees/:id", async (req, res) => {
  try {
    const [rows] = await connection.execute("SELECT * FROM Task WHERE id = ?", [
      req.params.id,
    ]);
    if (rows.length === 0)
      return res.status(404).json({ message: "Employee not found" });

    const emp = rows[0];
    if (emp.image) {
      emp.image = `data:image/jpeg;base64,${emp.image.toString("base64")}`;
    }

    res.json(emp);
  } catch (err) {
    console.error(" Fetch Error:", err);
    res.status(500).json({ message: "Failed to fetch employee" });
  }
});

app.patch("/employee/:id", upload.single("image"), async (req, res) => {
  const { name, employeeId, department, designation, project, type, status } =
    req.body;
  const id = req.params.id;

  try {
    let sql = `UPDATE Task SET name=?, employeeId=?, department=?, designation=?, project=?, type=?, status=?`;
    const params = [
      name,
      employeeId,
      department,
      designation,
      project,
      type,
      status,
    ];

    if (req.file) {
      sql += `, image=?`;
      params.push(req.file.buffer);
    }

    sql += ` WHERE id=?`;
    params.push(id);

    const [result] = await connection.execute(sql, params);

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: "Employee not found" });
    }

    res.json({ message: "Employee updated successfully" });
  } catch (err) {
    console.error(" Update Error:", err);
    res.status(500).json({ message: "Update failed" });
  }
});

app.delete("/employee/:id", async (req, res) => {
  try {
    const [result] = await connection.execute("DELETE FROM Task WHERE id = ?", [
      req.params.id,
    ]);

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: "Employee not found" });
    }

    res.status(200).json({ message: "Employee deleted successfully" });
  } catch (err) {
    console.error(" Delete Error:", err);
    res.status(500).json({ message: "Failed to delete employee" });
  }
});

app.listen(PORT, () => {
  console.log(` Server running at http://localhost:${PORT}`);
});
