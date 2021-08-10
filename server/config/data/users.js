const bcrypt=require('bcryptjs')

const users=[
    {
        name:'admin',
        email:'admin@admn.com',
        password:bcrypt.hashSync('password',10),
        isAdmin:true
    },
    {
        name:'Grunge',
        email:'paranoid.grunge@gmail.com',
        password:bcrypt.hashSync('password',10)
    },
    {
        name:'Rasid ',
        email:'rasid@gmail.com',
        password:bcrypt.hashSync('password',10)
    }
]

module.exports=users;