"use client";
import Container from "@/components/dash/Container";
import { Avatar, Button, Card, TextField, Typography } from "@mui/material";

import default_Profile from "../../../../../public/default-profile.jpg";
import { SignoutAuth } from "@/utils/auth/CheckAuth";
import { useAppDispatch, useAppSelector } from "@/lib/redux/hooks";
import { userInfoActions } from "@/features/auth/slices/userInformationsSlice";

const ProfilePage = () => {
  const user = useAppSelector((s) => s.userInfo);

  const dispatch = useAppDispatch();
  const handleSignout = () => {
    dispatch(userInfoActions.resetForm());
    SignoutAuth();
  };

  return (
    <Container>
      <Card
        className="p-4 w-full lg:w-96 m-auto flex flex-col justify-center items-center gap-8 rounded-lg!"
        elevation={3}
      >
        <div className="flex flex-col justify-center items-center gap-4">
          <div className="">
            <Avatar
              className="size-20! md:size-30! lg:size-40! cursor-pointer"
              src={default_Profile.src}
            >
              {user.full_name?.[0] || "A"}
            </Avatar>
          </div>
          <div className="text-center ">
            <Typography variant="h5">{user.full_name}</Typography>
            <Typography variant="body1">
              {user.phone_number} - فروشگاه {user.shop_name}
            </Typography>
            <Typography variant="body1">
              {user.email || user.shop_address}
            </Typography>
          </div>
        </div>
        <div className="flex flex-col gap-4 w-full">
          <Typography variant="h6">اکانت</Typography>
          <TextField
            type="text"
            size="small"
            placeholder="نام کاربری"
            label="نام کاربری"
            value={user.full_name}
          />
          <TextField
            type="email"
            size="small"
            placeholder="example@gmail.com"
            label="ایمیل"
            value={user.email}
          />
          <TextField
            type="tel"
            size="small"
            placeholder="شماره تلفن"
            label="شماره تلفن"
            value={user.phone_number}
          />
          <TextField
            size="small"
            placeholder="نام فروشگاه"
            label="نام فروشگاه"
            value={user.shop_name}
          />
          <TextField
            size="small"
            multiline
            rows={4}
            placeholder="آدرس فروشگاه"
            label="آدرس فروشگاه"
            value={user.shop_address}
          />
        </div>
        <div className=" flex gap-4 ">
          <Button variant="contained" color="primary">
            ویرایش
          </Button>
          <Button variant="contained" color="error" onClick={handleSignout}>
            خروج از اکانت
          </Button>
        </div>
      </Card>
    </Container>
  );
};

export default ProfilePage;
