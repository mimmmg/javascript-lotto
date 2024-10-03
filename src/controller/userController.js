import bcrypt from "bcrypt";
import User from "../model/User";

export const postJoin = async (req,res) => {
    const { username, password } = req.body;

    try {
        const existingUser = await User.findOne({username});
        if (existingUser) {
            return res.status(400).send("사용자 이름이 이미 존재합니다.");
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = new User({
            username,
            password: hashedPassword,
            createdAt: new Date(),
        });

        await newUser.save();

        res.redirect("/login");
    } catch (error) {
        console.error(error);
        res.status(500).send("회원가입 중 오류가 발생했습니다.");
    }
};