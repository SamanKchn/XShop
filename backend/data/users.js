import bcrypt from 'bcryptjs';

const users = [
  {
    name: 'ادمین',
    email: 'admin@email.com',
    password: bcrypt.hashSync('123456', 10),
    isAdmin: true,
  },
  {
    name: 'کیمیا خالواسماعیلی',
    email: 'kimia@gmail.com',
    password: bcrypt.hashSync('123456', 10),
  },
  {
    name: 'امیر میرزاذه',
    email: 'amir@gmail.com',
    password: bcrypt.hashSync('123456', 10),
  },
];

export default users;
