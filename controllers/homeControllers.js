exports.home = (req, res) => {
    return res.render("index.ejs");
};

exports.list = (req, res) => {
    let listItems = ["item1", "item2", "item3"];
    return res.render("list.ejs", { listItems: listItems });
};
