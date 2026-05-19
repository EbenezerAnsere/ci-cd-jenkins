const express = require('express');

const app = express();

app.get('/', (req, res) => {
    res.send('CI/CD Pipeline Working Successfully!');
});

const PORT = 3000;

if (require.main === module) {
    app.listen(PORT, () => {
        console.log(`Server running on port ${PORT}`);
    });
}

module.exports = app;