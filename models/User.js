import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import validator from "validator";

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: [true, "Please provide Username"],
      unique: true,
      trim: true,
      minlength: [3, "Username must be at least 3 characters long"],
      maxlength: [30, "Username cannot exceed 30 characters"],
      validate: {
        validator: (value) => /^[a-zA-Z0-9_]+$/.test(value),
        message: "Username can only contain letters, numbers, and underscores",
      },
    },

    password: {
      type: String,
      required: [true, "Please provide a secure password"],
      minlength: [8, "Password must be at least 8 characters long"],
      validate: {
        validator: (value) => {
          return (
            /[a-z]/.test(value) && // Contains lowercase letters
            /[A-Z]/.test(value) && // Contains uppercase letters
            /[0-9]/.test(value) && // Contains numbers
            /[!@#$%^&*(),.?":{}|<>]/.test(value) // Contains special characters
          );
        },
        message:
          "Password must include lowercase, uppercase, numbers, and special characters",
      },
    },

    email: {
      type: String,
      required: [true, "Please provide Email"],
      unique: true,
      lowercase: true,
      trim: true,
      validate: {
        validator: validator.isEmail,
        message: "Please provide a valid email",
      },
    },

    firstName: {
      type: String,
      required: [true, "First name is required"],
    },
    lastName: {
      type: String,
      required: [true, "Last name is required"],
    },

    mobile: {
      type: String,
      validate: {
        validator: validator.isMobilePhone,
        message: "Invalid phone number format",
      },
    },

    googleId: {
      type: String,
      unique: true,
      sparse: true,
    },
    linkedinId: {
      type: String,
      unique: true,
      sparse: true,
    },
    microsoftId: {
      type: String,
      unique: true,
      sparse: true,
    },

    isVerified: {
      type: Boolean,
      default: false,
    },
    verificationToken: {
      type: String,
    },
    resetPasswordToken: {
      type: String,
    },
    resetPasswordExpires: {
      type: Date,
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
    updatedAt: {
      type: Date,
      default: Date.now,
    },
  },
  { timestamps: true }
);

//encrypt password before saving to database
userSchema.pre("save", async function (next) {
    if (!this.isModified("password")) return next();
  
    const saltRounds = 16; // Increased for better security
    try {
      this.password = await bcrypt.hash(this.password, saltRounds);
      next();
    } catch (error) {
      next(error);
    }
  });

//compare password
userSchema.methods.comparePassword = async function (candidatePassword) {
    try {
      return await bcrypt.compare(candidatePassword, this.password);
    } catch (error) {
      throw error;
    }
  };

  //reset email code
userSchema.methods.generatePasswordReset = function() {
    this.resetPasswordToken = crypto.randomBytes(20).toString('hex');
    this.resetPasswordExpires = Date.now() + 3600000; //expires in an hour
  };
  //reset password
userSchema.methods.resetPassword = function(password) {
    this.password = password;
    this.resetPasswordToken = null;
    this.resetPasswordExpires = null;
  };
  
  userSchema.methods.toJSON = function() {
    const obj = this.toObject();
    delete obj.password;
    delete obj.verificationToken;
    delete obj.resetPasswordToken;
    delete obj.resetPasswordExpires;
    return obj;
  };

module.exports = mongoose.model("User", userSchema);
