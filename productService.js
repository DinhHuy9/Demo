var mongoClient = require('mongodb').MongoClient
var url = 'mongodb+srv://dinhhuy99:Huy291299@cluster0.xxsmbhc.mongodb.net/test'
const { ObjectId } = require('bson')
async function insertProduct(newProduct) {
    let client = await mongoClient.connect(url)
    let db = client.db("Toys")
    let id = await db.collection("products").insertOne(newProduct)
    return id
}
async function getAllProducts() {
    let client = await mongoClient.connect(url)
    let db = client.db("Toys")
    let results = await db.collection("products").find().toArray()
    return results
}
async function deleteProductID(id) {
    let client = await mongoClient.connect(url)
    let db = client.db("Toys")
    await db.collection("products").deleteOne({ _id: ObjectId(id) })
}
async function updateProdcut(id, name, price, picture) {
    let client = await mongoClient.connect(url)
    let db = client.db("Toys")
    await db.collection("products").updateOne({ _id: ObjectId(id) },
        { $set: { "name": name, "price": price, "pictureURL": picture } })
}
async function findProductID(id) {
    let client = await mongoClient.connect(url)
    let db = client.db("Toys")
    const productToEdit = await db.collection("products").findOne({ _id: ObjectId(id) })
    return productToEdit
}

async function searchProductByName(search) {
    let client = await mongoClient.connect(url)
    let db = client.db("Toys")
    const results = await db.collection("products").find({ name: { $regex: search, $options: 'i' } }).toArray()
    return results
}



module.exports = { insertProduct, getAllProducts, deleteProductID, updateProdcut, findProductID, searchProductByName }