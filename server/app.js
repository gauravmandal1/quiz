const express = require('express');
const app = express();
const quizRouter = require('./router/quizz');
const mongoose = require('mongoose')
const cors = require('cors');

app.use(express.json());

// Mount the quiz router at the /quiz endpoint
// Route handling

app.use(cors());
app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.use('/quiz', quizRouter);



app.listen(8000, () => {
  console.log('Server started');
});


mongoose.connect('mongodb://localhost/quizzes', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('Error connecting to MongoDB', err));

// Middleware function to get a quiz by ID



