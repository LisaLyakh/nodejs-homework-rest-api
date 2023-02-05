// const fs = require('fs/promises')

const listContacts = async () => {}

const getContactById = async (contactId) => {}

const removeContact = async (contactId) => {}

const addContact = async (body) => {}

const updateContact = async (contactId, body) => {}

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
}
const { Schema, model } = require("mongoose");
const Joi = require("joi");

const codeRegexp = /^\(\d{3}\)\s\d{3}-\d{4}$/;

const contactSchema = Schema(
  {
    name: {
      type: String,
      required: [true, "Set name for contact"],
      minlength: 3,
      match: /^[a-zA-Z ]+$/,
      unique: true,
      trim: true,
    },
    email: {
      type: String,
      required: [true, "User email required"],
      unique: true,
      trim: true,
    },
    phone: {
      type: String,
      required: [true, "User phone number required"],
      match: [codeRegexp, "Must be in format (000) 000-0000"],
      unique: true,
      trim: true,
    },
    favorite: {
      type: Boolean,
      default: false,
    },
    owner: {
      type: Schema.Types.ObjectId,
      ref: "user",
      required: true,
    },
  },
  { versionKey: false, timestamps: true }
);

const addContactSchema = Joi.object({
  name: Joi.string()
    .min(3)
    .pattern(/^[a-zA-Z ]+$/)
    .required(),
  email: Joi.string()
    .email({ minDomainSegments: 2, tlds: { allow: ["com", "net"] } })
    .required(),
  phone: Joi.string().pattern(codeRegexp, "numbers").required(),
  favorite: Joi.boolean(),
});

const updateFavoriteSchema = Joi.object({
  favorite: Joi.boolean().required(),
});

const Contact = model("contact", contactSchema);

module.exports = {
  Contact,
  schemas: {
    add: addContactSchema,
    updateFavorite: updateFavoriteSchema,
  },
};