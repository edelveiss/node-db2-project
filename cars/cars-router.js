const express = require("express");
const db = require("../data/db-config"); // db access using knex

const router = express.Router();

router.get("/", (req, res) => {
  db("cars")
    .then((cars) => {
      res.json(cars);
    })
    .catch((err) => {
      res.status(500).json({ message: "Failed to retrieve cars" });
    });
});

router.get("/:id", validateCarId, (req, res) => {
  const { id } = req.params;

  db("cars")
    .where({ id })
    .first()
    .then((car) => {
      res.json(car);
    })
    .catch((err) => {
      res.status(500).json({ message: "Failed to retrieve car" });
    });
});

router.post("/", validateCar, (req, res) => {
  const carData = req.body;
  db("cars")
    .insert(carData)
    .then((ids) => {
      db("cars")
        .where({ id: ids[0] })
        .then((newCarEntry) => {
          res.status(201).json(newCarEntry);
        });
    })
    .catch((err) => {
      console.log("POST error");
      res.status(500).json({ message: "Failed to store data", error: err });
    });
});
//-------------------------------
router.put("/:id", validateCarId, validateCar, async (req, res) => {
  const { id } = req.params;
  const newCar = req.body;
  try {
    const count = await db("cars").where("id", id).update(newCar);
    if (count) {
      res.status(201).json({ updated: count });
    } else {
      res.status(404).json({ message: "invalid id", error: err });
    }
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "problem with db", error: err });
  }
});
router.delete("/:id", validateCarId, async (req, res) => {
  const { id } = req.params;
  try {
    const count = await db("cars").where("id", id).del();
    if (count) {
      res.status(201).json({ deleted: count });
    } else {
      res.status(404).json({ message: "invalid id", error: err });
    }
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "problem with db", error: err });
  }
});

//custom middleware
function validateCarId(req, res, next) {
  const { id } = req.params;

  getById(id)
    .then((car) => {
      if (car) {
        req.car = car;
        next();
      } else {
        res.status(400).json({ message: "invalid car id" });
      }
    })
    .catch((err) => {
      res.status(500).json({ message: "failed", err });
    });
}

function validateCar(req, res, next) {
  if (!isEmpty(req.body)) {
    if (!req.body.vin) {
      res.status(400).json({ message: "missing required vin field" });
    } else if (!req.body.make) {
      res.status(400).json({ message: "missing required make field" });
    } else if (!req.body.model) {
      res.status(400).json({ message: "missing required model field" });
    } else if (!req.body.mileage) {
      res.status(400).json({ message: "missing required mileage field" });
    } else {
      next();
    }
  } else {
    res.status(400).json({ message: "missing car data" });
  }
}
function isEmpty(obj) {
  return Object.keys(obj).length === 0;
}
function getById(id) {
  return db("cars").where({ id }).first();
}
function getByName(thisVin) {
  return db("cars").where("vin", thisVin).first();
}

module.exports = router;
