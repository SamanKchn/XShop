import bcrypt from 'bcryptjs';

const users = [
  {
    name: 'ادمین',
    email: 'admin@email.com',
    password: bcrypt.hashSync('123456', 10),
    isAdmin: true,
  },
  {
    name: 'آرمان کریمی',
    email: 'john@email.com',
    password: bcrypt.hashSync('123456', 10),
  },
  {
    name: 'الهام سمیع',
    email: 'elham@gmail.com',
    password: bcrypt.hashSync('123456', 10),
  },
];

export default users;
