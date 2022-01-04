import bcrypt from 'bcryptjs';

const users = [
  {
    name: 'Roman Jasiek',
    email: 'romanjasiek@me.com',
    password: bcrypt.hashSync('12345', 10),
    isAdmin: true,
  },
  {
    name: 'John Doe',
    email: 'john@example.com',
    password: bcrypt.hashSync('98765', 10),
  },
  {
    name: 'Jane Doe',
    email: 'jane@example.com',
    password: bcrypt.hashSync('98765', 10),
  },
];

export default users;