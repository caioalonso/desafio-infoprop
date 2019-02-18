const Express = require("express");
const Multer = require("multer");
const { StringDecoder } = require("string_decoder");
const CSV = require("csv");
const Property = require("../../models/property");

const router = Express.Router();
const upload = Multer({ storage: Multer.memoryStorage() });

router.get("/properties", async (req, res) => {
  let fields = "rua location bairro condominio";
  let selector = {};
  if (
    req.query.latMin &&
    req.query.lonMin &&
    req.query.latMax &&
    req.query.lonMax
  ) {
    selector = {
      location: {
        $geoWithin: {
          $box: [[req.query.latMin, req.query.lonMin], [req.query.latMax, req.query.lonMax]]
        }
      }
    };
  }
  try {
    let all = await Property.find(selector, fields);
    return res.send(JSON.stringify(all));
  } catch (err) {
    console.log(err);
    return res.sendStatus(500);
  }
});

router.post("/properties/reset", async (req, res) => {
  try {
    await Property.deleteMany({})
    return res.sendStatus(200);
  } catch (err) {
    console.log(err);
    return res.sendStatus(500);
  }
})

router.post(
  "/properties/csvUpload",
  upload.single("csvFile"),
  async (req, res) => {
    if (!req.file) {
      return res.sendStatus(400);
    }

    let properties;
    try {
      properties = await parseCSV(req.file);
    } catch (err) {
      return res.sendStatus(400);
    }

    for (i in properties) {
      try {
        let p = new Property(properties[i]);
        p.location.type = "Point";
        p.location.coordinates = [
          parseCoord(properties[i].latitude),
          parseCoord(properties[i].longitude)
        ];
        await p.save();
      } catch (err) {}
    }
    return res.sendStatus(200);
  }
);

async function parseCSV(file) {
  return new Promise((resolve, reject) => {
    const parser = CSV.parse({
      columns: true,
      trim: true,
      skip_empty_lines: true,
      skip_lines_with_empty_values: false,
      delimiter: ";"
    });
    const decoder = new StringDecoder("utf8");
    const content = decoder.write(file.buffer);

    let output = [];

    parser.on("readable", () => {
      let record;
      while ((record = parser.read())) {
        output.push(record);
      }
    });

    parser.on("error", err => reject(err.message));
    parser.on("end", () => resolve(output));
    parser.write(content);
    parser.end();
  });
}

function parseCoord(coord) {
  // removes all but the first dot from coordinates
  var count = 0;
  coord = coord.replace(/[.]/gm, match => {
    count++;
    if (count === 1) {
      return match;
    } else {
      return "";
    }
  });
  return parseFloat(coord);
}

module.exports = router;
