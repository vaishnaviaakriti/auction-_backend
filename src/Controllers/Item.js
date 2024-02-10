const Item = require("../Models/Item")

exports.additem = async(req, res) => {
    try {
        const newItem = new Item(req.body)
        await newItem.save()
        return res.status(200).json({ message: " item saved successfull" })
    } catch (error) {
        console.log(error);
        return res.status(404).json({ message: "item save error"  })
    }
}
exports.getItem = async(req, res) => {
    try {
        const items = await Item.find();

        if (!items || items.length === 0) {
            return res.status(404).json({ message: "No items found" });
        }

        return res.status(200).json(items);
    } catch (error) {
        return res.status(500).json({ message: "Internal server error"   });        
    }
}