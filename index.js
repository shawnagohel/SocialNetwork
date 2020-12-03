if (process.env.NODE_ENV !== "production") require("dotenv").config();

const express = require("express");
const User = require("./models/User");
const mongoose = require("mongoose");
const Thought = require("./models/Thought");
// const ReactionSchema = require("./models/Reaction");

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const DB_URL = process.env.MONGODB_URL;

// ================================================
// USERs    =======================================
// ================================================
// sends back a list of all users
app.get("/users/", async (req, res) => {
  try {
    mongoose.connect(
      DB_URL,
      {
        useUnifiedTopology: true,
        useNewUrlParser: true,
        useFindAndModify: false,
      },
      (err, res) => {
        if (err) res.send(err);
        console.log(err);
      }
    );
    const result = await User.find();
    if (result) res.json(result);
    else res.json(2);
  } catch (e) {
    console.log(e);
  }
});

// sends back a specific user from username
app.get("/users/:username", async (req, res) => {
  try {
    mongoose.connect(
      DB_URL,
      {
        useUnifiedTopology: true,
        useNewUrlParser: true,
        useFindAndModify: false,
      },
      (err, res) => {
        if (err) res.send(err);
        console.log(err);
      }
    );
    const result = await User.find({ username: req.params.username });
    if (result) res.json(result);
    else res.status(500);
  } catch (e) {
    console.log(e);
  }
});

// deletes the user with  the corresponding username
app.delete("/users/:username", async (req, res) => {
  const { username } = req.params;

  try {
    mongoose.connect(
      DB_URL,
      {
        useUnifiedTopology: true,
        useNewUrlParser: true,
        useFindAndModify: false,
      },
      (err, res) => {
        if (err) res.send(err);
        console.log(err);
      }
    );
    const result = await User.deleteOne({ username: username });
    if (result) res.json(result);
    else res.status(500);
  } catch (e) {
    console.log(e);
  }
});

// create a new user
app.post("/users/", async (req, res) => {
  const { username, email, password } = req.body;
  try {
    mongoose.connect(
      DB_URL,
      {
        useUnifiedTopology: true,
        useNewUrlParser: true,
        useFindAndModify: false,
      },
      (err, res) => {
        if (err) res.send(err);
        console.log(err);
      }
    );
    const result = await User.create({
      username: username,
      password: password,
      email: email,
      thoughts: [],
      friends: [],
    });
    if (result) res.json(result);
    else res.status(500);
  } catch (e) {
    console.log(e);
  }
});

app.put("/users/:username", async (req, res) => {
  const username = req.params.username
  const { password, email } = req.body;

  try {
    mongoose.connect(
      DB_URL,
      {
        useUnifiedTopology: true,
        useNewUrlParser: true,
        useFindAndModify: false,
      },
      (err, res) => {
        if (err) res.send(err);
        console.log(err);
      }
    );
    const result = await User.updateOne(
      {
        username: username,
      },
      {
        password: password,
        email: email
      }
    );
    if (result) res.json(result);
    else res.status(500);
  } catch (e) {
    console.log(e);
  }
});

// ================================================
// THOUGHTS =======================================
// ================================================
app.get("/thoughts/", async (req, res) => {
  try {
    mongoose.connect(
      DB_URL,
      {
        useUnifiedTopology: true,
        useNewUrlParser: true,
        useFindAndModify: false,
      },
      (err, res) => {
        if (err) res.send(err);
        console.log(err);
      }
    );
    const result = await Thought.find();
    if (result) res.json(result);
    else res.json(2);
  } catch (e) {
    console.log(e);
  }
});

// fetches and sends the thought for the corresponding _id
app.get("/thoughts/:id", async (req, res) => {
  try {
    mongoose.connect(
      DB_URL,
      {
        useUnifiedTopology: true,
        useNewUrlParser: true,
        useFindAndModify: false,
      },
      (err, res) => {
        if (err) res.send(err);
        console.log(err);
      }
    );
    const result = await Thought.findOne({ _id: req.params.id });
    if (result) res.json(result);
    else res.json(2);
  } catch (e) {
    console.log(e);
  }
});

// used to create a "thought"
app.post("/thoughts/", async (req, res) => {
  // const thoughtParams = req.body;

  console.log(req.body)

  try {
    const result = await Thought.create({
      user: req.body.user,
      thought_text: req.body.thought_text,
      created_at: req.body.created_at,
      reactions: [],
    });

    if (result) res.status(200);
    else res.status(500);
  } catch (e) {
    res.send(e)
  }
});

// delete a thought
app.delete( '/thoughts/:id', async (req, res) => {
  try {
    const result = await Thought.deleteOne({
      _id: req.params.id
    });

    if (result) res.status(200);
    else res.status(500);
  } catch (e) {
    console.log(e)
  }
});

app.put( '/thoughts/:id', async (req, res) => {
  const id = req.params.id
  const { user, thought_text } = req.body;

  try {
    mongoose.connect(
      DB_URL,
      {
        useUnifiedTopology: true,
        useNewUrlParser: true,
        useFindAndModify: false,
      },
      (err, res) => {
        if (err) res.send(err);
        console.log(err);
      }
    );
    const result = await Thought.updateOne(
      {
        _id: id,
      },
      {
        user: user,
        thought_text: thought_text
      }
    );
    if (result) res.json(result);
    else res.status(500);
  } catch (e) {
    console.log(e);
  }
})

// ===============================
// Reactions =====================
// ===============================

// adding a reaction
app.post('/reactions/', async (req, res) => {

  const { thoughtId, username, createdAt, reactionBody  } = req.body

  try {
    mongoose.connect(
      DB_URL,
      {
        useUnifiedTopology: true,
        useNewUrlParser: true,
        useFindAndModify: false,
      },
      (err, res) => {
        if (err) res.send(err);
        console.log(err);
      }
    );

    const reaction = ( {
      username: username,
      createdAt: createdAt,
      reactionBody: reactionBody
    } )

    // find the thought we want to update
    const thought = await Thought.findOne({
      _id: mongoose.Types.ObjectId(thoughtId)
    })

    // add the raction to the array of reactions
    thought.reactions.push(reaction)
    await thought.save()
    
  } catch (e) {
    console.log(e);
    res.status(500);
  }
})

// deleting a reaction
app.delete('/reactions/:id', async (req, res) => {
  const { thoughtId } = req.body

  try {
    mongoose.connect(
      DB_URL,
      {
        useUnifiedTopology: true,
        useNewUrlParser: true,
        useFindAndModify: false,
      },
      (err, res) => {
        if (err) res.send(err);
        console.log(err);
      }
    );

    // find the thought we want to update
    const thought = await Thought.findOne({
      _id: mongoose.Types.ObjectId(thoughtId)
    })

    // filter out the reaction we want to remove
    thought.reactions = thought.reactions.filter( r => {
      return r._id != req.params.id
    }) 
    await thought.save()
    
  } catch (e) {
    console.log(e);
    res.status(500);
  }
})

// ===============================
// FRIENDS   =====================
// ===============================

app.post('/friends/', async (req, res) => {
  const { user, friend } = req.body

  
  try {
    mongoose.connect(
      DB_URL,
      {
        useUnifiedTopology: true,
        useNewUrlParser: true,
        useFindAndModify: false,
      },
      (err, res) => {
        if (err) res.send(err);
        console.log(err);
      }
    );

    // find the user we want to update
    const user1 = await User.findOne({
      _id: mongoose.Types.ObjectId(user)
    })

    // filter out the reaction we want to remove
    user1.friends.push( mongoose.Types.ObjectId(friend) )
    await thought.save()
    
  } catch (e) {
    console.log(e);
    res.status(500);
  }
})


app.delete('/friends/:id', async (req, res) => {
  const { user, friend } = req.body
  
  try {
    mongoose.connect(
      DB_URL,
      {
        useUnifiedTopology: true,
        useNewUrlParser: true,
        useFindAndModify: false,
      },
      (err, res) => {
        if (err) res.send(err);
        console.log(err);
      }
    );

    // find the user we want to update
    const user1 = await User.findOne({
      _id: mongoose.Types.ObjectId(user)
    })

    // filter out the reaction we want to remove
    user1.friends.filter( f => {
      return f != mongoose.Types.ObjectId(friend)
    } )
    await thought.save()
    
  } catch (e) {
    console.log(e);
    res.status(500);
  }
})

app.listen(5000, () => {
  console.log("Listening...");
});
