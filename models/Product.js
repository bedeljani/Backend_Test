const knex = require('../config/db');
const setupPaginator = require('knex-paginator');
const random = require('randomstring');

let Product = function() {};
let dateTime = Date.now();
setupPaginator(knex);

Product.insert = function(req, result) {
    let rand = random.generate();
    let id = rand;
    let img = Object.values(req.images_list);
    let data = { id : id, name: req.name, price: req.price, modify_date: dateTime, create_date: dateTime };
    let dataTime = dateTime;
    knex.transaction(function (t) {
      return knex("T_Product")
        .transacting(t)
        .insert(data)
        .then(function (response) {
          let data2 = []
          img.map(item => {
            data2.push({
              id : random.generate(), 
              product_id : id, 
              img: item, 
              modify_date: dataTime, 
              create_date:dateTime
            })
          });
          return knex('AT_ProductImages')
            .transacting(t)
            .insert(data2)
        })
        .then(t.commit)
        .catch(t.rollback)
    })
    .then(function (res) {
      result(null, res)
    })
    .catch(function (err) {
      result(err, null)
    });
  };


  
    Product.create = (req, res) => {
        let id = random.generate({length:32});
        let name = req.body.name
        let price = req.body.price
        let picture = req.files
        // console.log(price);
        console.log(req.files);
        const product = { id: `${id}`, name: `${name}`, price: `${price}`, modify_date: new Date(), create_date: new Date() };
        knex('T_Product').insert(product)
        .then(()=>{
            res.insertId
        })
        .catch((err)=>{
            res.status(400).send({
                message: err.message
            })
         });
        // connection.query('INSERT INTO T_Product SET ?', product, (err, res) => {
        //     if (err) throw err;
        //     console.log('Last insert ID:', res.insertId);
        //});

        picture.forEach(element => {
            // console.log(element.originalname);
            // let img = req.files[0].originalname
            let img = element.originalname
            let id_photo = random.generate({length:32});
            const image = { id: `${id_photo}`, product_id: `${id}`, img: img, modify_date: new Date(), create_date: new Date() };
            knex('AT_Product').insert(image)
            .then((data)=>{
                res.send(data)
            })
            .catch((err)=>{
                res.status(400).send({
                    message: err.message
                })
             });
        //     connection.query('INSERT INTO AT_ProductImages SET ?', image, (err, res) => {
        //         if (err) throw err;
        //         console.log('Last insert ID:', res.insertId);
        //     });
        
        });

    }

    Product.list = (req, res) => {
        // console.log(req.body);
        
        connection.query('SELECT T_Product.id, T_Product.name, T_Product.price, AT_ProductImages.img FROM T_Product LEFT JOIN AT_ProductImages ON T_Product.id = AT_ProductImages.product_id', (err, rows) => {
            if (err) throw err;

            // console.log('Data received from Db:\n');
            console.log(rows);
            res.json(rows)
            // data = rows
        });
        // console.log(data);
    }
}

module.exports = Product;