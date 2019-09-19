const knex = require('../config/db');
const setupPaginator = require('knex-paginator');
const random = require('randomstring');
setupPaginator(knex);

exports.create = async (req,res) => {

    let id = random.generate({length:32});
    let name = req.body.name
    let price = req.body.price
    let picture = req.files
    
    console.log(req.files);
    const product = { id: `${id}`, name: `${name}`, price: `${price}`, modify_date: new Date(), create_date: new Date() };
     knex('T_Product').insert(product)
    .then(()=>{
        res.status(200).json(product)
    })
    .catch((err)=>{
        res.status(400).send({
            message: err.message
        })
     });

    picture.forEach(element => {
        
        let img = element.originalname
        let id = random.generate({length:32});
        const image = { id: `${id}`, product_id: `${id}`, img: img, modify_date: new Date(), create_date: new Date() };
       knex('AT_ProductImages').insert(image)
      await .then(()=>{
            res.status(200).json(image)
        })
        .catch((err)=>{
            res.status(400).send({
                message: err.message
            })
         });
    
    
    });
}

exports.update = async (req,res) => {

    let id = random.generate({length:32});
    let name = req.body.name
    let price = req.body.price
    let picture = req.files

    console.log(req.files);
    const product = { id: `${id}`, name: `${name}`, price: `${price}`, modify_date: new Date(), create_date: new Date() };
    knex('T_Product').update(product)
    .where('T_Product.id', req.params.id)
    .then(()=>{
        res.status(200).send(product)
    })
    .catch((err)=>{
        res.status(400).send({
            message: err.message
        })
     });

    picture.forEach(element => {
        let img = element.originalname
        let id = random.generate({length:32});
        const image = { id: `${id}`, product_id: `${id}`, img: img, modify_date: new Date(), create_date: new Date() };
        knex('AT_ProductImages').update(image)
      await .then(()=>{
            res.send(image)
        })
        .catch((err)=>{
            res.status(400).send({
                message: err.message
            })
         });
    
    });
}

exports.index =  (req, res) => {
    knex.select(['T_Product.id','T_Product.name','T_Product.price', knex.raw('GROUP_CONCAT(AT_ProductImages.img) as image_list')]).
    from('AT_ProductImages').leftJoin('T_Product', 'T_Product.id','AT_ProductImages.product_id')
    .groupBy('T_Product.id')
    .where('T_Product.id', '<', 100)
    .paginate(5, req.body.page, true)
    .then((paginator) => {
      res.status(200).send({
       paginator
      })
    })
      .catch( (err)=>{
          res.status(400).send({
              message: err.message
          })
      } )
}

exports.show = (req, res) => {
    knex.select(['T_Product.id','T_Product.name','T_Product.price', knex.raw('GROUP_CONCAT(AT_ProductImages.img) as image_list')]).
    from('AT_ProductImages').leftJoin('T_Product', 'T_Product.id','AT_ProductImages.product_id')
    .groupBy('T_Product.id')
    .where('T_Product.id', req.params.id)
   
    .then((data) =>{
      res.status(200).send({
        data
      })
    })
      .catch( (err)=>{
          res.status(400).send({
              message: err.message
          })
      } )
}

exports.delete = async (req, res) => {
    
    await knex('T_Product').where({'id':req.params.id}).del()
    .then((rows) => {
        res.status(200).send({
            message:"Deleted success"
        })
      })
      .catch( (err)=>{
          res.status(401).send({
              message: err.message
          })
      } )
}