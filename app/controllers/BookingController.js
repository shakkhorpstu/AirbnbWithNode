const index = (req, res) => {
    res.send('index');
}

const store = (req, res) => {
    res.send('store');
}

const destroy = (req, res) => {
    res.send('destroy');
}

module.exports = {
    index,
    store,
    destroy
}