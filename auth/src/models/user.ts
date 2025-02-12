import mongoose from "mongoose";

// interface that describes what is required to create a user
interface UserAttrs {
  email: string;
  password: string;
}

// interface that user Model has
interface UserModel extends mongoose.Model<any> {
  build: (attrs: UserAttrs) => UserDoc;
}

// interface that describes the properties that user document has
interface UserDoc extends mongoose.Document {
  email: string;
  password: string;
}

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
});

userSchema.statics.build = (attrs: UserAttrs) => {
  return new User(attrs);
};

const User = mongoose.model<UserDoc, UserModel>("User", userSchema);

export { User };
