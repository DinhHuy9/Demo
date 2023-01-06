var expesss = require('express')
const { ObjectId } = require('bson')
const { insertProduct, getAllProducts,
    deleteProductID, updateProdcut,
    findProductID, searchProductByName } = require('./productService')
const { handlebars } = require('hbs')
var app = expesss()

app.set('view engine', 'hbs')
app.use(expesss.urlencoded({ extended: true }))

app.get('/', (req, res) => {
    res.render('home')
})
app.post('/new', async (req, res) => {
    const name = req.body.txtName
    const price = req.body.txtPrice
    const picture = req.body.txtPicUrl
    const newProduct = {
        name: name,
        price: Number.parseFloat(price),
        picture: picture
    }
    await insertProduct(newProduct)
    res.render('home')

})

app.get('/new', (req, res) => {
    res.render('newProduct')
})
app.get('/all', async (req, res) => {
    let all = await getAllProducts()
    res.render('allProduct', { all: all })
})
app.get('/delete', async (req, res) => {
    const id = req.query.id
    await deleteProductID(id)
    res.redirect('/all')
})
app.post('/edit', async (req, res) => {
    const id = req.body.id
    const name = req.body.txtName
    const price = req.body.txtPrice
    const picture = req.body.txtPicUrl
    await updateProdcut(id, name, price, picture)
    res.redirect('/all')
})

app.get('/edit', async (req, res) => {
    const id = req.query.id
    const productToEdit = await findProductID(id)
    res.render('edit', { product: productToEdit })
})
app.post('/search', async (req, res) => {
    const searchs = req.body.txtSearch
    const results = await searchProductByName(searchs)
    res.render('allProduct', { all: results })
})
handlebars.registerHelper('checkPrice', function (price) {
    return price >= 500;
})
const PORT = process.env.PORT || 4000
app.listen(PORT)
console.log("Server is running!")
