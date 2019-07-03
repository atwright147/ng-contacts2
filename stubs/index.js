const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use(express.static(__dirname + '/public'));
const PORT = 3000;

const contactsModel = require('./generate-contacts');

app.get('/contacts', (req, res) => {
  res.json(contactsModel);
});

app.get('/contacts/:id', (req, res) => {
  const contact = contactsModel.filter(item => item.id === Number(req.params.id));
  res.json(contact);
});

app.listen(PORT, () => {
  console.info(`Example app listening on port ${PORT}`);  // eslint-disable-line no-console
});
