import bcrypt from 'bcryptjs';

const users = [
  {
    name: 'ادمین',
    email: 'admin@email.com',
    password: bcrypt.hashSync('123456', 10),
    isAdmin: true,
  },
  {
    name: 'علی رضا ژیان پور',
    email: 'alireza@gmail.com',
    password: bcrypt.hashSync('123456', 10),
  },
  {
    name: 'کیمیا محمدی',
    email: 'jane@email.com',
    password: bcrypt.hashSync('123456', 10),
  },
];

export default users;
