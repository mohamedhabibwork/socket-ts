import app from './App'

const PORT = parseInt(`${process.env.PORT || 3030}`)
const HOST = `${process.env.HOST || 'localhost'}`;

app.start(HOST, PORT);