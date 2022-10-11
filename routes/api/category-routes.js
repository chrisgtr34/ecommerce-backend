const router = require('express').Router();
const { Category, Product,  } = require('../../models');

// The `/api/categories` endpoint

router.get('/', (req, res) => {
  // find all categories
  // be sure to include its associated Products
  Category.findAll({
    include: {
      model: Product,
      attributes: ['id', 'product_name', 'price', 'stock', 'category_id']
    }
  })
    .then(catData => {
      if (!catData) {
        res.status(404).json({ message: 'No categories where found' });
        return;
      }
      res.json(catData);
    })
    .catch(err => {
      console.log(err);
      res.status(500).json(err)
    });
});

router.get('/:id', (req, res) => {
  // find one category by its `id` value
  // be sure to include its associated Products
  Category.findOne({
    where: {
      id: req.params.id
    },
    include: {
      model: Product,
      attributes: ['id', 'product_name', 'price', 'stock', 'category_id']
    }
  })
    .then(catData => {
      if (!catData) {
        res.status(404).json({ message: 'No categories where found' });
        return;
      }
      res.json(catData);
    })
    .catch(err => {
      console.log(err);
      res.status(500).json(err)
    });
});

router.post('/', (req, res) => {
  // create a new category
  Category.create({
    category_name: req.body.category_name
  })
    .then(catData => res.json(catData))
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
  });
});

router.put('/:id', (req, res) => {
  // update a category by its `id` value
  Category.update(req.body, {
    where: {
        id: req.params.id
    }
  })
    .then(catData => {
        if (!catData[0]) {
            res.status(404).json({ message: 'No category where found'});
            return;
        }
        res.json(catData);
  })
    .catch(err => {
        console.log(err); 
        res.status(500).json(err);
  });
});

router.delete('/:id', (req, res) => {
  // delete one product by its `id` value
  Category.destroy({
    where: {
      id: req.params.id
    }
  })
    .then(catData => {
      if (!catData) {
        res.status(404).json({ message: 'No category found with this id' });
        return;
      }
      res.json(catData);
    })
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
});

module.exports = router;
