const router = require('express').Router();
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint

router.get('/', (req, res) => {
  // find all categories
  // be sure to include its associated Products
  Category.findAll({
    include: [Product]
  }).then(dbCategory => {
    if (!dbCategory) {
      res.status(404).json({ message: 'No categories found!' });
      return;
    }
    res.json(dbCategory)
  }).catch(err => res.status(500).json(err));
});

router.get('/:id', (req, res) => {
  // find one category by its `id` value
  // be sure to include its associated Products
  Category.findOne({
    include: [Product],
    where: {
      id: req.params.id
    }
  }).then(dbCategory => {
    if (!dbCategory) {
      res.status(404).json({ message: 'No category with this id!' });
      return;
    }
    res.json(dbCategory)
  }).catch(err => res.status(500).json(err));
});

router.post('/', (req, res) => {
  // create a new category
  console.log(req.body);
  Category.create(req.body).then(dbCategory => {
    res.json(dbCategory)
  }).catch(err => res.status(500).json(err));
});

router.put('/:id', (req, res) => {
  // update a category by its `id` value
  Category.update(req.body, {
    where: {
      id: req.params.id
    }
  }).then(dbCategory => {
    if (!dbCategory) {
      res.status(404).json({ message: 'No product found with this id!' });
      return;
    }
    res.json(dbCategory)
  }).catch(err => res.status(500).json(err));
});

router.delete('/:id', (req, res) => {
  // delete a category by its `id` value
  Category.destroy({
    where: {
      id: req.params.id
    }
  }).then(dbCategory => {
    if (!dbCategory) {
      res.status(404).json({ message: 'No category with this id!' });
      return;
    }
    res.json(dbCategory)
  }).catch(err => res.status(500).json(err))
});

module.exports = router;
