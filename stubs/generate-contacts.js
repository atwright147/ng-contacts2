const faker = require('faker');

const quantity = 10;

faker.seed(1234567);
faker.locale = 'en_GB';

const contacts = [];

for (let index = 0; index < quantity; index++) {
  const contact = {};

  contact['id'] = index + 1;
  contact['firstName'] = faker.name.firstName();
  contact['lastName'] = faker.name.lastName();
  contact['prefix'] = faker.name.prefix();
  contact['jobTitle'] = faker.name.title();
  contact['email'] = faker.internet.exampleEmail();
  contact['avatar'] = faker.internet.avatar();
  contact['notes'] = faker.lorem.sentences(faker.random.number({ min: 0, max: 5 }));

  contact['phoneNumbers'] = [];
  for (let index = 0; index < faker.random.number({ min: 0, max: 2 }); index++) {
    contact['phoneNumbers'].push({
      number: faker.phone.phoneNumber(),
      description: faker.lorem.words(5),
    });
  }

  contacts.push(contact);
}

module.exports = contacts;
