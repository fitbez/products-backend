const router = require("express").Router();
const Products = require("../models/produts");

// POST /produt -- to add a new product
router.post("/product", async (req, res) => {
  const newProduct = new Products({
    name: req.body.name,
    price: req.body.price,
    description: req.body.description,
    imageUrl: req.body.imageUrl,
  });

  try {
    const savedProduct = await newProduct.save();
    res.status(200).json(savedProduct);
  } catch (err) {
    res.status(500).json(err);
  }
});

// GET /products -- to fetching all products
router.get("/products", async (req, res) => {
  try {
    const getAllProducts = await Products.find({});
    res.status(200).json(getAllProducts);
  } catch (err) {
    res.status(500).json(err);
  }
});

// GET /produts/{id} -- to get details of a specific product
router.get("/:id", async (req, res) => {
  try {
    const product = await Products.findById(req.params.id);
    res.status(200).json(product);
  } catch (err) {
    res.status(500).json(err);
  }
});

// PUT /products/{id} -- to update a specific product
router.put("/:id", async (req, res) => {
  const query = { _id: req.params.id };
  try {
    const updatedProduct = await Products.findOneAndUpdate(
      query,
      {
        $set: req.body,
      },
      {
        new: true,
      }
    );
    res.status(200).json(updatedProduct);
  } catch (err) {
    res.status(500).json(err);
  }
});

// DELETE /product/{id} -- to delete a specfic product
router.delete("/:id", async (req, res) => {
  try {
    const query = { _id: req.params.id };
    await Products.findByIdAndDelete(query);
    res.status(200).json("The product has been deleted!");
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
