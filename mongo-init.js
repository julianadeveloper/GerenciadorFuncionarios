db.createUser({
    user: 'juliana',
    pwd: 'root1',
    roles: [
      {
        role: 'dbOwner',
        db: 'funcionarios',
      },
    ],
  });