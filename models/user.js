const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const userSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: true,
      minlength: 2,
      maxlength: 50,
      trim: true,
    },
    lastName: {
      type: String,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
      validate(value) {
        if (!validator.isEmail(value)) {
          throw new Error("Invalid Email address: " + value);
        }
      },
    },
    password: {
      type: String,
      required: true,
      trim: true,
      validate(value) {
        if (!validator.isStrongPassword(value)) {
          throw new Error("Password is not strong enough");
        }
      },
    },
    role: {
      type: String,
      enum: ["traveler", "organizer"],
      required: true,
      default: "traveler",
    },
    isVerified: {
      type: Boolean,
      default: false, 
    },
    profileImage: {
      type: String,
      default:
        "https://geographyandyou.com/images/user-profile.png",
      validate(value) {
        if (!validator.isURL(value)) {
          throw new Error("Invalid profile image URL");
        }
      },
    },
    age: {
      type: Number,
      min: 18,
    },
    gender: {
      type: String,
      enum: ["male", "female", "other"],
    },
    about: {
      type: String,
      default: "This user hasn’t written about themselves yet.",
      maxlength: 300,
    },

    bookedTrips: [
      {
        tripId: { type: mongoose.Schema.Types.ObjectId, ref: "Trip" },
        status: {
          type: String,
          enum: ["booked", "completed", "cancelled"],
          default: "booked",
        },
        paymentStatus: {
          type: String,
          enum: ["pending", "paid", "failed"],
          default: "pending",
        },
        paymentDetails: {
          razorpayOrderId: { type: String },
          razorpayPaymentId: { type: String },
          razorpaySignature: { type: String },
          amount: { type: Number }, 
          currency: { type: String, default: "INR" },
        },
        bookingDate: { type: Date, default: Date.now },
      },
    ],
    savedTrips: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Trip",
      },
    ],
    reviews: [
      {
        tripId: { type: mongoose.Schema.Types.ObjectId, ref: "Trip" },
        rating: { type: Number, min: 1, max: 5 },
        comment: { type: String, maxlength: 500 },
      },
    ],

   
    kycVerified: {
      type: Boolean,
      default: false,
    },
    tripsCreated: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Trip",
      },
    ],
    earnings: {
      totalRevenue: { type: Number, default: 0 },
      withdrawals: [
        {
          amount: Number,
          date: { type: Date, default: Date.now },
          method: String,
        },
      ],
    },


    paymentMethods: [
      {
        provider: { type: String, enum: ["stripe", "razorpay", "paypal"] },
        accountId: String,
      },
    ],
  },
  { timestamps: true }
);


userSchema.pre("save", async function (next) {
  if (this.isModified("password")) {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
  }
  next();
});


userSchema.methods.generateJWT = function () {
  return jwt.sign({ _id: this._id, role: this.role }, process.env.JWT_SECRET, {
    expiresIn: "1d",
  });
};


userSchema.methods.comparePassword = async function (candidatePassword) {
  return await bcrypt.compare(candidatePassword, this.password);
};

module.exports = mongoose.model("User", userSchema);
