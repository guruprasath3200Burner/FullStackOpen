const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
  username: {
    type: String,
    required: [true, "Username is required"],
    unique: true, // this ensures the uniqueness of username
    minlength: [3, "Username must be at least 3 characters long"],
  },
  name: {
    type: String,
    required: [true, "Name is required"],
  },
  passwordHash: {
    type: String,
    required: [true, "Password hash is required"],
  },
  notes: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Note",
    },
  ],
});

userSchema.set("toJSON", {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
    delete returnedObject.passwordHash; // do not expose password hash
  },
});
module.exports = mongoose.model("User", userSchema);
