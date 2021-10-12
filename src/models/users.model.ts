// users-model.ts - A mongoose model
//
// See http://mongoosejs.com/docs/models.html
// for more of what you can do here.
import { Application } from '../declarations';
import { Model, Mongoose, Schema } from 'mongoose';
import { ROLES_KEYS, STATUS_KEYS } from '../types';

export default function (app: Application): Model<any> {
  const modelName = 'users';
  const mongooseClient: Mongoose = app.get('mongooseClient');
  const schema = new mongooseClient.Schema({
    ra: { type: String, unique: true, lowercase: true },
    password: { type: String },
    name: { type: String },
    cpf: { type: String, index:{unique:true, sparse:true}, required:false},
    course: { type: String, required:true, ref:'courses'},
    classrooms:[
      {
        type: new Schema(
          {
            room: {type: String, required:true, ref:'classrooms'},
            status: {type: String, reuqired:true, default:STATUS_KEYS.ACTIVE, enum:STATUS_KEYS}
          },
        ),
        required: false,
        timestamps:true
      }
    ],
    role: {type: String, required:true, enum:ROLES_KEYS},
    major: {type: String, required:true, enum:MAJOR_KEYS}
  }, {
    timestamps: true
  });

  // This is necessary to avoid model compilation errors in watch mode
  // see https://mongoosejs.com/docs/api/connection.html#connection_Connection-deleteModel
  if (mongooseClient.modelNames().includes(modelName)) {
    (mongooseClient as any).deleteModel(modelName);
  }
  return mongooseClient.model<any>(modelName, schema);
}
