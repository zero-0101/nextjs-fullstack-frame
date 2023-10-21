"use server";

import * as bcrypt from "bcrypt";
import { connectToDB } from "../mongoose";
import User from "../models/user.model";
import { USER } from "@/lib/types";

export interface CREATE_USER extends USER {
  password: string;
}

export async function createUser({
  nickname,
  email,
  password,
  image,
}: CREATE_USER) {
  try {
    connectToDB();

    const user = await User.findOne({
      $or: [{ email: email }, { nickname: nickname }],
    });
    if (user) {
      return { message: "The User has existed.", success: false };
    }

    const newUser = new User({
      nickname,
      email,
      password: await bcrypt.hash(password, 10),
      image,
    });

    await newUser.save();

    return { message: "Create successfull.", success: true };
  } catch (error) {
    throw error;
  }
}

export async function QueryUser({
  email,
  password,
}: {
  email: string;
  password: string;
}) {
  try {
    connectToDB();

    const user = await User.findOne({ email: email });

    if (!user) return { message: "Your account cann't find.", success: false };

    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword)
      return { message: "Your password didn't correct.", success: false };

    const { password: _, ...reset } = user._doc;

    return { message: "", success: true, data: reset };
  } catch (error) {
    throw error;
  }
}

export interface QUERY_USER {
  page?: number;
  perPage?: number;
  nickname?: string | null;
}

export async function QueryUsers({
  page = 1,
  perPage = 10,
  nickname,
}: QUERY_USER) {
  try {
    connectToDB();

    const _start = (page - 1) * perPage;
    const _list = await User.find({
      nickname: { $regex: nickname || "", $options: "i" },
    })
      .skip(_start)
      .limit(perPage)
      .exec();

    const list = _list.map((item) => {
      const { password, ...reset } = item._doc;
      return reset;
    });
    return { message: "", success: true, data: list };
  } catch (error) {
    throw error;
  }
}
