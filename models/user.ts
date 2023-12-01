import { Model, Schema, model } from "mongoose"

export interface IUser {
    name : string,
    surname : string,
    phone : number,
    email : string,
    password : string,    
    code? : string,
    verifiel? : string    
}

const UserSchema = new Schema<IUser>({
    name : {
        type : String,
        required : true
    },
    surname : {
        type : String,
        required : true
    },
    phone : {
        type : Number,
        required : true
    },
    email : {
        type : String,
        required : true
    },
    password : {
        type : String,
        required : true
    },
    code : {
        type : String
    },
    verifiel : {
        type : Boolean,
        default : false
    }
})

UserSchema.methods.toJSON = function(){
    const {__v, password,_id,code, ...user} = this.toObject();

    return user;
}

const Usuario: Model<IUser> = model<IUser>("Usuario",UserSchema);

export default Usuario;